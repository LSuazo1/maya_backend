const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');


const checkAuth = async (req, res, next) => {
    const token = req.header('token');
    console.log(token);
    if (!token) {
        return res.status(401).json({
            msg: 'Token not found'
        });
    }

    
    try {
        const { uid, tipe } = jwt.verify(token, process.env.JWT_SECRET);
        const { dataValues } = await Persona.findByPk(uid);


        if (!dataValues) {
            return res.status(401).json({
                msg: 'Token or not found'
            })
        }

        req.usuario = dataValues;

        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token invalide'
        })
    }
}


module.exports = { checkAuth };
