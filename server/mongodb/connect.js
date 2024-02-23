import mongoose from "mongoose"

const connectDB = (url) => {
    mongoose.set('strictQuery', true)

    mongoose.connect(url)
        .then(() => console.log('DataBase connected succssfuly'))
        .catch(() => console.log('Error connect to DataaBase'))
}

export default connectDB