
export const productApiDetails = async({params})=>{
   const id = params.proid;
    try{
        const res = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
        const data = await res.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error)
    }
}