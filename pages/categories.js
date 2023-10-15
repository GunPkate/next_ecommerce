import Layout from "@/components/Layouts";
import axios from "axios";
import { useState } from "react";

export default function categories(){
    const [name,setName] = useState();
    async function saveCategory(){
        // await axios.post("/api/categories",{name})
        console.log(name)
        setName('');
    }
    
    return (
    <Layout>
        <h1>
            Categories
        </h1>
        <label>New category name</label>
        <form onSubmit={saveCategory} className="flex gap-1">
            <input className="mb-0" type="text" 
                placeholder={'Category Name'}
                onChange={ev => setName(ev.target.value)}
                value = {name}
                />
            <button type= "submit" className="btn-primary py-1">Save</button>
        </form>
    </Layout>
    )
}