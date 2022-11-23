const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models/user.model');
const { Item } = require('../models/item.model');
const { ItemImages } = require('../models/itemImages.model');

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });
exports.upload = upload.array("images");


exports.uploadImage = async (req, res) => {
    const { files } = req
    const { data } = req.body;
    const data2 = JSON.parse(data);

    console.log(data2);
    console.log(files);
    try {
        //TODO: comprobar que existe el usuario
        const user = await User.findByPk(data2.idUser);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        const urlImagenes = files.map(file => file.filename);

        const item = Item.build(data2);
        const { _previousDataValues, dataValues, ...Item3 } = await item.save();
        item.idItem = Item3.null;
        //TODO: Guardar las imagenes
        urlImagenes.map(async (url) => {
            let objectImagen = {
                url,
                idItem: item.idItem
            }
            const image = ItemImages.build(objectImagen);
            await image.save();
        });

        res.status(200).json({ item });
    } catch (err) {
        res.status(500).json({
            error: {
                status: 500,
                message: e.message
            }
        })
    }

}
