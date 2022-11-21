const { User } = require('../models/user.model');
const { emailRegistration } = require('../helpers/emailRegistration');
const { encryptPassword } = require('../helpers/encryptPassword');
const { generateId } = require('../helpers/generateid');


const createOne = async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({
    where: {
      email: req.body.email
    }
  }
  );

  if (userExist) {
    return res.status(404).json({ msg: "User already registered" })
  }

  try {

    const user = User.build(req.body);

    // Encriptar contrasenia de la base de datos
    user.password = encryptPassword(password);
    user.token = generateId();
    await user.save();

    // Enviar correo
    emailRegistration({
      email, name, token: user.token
    })

    //retornar el usuario en caso de que todo salga bien
    res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({
      error: {
        error: 500,
        mesage: e.message
      }
    })
  }



}
/* 
try {
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json({
                error: {
                    error: 500,
                    mesage: e.message
                }
            })
        }
*/



module.exports = { createOne };
