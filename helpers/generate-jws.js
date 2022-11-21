const jwt = require("jsonwebtoken");



const generateJWT = (uid = '',tipe='client') => {

    return new Promise((resolve, reject) => {

        const payload = { uid,tipe };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                console.log("Failed to generate token");
            } else {
                resolve(token);
            }

        });



    });






}


module.exports = {generateJWT};