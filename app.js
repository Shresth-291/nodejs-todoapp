import express from 'express'
import userRouter from './routes/user.js'
import {config} from 'dotenv'
import cookieParser from 'cookie-parser'
import taskRouter from './routes/task.js'
import { errorMiddleware } from './middlewares/error.js'
import cors from 'cors'

export const app = express()
config({
    path: './data/config.env',
})

//using MiddleWares
app.use(express.json())
app.use(cookieParser())
//cross origin resource sharing(mtlb frontend(dusre URL) se data fetch krne k liye)
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
//using Routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/task', taskRouter)

app.get('/', (req, res) => {
    res.send('Nice Working 😍')
})

//using Error Middleware
app.use(errorMiddleware)