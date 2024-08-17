const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/category', async (req, res) => {
    const {name} = req.body;
    try{
        const category = await prisma.category.create({
            data: {
                name: name
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

router.put('/category/:id', async (req, res) => {
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

router.delete('/category/:id', async (req, res) => {
    try{
        const category = await prisma.category.delete({
            where: {id: parseInt(req.params.id)}
        })

        res.json({
            category
        })
    }catch(e){
        res.status(500).json({
            message: "Failed to delete coategory"
        })
    }
})