import { Router } from "express"
import { productModel } from "../models/products.models.js"

const productRouter = Router()

productRouter.get("/", async(request, response) => {
    let { limits = 10, pages = 1, sort, category } = request.query

    try {
        let query = {}
        let link

        if(category){
            query.category = category
            link = `&category=${query.category}`
        }
        const products = await productModel.paginate(query , { page : pages, limit : limits, sort: { price : sort} })
        console.log(query);
        
            if(sort == "asc"){
                sort = 1
            }else if(sort == "desc"){
                sort = -1
            }else{
                sort = undefined
            }

        const respuesta = {
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage ? products.prevPage : null,
            nextPage: products.nextPage? products.nextPage : null,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
        }    

        response.status(200).send({ res: "OK", mes: respuesta})
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})

productRouter.get("/:pid", async(request, response) => {
    const { pid } = request.params

    try {
        const productsById = await productModel.findById(pid)
        productsById ?  response.status(200).send({ res: "OK", message: productsById }) : response.status(404).send({ res: "Error", message: "Producto no encontrado"})
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})

productRouter.post("/", async(request, response) => {
    const { title, description, price, thumbnail, code, stock, category } = request.body

    try {
        const createProduct = await productModel.create({ title, description, price, thumbnail, code, stock, category})
        response.status(200).send({ res: "OK", mes: createProduct})
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})

productRouter.put("/:pid", async(request, response) => {
    const { pid } = request.params
    const { title, description, price, thumbnail, code, stock } = request.body

    try {
        const productByIdUpdate = await productModel.findByIdAndUpdate(pid, {title, description, price, thumbnail, code, stock})
        productByIdUpdate ? response.status(200).send({ res: "OK", message: "Producto actualizado" }) : response.status(404).send({ res: "Error actualizando el producto", message: "Product not found"})
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})

productRouter.delete("/:pid", async(request, response) => {
    const { pid } = request.params

    try {
        const deleteProduct = await productModel.findByIdAndDelete(pid)
        deleteProduct ? response.status(200).send({ res: "OK", message: "Producto borrado" }) : response.status(404).send({ res: "Error borrando el producto", message: "Product not found"})
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})
export default productRouter