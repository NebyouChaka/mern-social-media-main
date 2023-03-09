import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import { register } from './controllers/auth.js'
import { createPost } from './controllers/posts.js'
import { verifyToken } from './middleware/auth.js'
import User from './models/User.js'
import Post from './models/Post.js'
import { users, posts } from './data/index.js'

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url) //import.meta.url references the location of the current file. fileURLToPath is a custom function that converts a file URL to a file path.
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json()) //parse income req.body in JSON format. Allows you to access the data sent in a req.body as a JS object
app.use(helmet()) //help secure your app by setting security headers. It allows to control if a browser should block a cross-origin resource from loading or not.
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"})) // sets the Cross-Origin-Resource-Policy header in the HTTP response. It's an extra security measure that helps to prevent some types of cross-site scripting (XSS) attacks.
app.use(morgan("common")) //common will log more info
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

//File Storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

//Routes with files
app.post("/auth/register", upload.single("picture"), register) // when a user is registering
app.post("/posts", verifyToken, upload.single("picture"), createPost)


//Routes
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

//Mongoose setup
const PORT = process.env.PORT || 6001

mongoose.set('strictQuery', true)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

    // User.insertMany(users)
    // Post.insertMany(posts)
}).catch((error) => console.log(`${error} did not connect`))