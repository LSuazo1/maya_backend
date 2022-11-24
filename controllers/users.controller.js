const { User } = require('../models/user.model');
const { emailRegistration } = require('../helpers/emailRegistration');
const { encryptPassword } = require('../helpers/encryptPassword');
const { generateId } = require('../helpers/generateid');
const { statusResponse } = require('../helpers/getStatusCode');



const createOne = async (req, res) => {
    const { firstName, lastName, email, password, phone, department, province } = req.body;
    const userData = {
        firstName,
        lastName,
        email,
        phone,
        department,
        municipality: province,
        password: encryptPassword(password),
        token: generateId()
    }


    const userExist = await User.findOne({ where: { email } });
    if (userExist) return res.status(400).json(statusResponse(400))

    try {
        const user = await User.build(userData)
        await user.save()

        // Send email notification
        // TODO: Solucionar que se envien los correos 
        // emailRegistration({
        //     email,
        //     name: firstName + ' ' + lastName,
        //     token: user.token
        // })

        res.status(200).json({ user });
    } catch (e) {
        res.status(500).json(statusResponse(500))
    }
}

const getSeveral = async () => { }
const getOne = async () => { }
const updateOne = async () => { }
const deleteOne = async () => { }


module.exports = { getSeveral, createOne, getOne, updateOne, deleteOne };
