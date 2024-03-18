const express = require('express')
const router = express.Router()

module.exports = (productManager) => {

    router.get('/', async (req, res) => {
        try {
            const limit = parseInt(req.query.limit)
            const products = await productManager.getProductsLimit(limit)
            res.json(products)
        } catch (error) {
            console.error('Error al buscar los productos', error)
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
                res.status(404).json({ error: 'Producto no encontrado' })
            }
        } catch (error) {
            console.error('error al obtener el producto', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

    router.post('/', async (req, res) => {
        try {
            const newProduct = req.body
            await productManager.addProduct(newProduct)
            res.json({ message: 'Producto agregado exitosamente' })
        } catch (error) {
            console.error('Error al agregar el producto', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

    router.put('/:pid', async (req, res) => {
        try {
            const productId = parseInt(req.params.pid)
            const updatedProduct = req.body
            await productManager.updateProduct(productId, updatedProduct)
            res.json({ message: 'Producto actualizado exitosamente' })
        } catch (error) {
            console.error('Error al actualizar el producto', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

    router.delete('/:pid', async (req, res) => {
        try {
            const productId = parseInt(req.params.pid)
            await productManager.deleteProduct(productId)
            res.json({ message: 'El producto fue borrado exitosamente' })
        } catch (error) {
            console.error("Error borrando este producto", error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

    return router
}

// Path: src/routers/cart.router.js