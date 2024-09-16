const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const adminMiddleware = require('../middleware/adminMiddleware');
const prisma = new PrismaClient();
const cloudinary = require('../../utils/cloudinary')

router.post('/category', adminMiddleware, async (req, res) => {
    const {name, imageUrl} = req.body;
    console.log("name: ",name);
    console.log("imageUrl: ", imageUrl);
    try{
        const response = await cloudinary.uploader.upload(imageUrl, {
            folder: "/jewellery-app"
        })

        console.log("response: ", response);
        const category = await prisma.category.create({
            data: {
                name: name,
                imageUrl: response.url
            }
        })

        res.status(201).json({
            message: category
        })
    }catch(e){
        res.status(500).json({
            message: "Server error"
        })
    }
})

router.put('/category/:id', adminMiddleware, async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    try{
        const category = await prisma.category.update({
            where: {
                id : parseInt(id)
            },
            data: {
                name
            }
        })

        res.json({
            category
        })
    }catch(e){
        res.status(500).json({
            message: "Failed to update category"
        })
    }
})

router.delete('/category/:id', adminMiddleware, async (req, res) => {
    try{
        const category = await prisma.category.delete({
            where: {id: parseInt(req.params.id)}
        })

        res.json({
            category
        })
    }catch(e){
        res.status(500).json({
            message: "Failed to delete category",
            err: e.message
            
        })
    }
})

module.exports = router;