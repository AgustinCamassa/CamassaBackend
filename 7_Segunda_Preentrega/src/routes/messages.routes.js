import { Router } from "express";
import { messagesModel } from "../models/messages.models.js";

const messageRouter = Router()

messageRouter.get("/", async(request, response) => {
    const { limit } = request.params

    try {
        const message = await messagesModel.find().limit(limit)
        response.status(200).send({ res: "OK", mes: message})
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})

messageRouter.post("/", async(request, response) => {

    const { email, message } = request.body

    try {
        const messageCreate = messagesModel.create({ email, message })
        response.status(200).send({ res: "OK", mes: messageCreate})
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})

export default messageRouter