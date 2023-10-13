import Layout from "@/components/Layouts";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import axios from "axios"
import ProductForm from "@/components/ProductForm";

export default function EditProductPage(){
    const router = useRouter();
    const [productInfo,setProductInfo] = useState(null);
    const {id} = router.query;
    useEffect(()=> {
        if(!id){
            return
        }
        axios.get("/api/products?id="+id).then(response => {
            console.log(response.data)
            setProductInfo(response.data);
        })
    },[id]);

    return (
        <Layout>
            <h1>Edit Product</h1>
            <ProductForm {...productInfo}/>
        </Layout>
    )
}