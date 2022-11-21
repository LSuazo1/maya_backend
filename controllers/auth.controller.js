const { User } = require('../models/user.model');
const { emailRecoverPassword } = require('../helpers/emailRecoverPassword');
const { encryptPassword } = require('../helpers/encryptPassword');
const { generateId } = require('../helpers/generateid');
const { generateJWT } = require('../helpers/generate-jws');
const bcryptjs = require('bcryptjs');

const confirmAccount = async (req, res) => {
    const { token } = req.params

    const userExist = await User.findOne({ where: { token: token } })

    if (!userExist) {
        return res.status(404).json({ msg: 'invalid token' })
    }

    if (userExist.token === null) {
        return res.status(404).json({ msg: 'token already confirmed' })
    }

    try {
        userExist.token = null;
        await userExist.save();

        res.status(200).json({ msg: "User confirmed successfully" })
    } catch (error) {
        res.status(500).json({
            error: {
                error: 500,
                mesage: e.message
            }
        })
    }
}
const authenticate = async (req, res) => {
    const { password } = req.body

    try {
        const userExist = await User.findOne({
            where: {
                email: req.body.email
            }
        }
        );

        if (!userExist) {
            return res.status(401).json({ msg: 'Unauthorized' })

        }

        // Comprobar si el usuario esta confirmado 
        if (userExist.token !== null) {
            return res.status(403).json({ msg: 'Your account has not been confirmed' })
        }

        //comprobar password
        const confirmPassword = await bcryptjs.compare(password, userExist.password);
        if (confirmPassword) {
            const token = await generateJWT(userExist.idUser);
            res.json({
                idUser: userExist.idUser,
                name: userExist.name,
                email: userExist.email,
                token,
            });
        } else {
            return res.status(403).json({ msg: 'wrong password or email' });
        }
    } catch (e) {
        res.status(500).json({
            error: {
                error: 500,
                mesage: e.message
            }
        })
    }
}

const changePassword=async(req,res) => {
    const { email } = req.body;

    const userExist = await User.findOne({
        where: {
            email:req.body.email
        }}
    );

    if (!userExist) {
        return res.status(400).json({
            msg: 'Usuario no existe'
        })
    }

    try {
        userExist.token = generateId();
        await userExist.save();
        emailRecoverPassword ({
            email,
            name: userExist.name,
            token: userExist.token
        })
        res.status(200).json({ msg: 'Hemos enviado un email con las instrucciones' })
    } catch (error) {
        res.status(500).json({
            error: {
                error: 500,
                mesage: e.message
            }
        });
    }
}

const verifyAccount = async (req, res) => {
    const { token } = req.params;

    const tokenValid =await User.findOne({where: {token: token}})

    if (tokenValid) {
        res.status(200).json({ msg: 'Valid token and user exist' })
    } else {
        return res.status(404).json({ msg: 'invalid token' })
    }
}
const newPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    const userExist = await User.findOne({where: {token: token}})

    if (!userExist) {
        return res.status(400).json({
            msg: 'Hubo un error'
        });
    }

    try {
        userExist.token = null;
        userExist.password = encryptPassword(password);

        await userExist.save();
        res.status(200).json({
            msg: 'Password changed successfully'
        })
    } catch (error) {
        res.status(500).json({
            error: {
                error: 500,
                mesage: e.message
            }
        });
    }

}

module.exports = { confirmAccount, authenticate, changePassword ,verifyAccount,newPassword}