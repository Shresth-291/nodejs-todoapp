import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
import { setCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

// export const getAllUsers = async (req, res) => {

//     const users = await User.find({})
//     // console.log(req.query)
//     // const obj = req.query
//     // console.log(obj.name)

//     res.json({
//         success: true,
//         users,
//     })
// }

// export const register = async (req, res) => {

//     const {name, email, password} = req.body

//     await User.create({
//         name,
//         email,
//         password,
//     })

//     res.status(201).cookie('fast', 'furious').json({
//         success: true,
//         message: 'You are Registered'
//     })
// }

// // export const getSpecial = (req, res) => {
// //     res.json({
// //         success: true,
// //         message: 'hehe'
// //     })
// // }

// export const getById = async (req, res) => {
//     // const {id} = req.query
//     const {userId} = req.params
//     const user = await User.findById(userId)
//     // console.log(req.params)

//     res.json({
//         success: true,
//         user
//     })
// }

// export const update = async (req, res) => {
//     // const {id} = req.query
//     const {userId} = req.params
//     const user = await User.findById(userId)
//     // console.log(req.params)

//     res.json({
//         success: true,
//         message: 'Updated'
//     })
// }

// export const deleted = async (req, res) => {
//     // const {id} = req.query
//     const {userId} = req.params
//     const user = await User.findById(userId)
//     // console.log(req.params)

//     res.json({
//         success: true,
//         message: 'deleted'
//     })
// }


export const register = async (req, res, next) => {

    try {
        const {name, email, password} = req.body

        let user = await User.findOne({email})

        if(user){
            return next(new ErrorHandler('User already Exists.', 400))
        }

        const hashPassword = await bcrypt.hash(password, 10)

        user = await User.create({
            name,
            email,
            password: hashPassword,
        })

        setCookie(user, res, "Registered Successfully", 201)
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {

    try {
        const {email, password} = req.body
        // console.log(email)

        const user = await User.findOne({email}).select("+password");
        // console.log(user)

        if(!user){
            return next(new ErrorHandler("User Not Found", 404))
        }

        const match = await bcrypt.compare(password, user.password)

        if(!match){
            return next(new ErrorHandler("Invalid Credentials", 400))
        }

        setCookie(user, res, `Welcome back, ${user.name}`, 201)
    } catch (error) {
        next(error)
    }
    
}

export const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    })
}

export const logout = (req, res) => {

    res.status(200).cookie('token', '', {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === 'Developement' ? 'lax' : 'none',
        secure: process.env.NODE_ENV === 'Developement' ? false : true
    }).json({
        success: true,
        // user: req.user
    })
}