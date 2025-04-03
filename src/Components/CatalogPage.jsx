import React from 'react';
import { useNavigate } from 'react-router-dom';
import shoe from "../img/shoe.png";
import rocket from "../img/rocket.png";
import axe from "../img/axe.png";
import insect from "../img/insect.png";
import teapot from "../img/teapot.png";
import { modelStateMap } from "../utils/store";
import { ShoppingCart, Wand2 } from 'lucide-react';

const products = [
  {
    id: 'shoe',
    name: "Shoe",
    image: shoe,
    basePrice: 99.99,
    description: "Customize your unique shoe"
  },
  {
    id: 'rocket',
    name: "Rocket",
    image: rocket,
    basePrice: 149.99,
    description: "Create your own rocket"
  },
  {
    id: 'axe',
    name: "Axe",
    image: axe,
    basePrice: 79.99,
    description: "Customize your Axe"
  },
  {
    id: 'insect',
    name: "Insect",
    image: insect,
    basePrice: 59.99,
    description: "Create your unique insect"
  },
  {
    id: 'teapot',
    name: "Teapot",
    image: teapot,
    basePrice: 89.99,
    description: "Personalize your teapot"
  }
];

const CatalogPage = () => {
  const navigate = useNavigate();

  const handleCustomize = (product) => {
    if (modelStateMap[product.id]) {
      modelStateMap[product.id].basePrice = product.basePrice;
      modelStateMap[product.id].customizationPrice = 0;
    }
    navigate(`/customize/${product.id}`);
  };

  const handleAddToCart = (product) => {
    alert(`${product.name} is add to cart`);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our customizable models
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col"
            >
              <div className="p-4 bg-gray-50 flex justify-center items-center h-64">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-full object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-center mt-auto">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                  <span className="text-2xl font-bold text-red-500">{product.basePrice.toFixed(2)} €</span>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center mt-auto">
                <button
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 border border-solid border-black rounded-lg  transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => handleCustomize(product)}
                    className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    <Wand2 className="mr-2 w-5 h-5" />
                    Customize
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
