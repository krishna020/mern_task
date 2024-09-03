import express from 'express'
const app = express();
import bodyParser from 'body-parser'
import cors from 'cors'
import AuthRouter from './Routes/authRouter.js'
import  ProductRouter from './Routes/productRouter.js'
import dotenv from 'dotenv'
import db from './Models/db.js'
dotenv.config()

//import db from './Models/db.js'
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1/auth', AuthRouter);
app.use('/products', ProductRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})