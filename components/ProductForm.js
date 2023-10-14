import {useState} from "react"
import axios from "axios"
import {useRouter} from "next/router"


export default function ProductForm({
    _id,
    product:existingProduct,
    description:existingDescription,
    price:existingPrice,
    images
}){

    

    const [product,setProduct] = useState(existingProduct || '');
    const [description,setDescription] = useState(existingDescription || '');
    const [price,setPrice] = useState(existingPrice || '');
    const [goToProduct,setGoToProducts] = useState(false);
    const router = useRouter();
    async function createProduct(ev){
        ev.preventDefault() // don't send params in url
        const data = {product,description,price}
        if(_id){
            await axios.put('/api/products',{...data,_id})
        }else{
            await axios.post('/api/products',data);
        }
        setGoToProducts(true)
    }

    const handleSubmit = (ev) => {
        createProduct(ev)
        // return router.push("/products")
    } 
    
    if(goToProduct){
        router.push("/products")
    }

    async function uploadImages(ev){
        console.log(ev) //ev.target.files
        const files = ev.target?.files;

        if(files?.length > 0) {
            const data = new FormData();

            for(const file of files){
                console.log("files",file)
                data.append('file',file)
                console.log(data)
            }
            const res = await fetch("/api/uploads",{
                method: "POST",
                body: data
            })
        };
    }

    return (
        <form onSubmit={handleSubmit}>

            <label>Product name</label>
            <input type="text" 
                onChange={ev => setProduct(ev.target.value)} 
                value={product}
                placeholder="Product Name"/>

            <label>Photo</label>
            <div className="mb-2">
                <label className="cursor-pointer w-24 h-24 border text-center flex justify-center items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    Upload
                <input type="file" className="hidden" onChange={uploadImages}/>
                </label>
                {!images?.length &&(
                    <div>No photos</div>
                )}
            </div>

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