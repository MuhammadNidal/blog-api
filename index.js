import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import postRoutes from './routes/Post.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import userRoutes from './routes/User.js'


const app = express()
dotenv.config()
const port = 8080
app.use(cors())

// Now connect to MONGODB using mongoose as well as a disconnection message.

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
    console.log(`Connected to MongoDB!`)
  } catch (error) {
    throw error
  }
}

mongoose.connection.on('Disconnected', () => {
  console.log('Disconnected from MongoDB!')
})

app.use(bodyParser.json())

// This is where the routing middleware goes
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)


app.listen(port, () => {
  dbConnect()
  console.log(`Connected to backend on port ${port}!`)
})
