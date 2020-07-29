
const express = require('express');
const router = express.Router();
const TypeData = require('../models/typeData');
const upload = require('../libs/storage')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
const fs = require('fs-extra');

router.get('/images/delete/:photo_id', async(req,res) => {
    const { photo_id } = req.params
    const photo = await TypeData.findByIdAndDelete(photo_id);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id);
    console.log(result)
    res.send('delete');
    await fs.unlink(req.file.path, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
    });
})

router.get('/', async(req,res) => {
    const photos = await TypeData.find();
    console.log(photos)
    res.json(photos);
    await fs.unlink(req.file.path, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
    });
})

router.post('/images/add', async (req, res) => {
    const { title, description} = req.body
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const newTypeData = new TypeData({
        title,
        description,
        imageUrl: result.url,
        public_id: result.public_id
    })
    await newTypeData.save();
    await fs.unlink(req.file.path, (err) => {
        if (err) throw err;
    });
    res.send('Recived');
})
module.exports = router;