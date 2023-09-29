class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(product) {
        const prod = this.products.find(prod => prod.code === product.code)

        if (prod) {
            console.log("Producto ya encontrado")
        } else {
            this.products.push(product)
        }
    }

    getProducts() {
        console.log(this.products)
    }

    getProductById(id) {
        const prod = this.products.find(prod => prod.id === id)

        if (prod) {
            console.log(prod)
        } else {
            console.log("Producto no encontrado")
        }
    }
}

class Product {
    constructor(title, description, price, code, stock, thumbnail) {
        this.title = title
        this.description = description
        this.price = price
        this.code = code
        this.stock = stock
        this.thumbnail = thumbnail
        this.id = Product.incrementarId()
    }

    static incrementarId() {

        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}

const producto1 = new Product("RX 580", "Asus", 300, "RX123FF", 10, [])
const producto2 = new Product("GTX 1060", "Gigabite", 180, "GTX123G", 15, [])
const producto3 = new Product("Arc a750", "Intel", 260, "ARC123A", 8, [])
const producto4 = new Product("RTX 3070", "MSI", 450, "RTX123G", 4, [])
const producto5 = new Product("Radeon VII", "Saphire", 300, "R123AMD", 2, [])

const productManager = new ProductManager()

productManager.addProduct(producto1)
productManager.addProduct(producto2)
productManager.addProduct(producto3)
productManager.addProduct(producto4)
productManager.addProduct(producto5)

productManager.getProducts()

productManager.getProductById(4)