import { Router, response } from "express"
import { cartsModel } from "../models/carts.models.js"
import { productModel } from "../models/products.models.js"

const cartRouter = Router()

cartRouter.get("/", async (request, response)=>{
    try {
        const cart = await cartsModel.find()
        console.log(cart);
        response.status(200).send({ res: "OK" , message: cart })
    }catch (error) {
        response.status(404).send({ res: "ERROR", message: error})
}
})

cartRouter.get("/:cid", async (request, response) => {
    const { cid } = request.params
    try {
        const cartById = await cartsModel.findById(cid)
        response.status(200).send({ res: "OK" , message: cartById })
    } catch (error) {
        response.status(404).send({ res: "ERROR", message: error})
    }
})

cartRouter.post("/", async (request, response) => {
    try {
        const cartCreate = await cartsModel.create({})
        console.log(cartCreate)
        response.status(200).send({ res: "OK" , message: cartCreate })
    } catch (error) {
        response.status(404).send({ res: "ERROR", message: error})
    }
})

cartRouter.post("/:cid/products/:pid", async (request, response) => {
    const { cid , pid } = request.params
    const { quantity } = request.body

    try {      
        const cart = await cartsModel.findById(cid)
    
        if(cart){
            const product = await productModel.findById(pid)
            
            if(product){    
                const index = cart.products.findIndex(element => element.id_prod._id == pid)
                if(index != -1){  
                    cart.products[index].quantity = quantity
                }else{
                    cart.products.push({ id_prod: pid, quantity: quantity })
                }
                const resp = await cartsModel.findByIdAndUpdate(cid, cart)
                response.status(200).send({ res:"OK", message: resp})
                
            }else{
                response.status(404).send({ res: "Error en agregar producto al carrito", message: "Producto no encontrado"})
            }

        }else{
            response.status(404).send({ res: "Error en agregar producto al carrito", message: "Carrito no encontrado"})
        }

    } catch (error) {
        response.status(404).send({ res: "Error en agregar producto al carrito", message: error})
    }

})

cartRouter.delete("/:cid/products/:pid", async (request, response) => {
    const { cid , pid } = request.params

    try {      
        const cart = await cartsModel.findById(cid)
    
        if(cart){
            const product = await productModel.findById(pid)
            
            if(product){    
                console.log(cart.products);
                const index = cart.products.findIndex(element => element.id_prod._id == pid)
                console.log(index);
                if(index != -1){  
                    cart.products.splice(index, 1)
                }
                const resp = await cartsModel.findByIdAndUpdate(cid, cart)
                response.status(200).send({ res:"OK", message: resp})
                
            }else{
                response.status(404).send({ res: "Error en borrar producto del carrito", message: "Producto no encontrado"})
            }

        }else{
            response.status(404).send({ res: "Error en borrar producto del carrito", message: "Carrito no encontrado"})
        }

    } catch (error) {
        response.status(404).send({ res: "Error en borrar producto del carrito", message: error})
    }

})

cartRouter.put("/:cid", async(request, response) => {
    const { cid } = request.params
    const arrayProd = request.body.products
    console.log(arrayProd);

    try {
        const cart = await cartsModel.findById(cid)
        
        arrayProd.forEach(el => {
            const index = cart.products.findIndex(element => element.id_prod._id == el.id_prod._id)
            console.log(index);
            if( index != -1 ){
                cart.products[index].quantity = el.quantity
            }else{
                cart.products.push(el)
            }
        })

        const resp = await cartsModel.findByIdAndUpdate(cid, cart)
        
        response.status(200).send({ res:"OK", message: resp})
    } catch (error) {
        response.status(404).send({ res: "ERROR", message: error})
    }
})

cartRouter.delete("/:cid", async(request, response)=> {
    const { cid } = request.params
    try {
        await cartsModel.findByIdAndUpdate(cid, { products: [] })
        response.status(200).send({ res:"OK", message: "Carrito vaciado"})
    } catch (error) {
        response.status(404).send({ res: "Error en borrar producto del carrito", message: error})
    }
})

cartRouter.put("/:cid/products/:pid", async (request, response) => {
    const { cid, pid } = request.params
    const { quantity } = request.body

    try {
        const cart = await cartsModel.findById(cid)
        if(cart){
            const product = await productModel.findById(pid)

            if(product){
                const index = cart.products.findIndex(prods => prods.id_prod._id == pid)
                if(index != -1){
                    cart.products[index].quantity = quantity
                }else{
                    cart.products.push( { id_prod: pid, quantity: quantity})
                }
            }
        }
        response.status(200).send({ res:"OK", message: "Carrito actualizado"})
    } catch (error) {
        response.status(404).send({ res: "Error al actualizar producto del carrito", message: error})
    }
})


export default cartRouter