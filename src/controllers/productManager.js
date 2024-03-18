const fs = require('fs').promises

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
        this.lastId = 0
        this.loadProducts()
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8')
            this.products = JSON.parse(data)
            if (this.products.length > 0) {
                this.lastId = Math.max(...this.products.map(product => product.id))
            }
        } catch (error) {
            console.error('Error en la carga de productos desde el archivo', error)
            await this.saveProducts()
        }
    }

    async saveProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 4))
        } catch (error) {
            console.error('error al guardar el archivo', error)
        }
    }

    async addProduct(newObject) {
        try {
            let { title, description, category, price, thumbnail, code, stock, status } = newObject

            if (!title || !description || !category || !price || !thumbnail || !code || !stock || !status) {
                console.error('No reune las condiciones para ser un producto')
                return
            }

            if (this.products.some(product => product.code === code)) {
                console.error('El producto ya existe')
                return
            }

            const newProduct = {
                id: ++this.lastId,
                title,
                description,
                category,
                price,
                thumbnail,
                code,
                stock,
                status
            }
            this.products.push(newProduct)
            console.log("Product added:", newProduct)

            await this.saveProducts(this.products)
        } catch (error) {
            console.error('error guardando el producto', error)
            return { error: "Internal Server Error" }
        }
    }

    async getProducts() {
        return this.products
    }

    async getProductById(id) {
        try {
            const foundProduct = this.products.find(item => item.id === id)
            if (!foundProduct) {
                console.error("Producto no encontrado. ID:", id)
            } else {
                console.error("Producto encontrado:", foundProduct)
                return foundProduct
            }
        } catch (error) {
            console.error("Error al leer el archivo", error)
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const index = this.products.findIndex(product => product.id === id)
            if (index !== -1) {
                this.products.splice(index, 1, { id: id, ...updatedProduct })
                await this.saveProducts(this.products)
                console.log("Producto actualizado:", updatedProduct)
            } else {
                console.error("Product no encontrado. ID:", id)
            }
        } catch (error) {
            console.error("Error actualizando el producto:", error)
        }
    }

    async deleteProduct(id) {
        try {
            const index = this.products.findIndex(product => product.id === id)
            if (index !== -1) {
                const deletedProduct = this.products.splice(index, 1)
                await this.saveProducts(this.products)
                console.log("Producto borrado:", deletedProduct)
            } else {
                console.error("Producto no encontrado", id)
            }
        } catch (error) {
            console.error("Error en el borrado", error)
        }
    }

    async getProductsLimit(limit) {
        if (limit) {
            return this.products.slice(0, limit)
        }
        return this.products
    }
}

module.exports = ProductManager