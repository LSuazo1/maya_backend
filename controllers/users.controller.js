const { User } = require('../models/user.model');
const { emailRegistration } = require('../helpers/emailRegistration');
const { encryptPassword } = require('../helpers/encryptPassword');
const { generateId } = require('../helpers/generateid');


const createOne = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const name = firstName + "" + lastName;
    const userExist = await User.findOne({ where: { email } });

    if (userExist) return res.status(404).json({ message: "User already registered" })

    try {
        const user = User.build(req.body);

        user.password = encryptPassword(password); // Encrypting password
        user.token = generateId();
        await user.save();

        // Enviar correo
        emailRegistration({
            email, name, token: user.token
        })

        // Retornar el usuario en caso de que todo salga bien
        res.status(200).json({ user });
    } catch (e) {
        res.status(500).json({
            error: {
                status: 500,
                message: e.message
            }
        })
    }
}

const getAll = async () => { }
const getOne = async () => { }
const updateOne = async () => { }
const deleteOne = async () => { }


module.exports = { getAll, createOne, getOne, updateOne, deleteOne };
