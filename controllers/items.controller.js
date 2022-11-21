const { Item } = require('../models/item.model');
const { ItemImages } = require('../models/itemImages.model');
const { User } = require('../models/user.model');
const path = require("path");
const fs = require("fs");



const getOneImage = async (req, res) => {
    const { id } = req.body
    const { dataValues } = await ItemImages.findByPk(id);


    if (!dataValues) {
        return res.status(404).json({ msg: 'Image not found' });
    }

    try {
        if (dataValues.url) {
            const pathImage = path.join(__dirname, '../uploads', dataValues.url);
            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage);
            }
        }
        const pathImage = path.join(__dirname, '../assets', 'no-image.jpg');

        res.status(200).sendFile(pathImage);
    } catch (error) {
        res.status(500).json({
            error: {
                error: 500,
                mesage: e.message
            }
        });
    }

}

const getSeveral= async (req, res) => {
    const { page } = req.query;
    const reg = /^[0-9]$/
    try {
  
      if (!reg.test(page)) {
        return res.status(404).json({ msg: "User not found" })
      }
      limit = 5;
      const offset = ((page  * limit) - limit)
  
      const [items, total] = await Promise.all([
        Item.findAll({ limit, offset, include: ItemImages })
        , Item.count()
      ])
  
     total = Math.ceil(total / limit);
      res.json({ items, page, total,offset});
    } catch (error) {
        res.status(500).json({
            error: {
                error: 500,
                mesage: e.message
            }
        });
    }
  
}



module.exports = { getSeveral,getOneImage }