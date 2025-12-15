import { useEffect, useState } from "react";
import ProductsCards from "../ui/ProductsCards";
import { useLoaderData } from "react-router";

const Products = ()=>{
    const productData = useLoaderData();
    const [product, setProduct] = useState([]);
    
    useEffect(() => {
        setProduct(productData);
    },[]);

    return(
        <div className="bg-gradient-to-b from-gray-900 to-gray-950">
            <div className="container mx-auto px-4 py-8">
                <ProductsCards product={product} setProduct={setProduct} />
            </div>
        </div>
    )
}


export default Products;