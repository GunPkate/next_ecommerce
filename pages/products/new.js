import Layout from "@/components/Layouts";

export default function NewProduct(){
   return <Layout>
        <h1>New Product</h1>
        <label>Product name</label>
        <input type="text" placeholder="Product Name"/>
        <label>Description</label>
        <textarea placeholder="Description"/>
        <label>Price (Unit)</label>
        <input type="text" placeholder="Price"/>
        <button className="btn-primary">Save</button>
   </Layout> 
}