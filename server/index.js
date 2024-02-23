import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.get('/', (req, res) => {
    res.send('hello from DALL-E!')
})
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)
const startServer = async () => {
    try {
        connectDB(process.env.MONGODB)
        app.listen(8888, () => {
            console.log(`Server has started on port http://localhost:8888`)
        })
    } catch (error) {
        console.log(error)
    }

}
startServer()