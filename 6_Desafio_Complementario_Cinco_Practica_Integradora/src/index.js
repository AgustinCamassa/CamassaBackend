import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/users.routes.js'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/cart.routes.js'
import { userModel } from './models/users.models.js'
const app = express()
const PORT = 4000

mongoose.connect('mongodb+srv://agustincamassa:Agus117@cluster0.fnuclqy.mongodb.net/?retryWrites=true&w=majority')
    .then(async () => {
        console.log('BDD conectada')

        const resultado = await userModel.paginate({ password: '1234' }, { limit: 20, page: 1, sort: { edad: 'asc' } })
        console.log(resultado)

    })
    .catch(() => console.log('Error en conexion a BDD'))

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`)
})