import {useState} from "react"
import axios from "axios"
import {useRouter} from "next/router"


export default function ProductForm({
    product:existingProduct,
    description:existingDescription,
    price:existingPrice
}){

    

    const [product,setProduct] = useState(existingProduct || '');
    const [description,setDescription] = useState(existingDescription || '');
    const [price,setPrice] = useState(existingPrice || '');
    const [goToProduct,setGoToProducts] = useState(false);
    const router = useRouter();
    async function createProduct(ev){
        ev.preventDefault() // don't send params in url
        const data = {product,description,price}
        await axios.post('/api/products',data);
        setGoToProducts(true)
    }

    const handleSubmit = (ev) => {
        createProduct(ev)
        // return router.push("/products")
    } 
    
    if(goToProduct){
        router.push("/products")
    }

    return (
        <form onSubmit={handleSubmit}>

            <label>Product name</label>
            <input type="text" 
                onChange={ev => setProduct(ev.target.value)} 
                value={product}
                placeholder="Product Name"/>
            <label>Description</label>

            <textarea 
                placeholder="Description" 
                onChange={ev=>setDescription(ev.target.value)}
                value={description}
            />
            <label>Price (Unit)</label>
            <input type="text" 
                placeholder="Price"
                onChange={ev=>setPrice(ev.target.value)}
                value={price}
            />
            <button
                type="submit" 
                className="btn-primary">Save</button>
        </form>
    )
}