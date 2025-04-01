import React from 'react';
import { useNavigate } from 'react-router-dom';
import shoe from "../img/shoe.png";
import rocket from "../img/rocket.png";
import axe from "../img/axe.png";
import insect from "../img/insect.png";
import teapot from "../img/teapot.png";

const products = [
  {
    id: 1,
    name: "Custom Shoe",
    image: shoe,
    basePrice: 99.99,
    description: "Personnalisez votre chaussure unique"
  },
  {
    id: 2,
    name: "Custom Rocket",
    image: rocket,
    basePrice: 149.99,
    description: "Créez votre propre fusée"
  },
  {
    id: 3,
    name: "Custom Axe",
    image: axe,
    basePrice: 79.99,
    description: "Personnalisez votre hache"
  },
  {
    id: 4,
    name: "Custom Insect",
    image: insect,
    basePrice: 59.99,
    description: "Créez votre insecte unique"
  },
  {
    id: 5,
    name: "Custom Teapot",
    image: teapot,
    basePrice: 89.99,
    description: "Personnalisez votre théière"
  }
];

const CatalogPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Models
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="relative h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.basePrice.toFixed(2)} €
                  </span>
                  <button
                    onClick={() => navigate(`/customize/${product.name.toLowerCase().replace(' ', '-')}`)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                  >
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