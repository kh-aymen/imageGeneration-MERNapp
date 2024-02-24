import express from 'express'
import * as dotenv from 'dotenv'
import OpenAI from 'openai'
import Post from '../mongodb/models/post.js'

dotenv.config()

const router = express.Router()


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // timeout: 30000 
})

router.route('/').get((req, res) => {
    res.send('Hello from DALL-E!')
})

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body 

        const aiResponse = await openai.images.generate({
            model: 'dall-e-2',
            prompt,
            n: 1,
            size: '1024x1024',
        })
 
        const image = aiResponse.data[0].url
        res.status(200).json({ photo: image })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

export default router