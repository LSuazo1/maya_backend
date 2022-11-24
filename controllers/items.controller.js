const { Item } = require('../models/item.model');
const { ItemImages } = require('../models/itemImages.model');
const { User } = require('../models/user.model');
const path = require("path");
const fs = require("fs");
const { statusResponse } = require('../helpers/getStatusCode');


const getOneImage = async (req, res) => {
    const { id } = req.body
    const { dataValues } = await ItemImages.findByPk(id);

    if (!dataValues) { return res.status(404).json({ message: 'Image not found' }); }

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
        res.status(500).json(statusResponse(500));
    }
}

const getSeveral = async (req, res) => {
    const { limit, offset, page } = req.query;
    const reg = /^[0-9]$/

    try {
        if (!reg.test(page)) { return res.status(416).json({ message: "Value out of range." }) }
        if (!reg.test(limit)) { return res.status(416).json({ message: "Value out of range." }) }

        const [items, total] = await Promise.all([
            Item.findAll({ limit, offset, include: ItemImages }), Item.count()
        ])

        const data = {
            items,
            page,
            total,
            offset
        }

        res.status(200).json(data.items);
    } catch (e) {
        res.status(500).json(statusResponse(500));
    }
}


const createOne = async (req, res) => {
    const { name, category, price, location, stock, images } = req.body

    try {
        console.log(req.files)
    } catch (e) {
        console.log(e)
    }

}


module.exports = { getSeveral, getOneImage, createOne }
