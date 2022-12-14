const bcryptjs = require('bcryptjs');
const { User } = require('../models/user.model');
const { emailRecoverPassword } = require('../helpers/emailRecoverPassword');
const { encryptPassword } = require('../helpers/encryptPassword');
const { generateId } = require('../helpers/generateid');
const { generateJWT } = require('../helpers/generate-jws');
const { statusResponse } = require('../helpers/getStatusCode');



const signIn = async (req, res) => {
    const { email, password } = req.body

    const userExist = await User.findOne({ where: { email } })
    if (!userExist) return res.status(400).json(statusResponse(400))

    try {
        const confirmPassword = await bcryptjs.compare(password, userExist.password)

        if (userExist.token !== null) return res.status(403).json({ message: 'Your account has not been confirmed' })
        if (!confirmPassword) { return res.status(404).json({ message: 'wrong password or email' }); }

        const token = await generateJWT(userExist.idUser);
        res.json({
            idUser: userExist.idUser,
            name: {
                firstName: userExist.firstName,
                lastName: userExist.lastName
            },
            email: userExist.email,
            token,
        });
    } catch (e) {
        res.status(500).json(statusResponse(500))
    }
}

const confirmAccount = async (req, res) => {
    const { token } = req.params
    const userExist = await User.findOne({ where: { token: token } })

    if (!userExist) { return res.status(404).json({ message: 'invalid token' }) }
    if (userExist.token === null) { return res.status(404).json({ message: 'token already confirmed' }) }

    try {
        userExist.token = null;
        await userExist.save();

        res.status(200).json({ message: "User confirmed successfully" })
    } catch (error) {
        res.status(500).json(statusResponse(500))
    }
}

const changePassword = async (req, res) => {
    const { email, firstName, lastName } = req.body;
    const name = firstName + ' ' + lastName

    try {
        const userExist = await User.findOne({ where: { email } })

        if (!userExist) {
            return res.status(400).json({
                message: 'Usuario no existe'
            })
        }

        userExist.token = generateId();
        await userExist.save();
        emailRecoverPassword({
            email,
            name,
            token: userExist.token
        })
        res.status(200).json({ message: 'Hemos enviado un email con las instrucciones' })
    } catch (error) {
        res.status(500).json(statusResponse(500));
    }
}

const verifyAccount = async (req, res) => {
    const { token } = req.params;
    const tokenValid = await User.findOne({ where: { token: token } })

    try {
        if (!tokenValid) return res.status(404).json({ message: 'invalid token' })
        res.status(200).json({ message: 'Valid token and user exist' })
    } catch (error) {
        res.status(500).json(statusResponse(500));
    }
}

// Change password
const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const userExist = await User.findOne({ where: { token: token } })

        if (!userExist) {
            return res.status(400).json({
                message: 'Hubo un error'
            });
        }

        userExist.token = null;
        userExist.password = encryptPassword(password);

        await userExist.save()
        res.status(200).json({
            message: 'Password changed successfully'
        })
    } catch (error) {
        res.status(500).json(statusResponse(500));
    }
}


module.exports = { confirmAccount, signIn, changePassword, verifyAccount, newPassword }
