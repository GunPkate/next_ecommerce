import Layout from "@/components/Layouts";
import {useState} from "react"
import axios from "axios"
import {useRouter} from "next/router"

export default function NewProduct(){
    const [product,setProduct] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
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

   return <Layout>
        <form onSubmit={handleSubmit}>
            <h1>New Product</h1>
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
        </Layout> 
}