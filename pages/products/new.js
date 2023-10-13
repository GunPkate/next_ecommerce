import Layout from "@/components/Layouts";
import { Nav } from "@/components/Nav";
import ProductForm from "@/components/ProductForm";

export default function NewProduct(){
    return  (      
        <Layout>
            <h1>New Product</h1>
            <ProductForm/>
        </Layout>
    )
    
    
}