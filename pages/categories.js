import Layout from "@/components/Layouts";
import axios from "axios";
import { useEffect, useState } from "react";

export default function categories(){
    const [name,setName] = useState('');
    const [categories,setCategories] = useState([]);
    const [parentCategories,setParentCategories] = useState([]);

    async function saveCategory(ev){
        ev.preventDefault();
        await axios.post("/api/categories",{name,parentCategories})
        setName('');
        fetchCategory();
    }

    async function fetchCategory(){
        // axios.get("/api/categories").then(result=> console.log(result))
        axios.get("/api/categories").then(result=>setCategories(result.data))

    }

    useEffect(()=>{
        fetchCategory();
    },[])
    
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
            <select 
            className="mb-0"
            onChange={ev=>setParentCategories(ev.target.value)}>
                <option value="0">No Category</option>
                {
                    categories.length > 0 && categories.map(category=>(
                        <option value={category._id}>{category.name}</option>
                    ))
                }
            </select>
            <button type= "submit" className="btn-primary py-1">Save</button>
        </form>

        <table className="basic mt-4">
            <thead>
                <tr>
                    <td>Category Name</td>
                </tr>
            </thead>
            <tbody>
                {
                    categories.length > 0 && categories.map(category=>(
                        <tr>{category.name}</tr>
                    ))
                }
            </tbody>
        </table>
    </Layout>
    )
}