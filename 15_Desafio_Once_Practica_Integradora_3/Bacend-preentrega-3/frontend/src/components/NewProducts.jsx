import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getCookiesByName } from "../utils/formsUtils.js"

export const NewProducts = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSumbit = async (e) => {
        e.preventDefault()
        const datForm = new FormData(formRef.current)
        const data = Object.fromEntries(datForm)
        const token = getCookiesByName('jwtCookie')
        console.log(token)
        const response = await fetch('http://localhost:4000/api/products', {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.status === 201) {
            const datos = await response.json()
            console.log(datos)
        } else {
            console.log(response)
        }
    }

    return (
        <div className='container'>

            <h2>Crear nuevo producto</h2>

            <form onSubmit={handleSumbit} ref={formRef}>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título: </label>
                    <input type="text" name='title' className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción: </label>
                    <input type="text" name='description' className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Categoría: </label>
                    <input type="text" name='category' className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="code" className="form-label">Código: </label>
                    <input type="text" name='code' className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Precio: </label>
                    <input type="number" name='price' className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock: </label>
                    <input type="number" name='stock' className="form-control" />
                </div>

                <button type="submit" className="btn btn-dark">Crear producto</button>

            </form>

        </div>
    )
}   