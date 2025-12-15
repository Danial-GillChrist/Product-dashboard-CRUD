import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { addProduct, putProduct, deleteProduct } from "../api/ProductApiData"; // adjust path

const ProductsCards = ({ product, setProduct }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(product);
  const [showFilter, setShowFilter] = useState(false);
  const [filterData, setFilterData] = useState({
    title: "",
    category: ""
  });

  useEffect(() => {
    setFilteredProducts(product);
  }, [product]);

  const applyFilter = () => {
    let result = product;
    if (filterData.title.trim() !== "") {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(filterData.title.toLowerCase())
      );
    }

    if (filterData.category.trim() !== "") {
      result = result.filter((item) =>
        item.category.toLowerCase().includes(filterData.category.toLowerCase())
      );
    }

    setFilteredProducts(result);
    setShowFilter(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    const updatedFilter = {
      ...filterData,
      [name]: value
    };

    setFilterData(updatedFilter);
    liveFilter(updatedFilter);
  };

  const liveFilter = (filters) => {
    let result = product;

    if (filters.title.trim() !== "") {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.category.trim() !== "") {
      result = result.filter((item) =>
        item.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    setFilteredProducts(result);
  };

  const clearFilters = () => {
    setFilterData({ title: "", category: "" });
    setFilteredProducts(product); // reset to original
  };

  // Form States
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: ""
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ADD PRODUCT
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addProduct(formData);
      setProduct((prev) => [...prev, res.data]);
      setShowAddModal(false);
      setFormData({ title: "", description: "", category: "", image: "" });
      setSuccessMsg("Product added successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT PRODUCT
  const handleEditClick = (prod) => {
    setCurrentProduct(prod);
    setFormData({
      title: prod.title,
      description: prod.description,
      category: prod.category,
      image: prod.image
    });
    setShowEditModal(true);
    setOpenMenu(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await putProduct(currentProduct.id, formData);

      // update product in list
      setProduct((prev) =>
        prev.map((p) => (p.id === currentProduct.id ? res.data : p))
      );

      setShowEditModal(false);
      setCurrentProduct(null);
      setSuccessMsg("Product updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE PRODUCT
  const handleDeleteClick = (prod) => {
    setCurrentProduct(prod);
    setShowDeleteModal(true);
    setOpenMenu(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProduct(currentProduct.id);
      setProduct((prev) => prev.filter((p) => p.id !== currentProduct.id));
      setShowDeleteModal(false);
      setSuccessMsg("Product deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
      setCurrentProduct(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 mt-8 md:mt-12">
        <h2 className="text-xl md:text-2xl font-bold text-white">All Products</h2>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 cursor-pointer flex items-center gap-2 text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-blue-500 transition-all"
          >
            <span className="text-xl">+ </span>
            <span className="hidden md:inline">Add Product</span>
          </button>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="bg-gray-800 cursor-pointer text-white px-4 py-2.5 md:py-3 rounded-full shadow-lg hover:bg-gray-700 transition-all flex items-center gap-2"
          >
            <span className="text-xl">☰</span>
            <span className="hidden md:inline">Filter</span>
          </button>
        </div>
      </div>

      {showFilter && (
        <div className="bg-gray-900 border border-gray-700 p-5 rounded-xl mb-6 animate-fadeIn">

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Filters</h3>
            <button
              onClick={() => setShowFilter(false)}
              className="text-gray-300 cursor-pointer text-2xl hover:text-white"
            >
              ×
            </button>
          </div>

          {/* Inputs + Clear Button Row */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">

            {/* Title Filter */}
            <input
              type="text"
              name="title"
              placeholder="Search by Title"
              value={filterData.title}
              onChange={handleFilterChange}
              className="flex-1 p-3 w-full rounded bg-gray-800 text-white outline-none border border-gray-700"
            />

            {/* Category Filter */}
            <input
              type="text"
              name="category"
              placeholder="Search by Category"
              value={filterData.category}
              onChange={handleFilterChange}
              className="flex-1 p-3 w-full rounded bg-gray-800 text-white outline-none border border-gray-700"
            />

            {/* Clear Button */}
            <button
              onClick={clearFilters}
              className="bg-red-600 cursor-pointer whitespace-nowrap text-white px-4 py-2 md:py-3 rounded-lg hover:bg-red-500 transition"
            >
              Clear Filters
            </button>

          </div>
        </div>
      )}


      {/* Success Message */}
      {successMsg && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50">
          {successMsg}
        </div>
      )}

      {/* Product Grid */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((EachProduct, index) => {
          const { id, category, description, image, title } = EachProduct;

          return (
            <li
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="bg-gray-800 flex items-center justify-center h-48 w-full p-4">
                <img
                  src={image}
                  alt={title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex mb-3 items-start justify-between">
                  <span className="text-sm font-medium text-blue-400 uppercase tracking-wide">
                    {category}
                  </span>

                  {/* Dropdown Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === id ? null : id)}
                      className="flex items-center justify-center 
                          bg-gray-800 text-gray-400 
                          hover:bg-gray-600 hover:text-gray-200 
                          h-5 w-8 rounded-full text-lg cursor-pointer"
                    >
                      ⋯
                    </button>
                    {openMenu === id && (
                      <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                        <button
                          className="block w-full cursor-pointer text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
                          onClick={() => handleEditClick(EachProduct)}
                        >
                          Edit
                        </button>

                        <button
                          className="block w-full cursor-pointer text-left px-4 py-2 text-red-400 hover:bg-gray-700"
                          onClick={() => handleDeleteClick(EachProduct)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-100">
                  {title.length > 30 ? title.substring(0, 30) + "..." : title}
                </h3>

                <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                  {description.length > 70
                    ? description.substring(0, 70) + "..."
                    : description}
                </p>

                <NavLink
                  to={`/products/${id}`}
                  className="mt-5 text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
                >
                  View Details
                </NavLink>
              </div>
            </li>
          );
        })}
      </ul>

      {/* ADD PRODUCT MODAL*/}
      {showAddModal && (
        <ModalForm
          title="Add New Product"
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleAddSubmit}
          handleClose={() => setShowAddModal(false)}
        />
      )}

      {/*  EDIT PRODUCT MODAL */}
      {showEditModal && (
        <ModalForm
          title="Edit Product"
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleEditSubmit}
          handleClose={() => setShowEditModal(false)}
        />
      )}

      {/* DELETE CONFIRMATION MODA */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-sm border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete "{currentProduct.title}"?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 cursor-pointer bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsCards;
// REUSABLE MODAL FORM COMPONENT
const ModalForm = ({ title, formData, handleChange, handleSubmit, handleClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 text-white outline-none border border-gray-700"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 text-white outline-none border border-gray-700"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 text-white outline-none border border-gray-700"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 text-white outline-none border border-gray-700"
            required
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 cursor-pointer bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
