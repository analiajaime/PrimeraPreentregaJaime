const express = require('express')
const router = express.Router()

module.exports = (cartManager, productManager) => {

    router.post('/', async (req, res) => {
        try {
            const newCart = await cartManager.createCart()
            res.json({ newCart })
        } catch (error) {
            console.error("Error al crear el nuevo carrito", error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })


    router.get('/:cid', async (req, res) => {
        const cartId = parseInt(req.params.cid)
        try {
            const cart = await cartManager.getCartById(cartId)
            res.json(cart.products)
        } catch (error) {
            console.error("Error al obtener el carrito", error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })


    router.post('/:cid/product/:pid', async (req, res) => {
        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)
        const quantity = req.body.quantity || 1
        try {
            const updateCart = await cartManager.addProductToCart(cartId, productId, productManager, quantity)
            res.json(updateCart.products)
        } catch (error) {
            console.error("Error al agregar al producto", error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

    return router
}



