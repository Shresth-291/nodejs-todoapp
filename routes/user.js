import express from 'express'
// import { getAllUsers, getById, register } from '../controllers/user.js'
import {getMyProfile, login, logout, register} from '../controllers/user.js'
import { isAuthenticated } from '../middlewares/authenticate.js'

const router = express.Router()

// router.get('/all', getAllUsers)

router.post('/new', register)

router.post('/login', login)

router.get('/me', isAuthenticated, getMyProfile)

router.post('/logout', logout)

// router.post('/login', login)

// router.get('/userId/special', getSpecial)

// router.get('/userId/:userId', getById)

// router.put('/userId/:userId', update)

// router.delete('/userId/:userId', deleted)

// router
//     .route('/userId/:userId')
//     .get(getById)
//     // .put(update)
//     // .delete(deleted)

export default router;