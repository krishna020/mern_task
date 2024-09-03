import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const URL = process.env.MONGO_CONN

const connection = mongoose.connect(URL).then(() => {
    console.log('database is connected.')
}).catch((err) => {
    console.log(err)
})

export default connection