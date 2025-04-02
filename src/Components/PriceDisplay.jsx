import React from 'react';
import { motion } from 'framer-motion';

const PriceDisplay = ({ basePrice, customizationPrice }) => {
  const totalPrice = (basePrice + customizationPrice).toFixed(2);
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Prix</h3>
      <motion.div 
        className="bg-blue-50 p-4 rounded-lg border border-blue-100"
        animate={{ 
          scale: [1, 1.03, 1],
          transition: { duration: 0.3 }
        }}
        key={totalPrice} // Cette clé permet de déclencher l'animation quand le prix change
      >
        <div className="text-2xl font-bold text-blue-700">
          {totalPrice} €
        </div>
        {customizationPrice > 0 && (
          <div className="text-sm text-blue-600 mt-1">
            Prix de base: {basePrice.toFixed(2)} € + Personnalisation: {customizationPrice.toFixed(2)} €
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PriceDisplay;
