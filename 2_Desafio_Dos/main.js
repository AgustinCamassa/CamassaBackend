import { promises as fs } from 'fs'

const path = './productos.json'

const getProducts = async () => {
    const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
    console.log(prods)
}

const getProductById = async (id) => {
    const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
    const producto = prods.find(prod => prod.id === id)

    if (producto)
        console.log(producto)
    else
        console.log("Producto no encontrado")
}

const addProduct = async (product) => {
    const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
    const producto = prods.find(prod => prod.id === product.id)

    if (producto) {
        console.log("Producto ya agregado")
    } else {
        prods.push(product)
        await fs.writeFile(path, JSON.stringify(prods))
    }
}

const updateProduct = async (id, product) => {
    const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
    const indice = prods.findIndex(prod => prod.id === id)

    if (indice != -1) {
        prods[indice].nombre = product.nombre
        prods[indice].model = product.model
        prods[indice].precio = product.precio
        prods[indice].codigo = product.codigo

        await fs.writeFile(path, JSON.stringify(prods))
    } else {
        console.log("Producto no encontrado")
    }
}

const deleteProduct = async (id) => {
    const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
    const producto = prods.find(prod => prod.id === id)

    if (producto) {
        await fs.writeFile(path, JSON.stringify(prods.filter(prod => prod.id != id)))
    } else {
        console.log("Producto no encontrado")
    }
}

const producto1 = { id: 1, nombre: "RX 580", model: "Asus", precio: 300, codigo: "RX123FF" }
const producto2 = { id: 2, nombre: "GTX 1060", model: "Gigabite", precio: 180, codigo: "GTX123G" }
const producto3 = { id: 3, nombre: "Arc a750", model: "Intel", precio: 260, codigo: "ARC123A" }
const producto4 = { id: 4, nombre: "RTX 3070", model: "MSI", precio: 450, codigo: "RTX123G" }
const producto5 = { id: 1, nombre: "Radeon VII", model: "Saphire", precio: 320, codigo: "R123AMD" }

addProduct()
updateProduct()
deleteProduct()