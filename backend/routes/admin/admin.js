const express = require('express')
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const zod = require('zod');
const adminMiddleware = require('../middleware/adminMiddleware');

const productBody = zod.object({
    name: zod.string(),
    description: zod.string(),
    price: zod.number().refine((val) => val % 1 !== 0, {
        message: "Price must be a float number",
    }),
    imageUrl: zod.string(),
    category: zod.string()
})

router.post('/product', adminMiddleware, async (req, res) => {
    const result = productBody.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: "Incorrect inputs",
            error: result.error.errors
        })
    }

    const {name, description, price, imageUrl, category} = req.body;

    try{
        const existingCategory = await prisma.category.findUnique({
            where: { name: category }
        });

        let categoryId;
        if (existingCategory) {
            categoryId = existingCategory.id;
        } else {
            const newCategory = await prisma.category.create({
                data: { name: category }
            });
            categoryId = newCategory.id;
        }

        const product = await prisma.product.create({
            data: {
                name: name,
                description: description,
                price: price,
                imageUrl: imageUrl,
                category: {
                    connect: { id: categoryId }
                }
            }
        })

        return res.status(201).json({
            product
        })
    }catch(e){
        return res.status(500).json({
            message: "error creating product",
            error: e.message
        })
    }
})

const productPutBody = zod.object({
    description: zod.string().optional(),
    price: zod.number().refine((val) => val % 1 !== 0, {
        message: "Price must be a float number",
    }).optional(),
    imageUrl: zod.string().optional()
})

router.put('/product/:id', adminMiddleware, async (req, res) => {
    const result = productPutBody.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const {description, price, imageUrl} = req.body;
    const productId = parseInt(req.params.id, 10);

    try{
        const product = await prisma.product.update({
            where : {
                id: productId
            },
            data : {
                description,
                price,
                imageUrl
            }
        })

        return res.status(200).json({
            product
        })
    }catch(e){
        return res.status(500).json({
            message: "Error updating product"
        })
    }
})

router.get('/product/:id', adminMiddleware, async (req, res) => {
    const productId = parseInt(req.params.id, 10);

    try{
        const product = await prisma.product.findFirst({
            where: {
                id: productId
            }
        })

        return res.status(201).json({
            product
        })
    }catch(e){
        return res.status(500).json({
            message: "error getting the product"
    })
    }
})

router.delete('/product/:id', adminMiddleware, async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    try{
        const product = await prisma.product.delete({
            where: {
                id: productId
            }
        })

        return res.json({
            product
        })
    }catch(e){
        return res.status(500).json({
            message: "Error deleting the product"
        })
    }
})


/*

    **************************WORKS**************************

*/


const workBody = zod.object({
    name: zod.string(),
    description: zod.string(),
    price: zod.number(),
    imageUrl: zod.string()
})

router.post('/work', adminMiddleware, async (req, res) => {
    const result = workBody.safeParse(req.body);
    console.log(result)

    if(!result.success){
        console.error("Validation Error:", result.error.errors);
        return res.status(400).json({
            message: "Incorrect inputs",
            error: result.error.errors
        })
    }

    const {name, description, price, imageUrl} = req.body;

    try{
        const product = await prisma.works.create({
            data: {
                name: name,
                description: description,
                price: price,
                imageUrl: imageUrl
            }
        })

        return res.status(201).json({
            product
        })
    }catch(e){
        return res.status(500).json({
            message: "error creating product",
            error: e.message
        })
    }
})

const workPutBody = zod.object({
    description: zod.string().optional(),
    price: zod.number().refine((val) => val % 1 !== 0, {
        message: "Price must be a float number",
    }).optional(),
    imageUrl: zod.string().optional()
})

router.put('/work/:id', adminMiddleware, async (req, res) => {
    const result = workPutBody.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const {description, price, imageUrl} = req.body;
    const productId = parseInt(req.params.id, 10);

    try{
        const product = await prisma.works.update({
            where : {
                id: productId
            },
            data : {
                description,
                price,
                imageUrl
            }
        })

        return res.status(200).json({
            product
        })
    }catch(e){
        return res.status(500).json({
            message: "Error updating product"
        })
    }
})

router.get('/work/:id', adminMiddleware, async (req, res) => {
    const productId = parseInt(req.params.id, 10);

    try{
        const product = await prisma.works.findFirst({
            where: {
                id : productId
            }
        })

        return res.status(201).json({
            product
        })
    }catch(e){
        return res.status(500).json({
            message: "error getting the recent work"
        })
    }
})

router.delete('/work/:id', adminMiddleware, async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    try{
        const product = await prisma.works.delete({
            where: {
                id: productId
            }
        })

        return res.json({
            product
        })
    }catch(e){
        return res.status(500).json({
            message: "Error deleting the product"
        })
    }
})

router.get('/works', async (req, res) => {
    try{
        const works = await prisma.works.findMany();
        
        return res.json({
            works
        })
    }catch(e){
        return res.status(500).json({
            message: "Error getting the works"
        })
    }
})


/*

    **************************Gallery**************************

*/

const galleryBody = zod.object({
    name : zod.string(),
    imageUrl: zod.string()
})

router.post('/gallery', adminMiddleware, async (req, res) => {
    const result = galleryBody.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const {name, imageUrl} = req.body;
    try{
        const image = await prisma.gallery.create({
            data: {
                name: name,
                imageUrl: imageUrl
            }
        })
        return res.status(201).json({
            image
        })
    }catch(e){
        return res.status(500).json({
            message: "error creating image",
            error: e.message
        })
    }
})


router.get('/gallery', async (req, res) => {
    try{
        const products = await prisma.gallery.findMany();

        return res.status(201).json({
            products
        })
    }catch(e){
        return res.status(500).json({
            message: "error getting the products"
        })
    }
})

router.get('/gallery/:id', async (req, res) => {
    const imageId = parseInt(req.params.id, 10);

    try{
        const image = await prisma.gallery.findFirst({
            where: {
                id: imageId
            }
        })

        return res.status(201).json({
            image
        })
    }catch(e){
        return res.status(500).json({
            message: "error getting the image"
        })
    }
})


router.delete('/gallery/:id', adminMiddleware, async (req, res) => {
    const imageId = parseInt(req.params.id, 10);

    try{
        const image = await prisma.gallery.delete({
            where: {
                id: imageId
            }
        })

        return res.json({
            image
        })
    }catch(e){
        return res.status(500).json({
            message: "Error deleting the image"
        })
    }

})

module.exports = router;
