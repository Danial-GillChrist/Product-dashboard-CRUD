import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

const ProductsDetails = () => {
  const [proItem, setProItem] = useState({});
  const productItem = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    setProItem(productItem);
  }, [productItem]);

  const navigateHandler = () => {
    navigate(-1);
  };

  if (!proItem?.title) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-300">
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-shrink-0 flex justify-center items-center bg-gray-900 rounded-xl p-6 w-full lg:w-1/2">
          <img
            src={proItem.image}
            alt={proItem.title}
            className="max-h-80 object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between lg:w-1/2">
          <div>
            <h1 className="text-3xl font-bold mb-3 text-indigo-400">
              {proItem.title}
            </h1>
            <span className="inline-block bg-indigo-700 text-white text-xs font-semibold px-3 py-1 rounded-md mb-4 uppercase">
              {proItem.category}
            </span>

              <p className="text-3xl mb-3 font-semibold text-green-400">
              ₹ {(Math.random() * 5000 + 999).toFixed(0)}
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              {proItem.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <div className="flex gap-3">
              <button
                onClick={navigateHandler}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-6 py-2 rounded-lg font-medium transition cursor-pointer"
              >
                ← Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
