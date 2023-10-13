import Layout from "@/components/Layouts";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import axios from "axios"

export default function DeleteProductPage(){
    const router = useRouter();
    const [productInfo,setProductInfo] = useState(null);
    const {id} = router.query;
    useEffect(()=> {
        if(!id){
            return
        }else{
            axios.get("/api/products?id="+id).then(response => {
                console.log(response.data)
                setProductInfo(response.data);
            })
        }
    },[id])

    async function deleteProduct(){
        await axios.delete("/api/products?id="+id)
        router.push("/products")
    }
    

    return (
        <Layout>
        <h1 className="text-center">Do you want to delete {productInfo?.product}?</h1>
        <div className="flex gap-1 justify-center">
            <button className="btn-red" onClick={deleteProduct}>Yes</button>
            <button className="btn-default">No</button>
        </div>
    </Layout>
    )
}