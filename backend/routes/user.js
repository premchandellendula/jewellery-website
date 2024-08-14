const { PrismaClient } = require('@prisma/client');
const { JWT_SECRET } = require("../config");
const express = require('express')
const zod = require('zod');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const router = express.Router();

const prisma = new PrismaClient();

const signupBody = zod.object({
    email: zod.string().email(),
    name: zod.string(),
    password: zod.string().min(6)
})

router.post('/signup', async (req, res) => {

    const result = signupBody.safeParse(req.body);
    
    if(!result.success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const {email, name, password} = req.body;

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                {email: email},
                {name: name}
            ]
        }
    })

    if(existingUser){
        res.status(409).json({
            message: "Email or username already exists"
        })
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email : email,
                name : name,
                password : hashedPassword
            }
        })

        const token = jwt.sign({id: user.id}, JWT_SECRET)

        return res.status(201).json({
            token
        })
    }catch(e){
        return res.status(500).json({
            message: "Error creating user", 
            error: e.message
        })
    }
})


const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

router.post('/signin', async (req, res) => {
    const result = signinBody.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const {email, password} = req.body;

    try{
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user){
            return res.status(403).json({
                message: "User not found"
            })
        }

        console.log(user.role);

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(403).json({
                message: "Incorrect password"
            })
        }

        const token = jwt.sign({id: user.id}, JWT_SECRET);

        return res.status(201).json({
            token
        })
    }catch(e){
        return res.status(500).json({
            message: "Error while signing in"
        })
    }
})

module.exports = router