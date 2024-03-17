const express = require('express')
const ProductManager = require('./src/controllers/ProductManager')
const CartManager = require('./src/controllers/CartManager')

const app = express()
const PORT = 8080

const productManager = new ProductManager('./src/models/products.json')
const cartManager = new CartManager('./src/models/carts.json')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/products', require('./src/routes/products.router')(productManager))

app.use('/api/carts', require('./src/routes/carts.router')(cartManager, productManager))

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})