import Layout from "@/components/Layouts";
import axios from "axios";
import { useEffect, useState } from "react";
import {withSwal} from 'react-sweetalert2'

function Categories({swal}){
    const [name,setName] = useState('');
    const [categories,setCategories] = useState([]);
    const [parentCategories,setParentCategories] = useState('');

    const [editedCategory,setEditedCategory] = useState(null);

    async function saveCategory(ev){
        ev.preventDefault();
        const data = {name,parentCategories}
        if(editedCategory){
            data._id = editedCategory._id
            await axios.put("/api/categories",data)
            setEditedCategory(null)
        } else {
            await axios.post("/api/categories",data)
        }
        setName('');
        fetchCategory();
    }

    async function fetchCategory(){
        // axios.get("/api/categories").then(result=> console.log(result))
        axios.get("/api/categories").then(result=>setCategories(result.data))

    }

    function editCategory(category){
        console.log(category)
        setEditedCategory(category);
        setName(category.name)
        setParentCategories(category.parent?._id)
    }

    function deleteCategory (category){

            swal.fire(
                {
                    show: true,
                    title: 'Confirm Delete',
                    text: `Do you want to Delete ${category.name} ?`,
                    showCancelButton: true,
                    cancelButtonText: 'Cancle',
                    confirmButtonText: 'Yes, Delete!',
                    confirmButtonColor: '#d55',
                }).then(async result => {
                    if(result.isConfirmed){
                        const {_id} = category
                        await axios.delete('/api/categories?_id='+_id,)
                        fetchCategory()
                    }
                })
    }

    useEffect(()=>{
        fetchCategory();
    },[])
    
    return (
    <Layout>
        <h1>
            Categories
        </h1>
        <label>{editedCategory ? `Edit Category Name ${editedCategory.name}` : 'New Category Name'}</label>
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
                    <td>Parent Category</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {
                    categories.length > 0 && categories.map(category=>(
                        <tr>
                            <td> {category.name} </td>
                            <td> {category.parent?.name} </td>
                            <td>
                                <button className="btn-primary mr-1" onClick={()=>editCategory(category)}>Edit</button>
                                <button className="btn-primary" onClick={()=>deleteCategory(category)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </Layout>
    )
}

export default  withSwal( ({swal}, ref) => (
    <Categories swal={swal}/>
) )