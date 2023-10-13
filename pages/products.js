import Layout from "@/components/Layouts"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"


export default function Products(){
    const [products,setProducts] = useState([]);

    useEffect( ()=>{
        axios.get("/api/products").then(response=>{
            console.log(response.data);
            setProducts(response.data);
        })
    },[] )

    return (
        <Layout>
            <Link className="bg-blue-900 text-white
            rounded-md py-1 px-2" href={"products/new"}>Add New Item</Link>
            <table>
                <thead>

                    <tr>
                        <td>Product Name</td>
                        <td>Description</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody>
                    {products.map( data => (
                        <tr>
                            <td>{data.product}</td>
                            <td>{data.description}</td>
                            <td>{data.price}</td>
                        </tr>
                        )
                    )}
                </tbody>
            </table>
        </Layout>
    );
    
}