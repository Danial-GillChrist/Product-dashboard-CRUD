import { NavLink } from "react-router";

const Dashboard = () => {
  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-950">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 mt-3 md:mt-10">
          Welcome to <span className="text-blue-400">My Dashboard</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8">
          Discover modern, high-quality products designed for your lifestyle.
        </p>
        <NavLink to={'/products'}>
        <button className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
          All Products
        </button>
        </NavLink>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            We are passionate about crafting experiences that blend creativity,
            innovation, and design. Our mission is to deliver exceptional
            quality and lasting value through each product we offer.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="bg-gray-900 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-gray-800 h-40 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                  Image {num}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Product {num}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <NavLink to={'/products'}>
                  <button className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg">
                    View Details
                  </button>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
