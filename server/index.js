import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()


app.use(bodyParser.json({limit: "300mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "300mb", extended: true}))
app.use(cors())
app.use('/posts', postRoutes)

//const CONNECTIONURL = "mongodb+srv://pawelos:pawelbanan123@cluster0.ykqdw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(PORT, ()=>console.log(`server running on port ${PORT}`)))
.catch((error)=>console.log(error.message))



