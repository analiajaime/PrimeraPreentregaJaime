const express = require('express')
const router = express.Router()

module.exports = (productManager) => {

    router.get('/', async (req, res) => {
        try {
            const limit = parseInt(req.query.limit)
            const products = await productManager.getProductsLimit(limit)
            res.json(products)
        } catch (error) {
            console.error("Error getting the products", error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

    router.get('/:pid', async (req, res) => {
        try {
            const productId = parseInt(req.params.pid)
            const product = await productManager.getProductById(productId)
            if (product) {
                res.json(product)
            } else {
                res.status(404).json({ error: 'Product not found' })
            }
        } catch (error) {
            console.error("Error getting the product", error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

    router.post('/', async (req, res) => {
        try {
            const newProduct = req.body
            await productManager.addProduct(newProduct)
            res.json({ message: 'Product added successfully' })
        } catch (error) {
            console.error("Error adding the product", error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

    router.put('/:pid', async (req, res) => {
        try {
            const productId = parseInt(req.params.pid)
            const updatedProduct = req.body
            await productManager.updateProduct(productId, updatedProduct)
            res.json({ message: 'Product updated successfully' })
        } catch (error) {
            console.error("Error updating the product", error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

    router.delete('/:pid', async (req, res) => {
        try {
            const productId = parseInt(req.params.pid)
            await productManager.deleteProduct(productId)
            res.json({ message: 'Product deleted successfully' })
        } catch (error) {
            console.error("Error deleting the product", error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

    return router
}

// Path: src/routers/cart.router.js