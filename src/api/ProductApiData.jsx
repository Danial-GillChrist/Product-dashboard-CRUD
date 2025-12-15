import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const productApiData = async () => {
  try {
    const res = await api.get(); 
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Post Method
export const addProduct = (newpost) =>{
    return api.post("/" , newpost);
}

// Delete Method
export const deleteProduct = (id) => {
    return api.delete(`/${id}`);
};

// Put Method
export const putProduct = (id, post) => {
    return api.put(`/${id}`, post)
}