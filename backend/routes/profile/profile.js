const express = require('express')
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const zod = require('zod');
const authMiddleware = require('../middleware/userMiddleware');

const phoneNumberBody = zod.object({
    phoneNumber: zod.string()
})

router.post('/phonenumber', authMiddleware, async (req, res) => {
    const result = phoneNumberBody.safeParse(req.body);
    const userId = req.userId

    if(!result.success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const {phoneNumber} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });
    
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }


        const contactInfo = await prisma.contactInfo.create({
            data: {
                phoneNumber: phoneNumber,
                user: {
                    connect: {id: user.id}
                }
            }
        })

        return res.status(201).json({
            message: "Phone number added successfully",
            contactInfo
        })
    }catch(e){
        return res.status(500).json({
            message: "Error adding the Phone Number",
            error: e.message
        })
    }
})


const addressBody = zod.object({
    flat: zod.string(),
    street: zod.string(),
    city: zod.string(),
    state: zod.string(),
    zipCode: zod.string(),
    country: zod.string()
})

router.post('/address', authMiddleware, async (req, res) => {
    const result = addressBody.safeParse(req.body);
    const userId = req.userId

    if(!result.success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const { flat, street, city, state, zipCode, country } = req.body;

    try{
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });
    
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const existingAddress = await prisma.address.findUnique({
            where: { userId: user.id }
        });
    
        if (existingAddress) {
            return res.status(400).json({ error: 'Address already exists. Please use the update route.' });
        }


        const address = await prisma.address.create({
            data: {
                flat,
                street,
                city,
                state,
                zipCode,
                country,
                userId : user.id
            }
        })

        return res.status(200).json({
            address
        })
    }catch(e){
        return res.status(500).json({
            message: "Error adding the address"
        })
    }
})

const addressPutBody = zod.object({
    flat: zod.string().optional(),
    street: zod.string().optional(),
    city: zod.string().optional(),
    state: zod.string().optional(),
    zipCode: zod.string().optional(),
    country: zod.string().optional()
})

router.put('/address', authMiddleware, async (req, res) => {
    const result = addressPutBody.safeParse(req.body);
    const userId = req.userId

    if(!result.success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const { flat, street, city, state, zipCode, country } = req.body;

    try{
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });
    
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const existingAddress = await prisma.address.findFirst({
            where: { userId: user.id }
        });
    
        if (!existingAddress) {
            return res.status(404).json({ error: 'No address found. Please use the POST route to add an address.' });
        }

        const address = await prisma.address.update({
            where: {
                id: existingAddress.id
            },
            data: {
                flat,
                street,
                city,
                state,
                zipCode,
                country,
                userId : user.id
            }
        })

        return res.status(200).json({
            address
        })
    }catch(e){
        return res.status(500).json({
            message: "Error updating the address",
            error: e.message
        })
    }
})

router.delete('/address', authMiddleware, async (req, res) => {
    const userId = req.userId;

    try{
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            },
            include: {
                addresses: true
            }
        })

        if(!user || !user.addresses){
            return res.status(404).json({
                message: "Address not found or User does not have an address"
            })
        }

        const existingAddress = await prisma.address.findFirst({
            where: { userId: user.id }
        });
    
        if (!existingAddress) {
            return res.status(404).json({ error: 'No address found.' });
        }

        const address = await prisma.address.delete({
            where: {
                id: existingAddress.id
            }
        })

        return res.json({
            address
        })
    }catch(e){
        return res.status(500).json({
            message: "Error deleting the address",
            error: e.message
        })
    }
})

const updateDetails = zod.object({
    name: zod.string(),
    phoneNumber: zod.string()
})

router.put('/details', authMiddleware, async (req, res) => {
    const result = updateDetails.safeParse(req.body);
    const userId = req.userId;

    if(!result.success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const {name, phoneNumber} = req.body

    try{
        const updateUser = await prisma.user.update({
            where: {
                id: parseInt(userId)
            },
            data: {
                name,
                contactInfo: {
                    update: {
                        phoneNumber
                    }
                }
            },
            include: {
                contactInfo: true
            }
        })

        return res.status(200).json({
            updateUser
        })
    }catch(e){
        return res.status(500).json({
            message: "Error updating user"
        })
    }
})

router.get('/', authMiddleware, async (req, res) => {
    const userId = req.userId;

    try{
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }catch(e){
        res.status(500).json({ error: 'Error fetching user profile' });
    }
})

module.exports = router