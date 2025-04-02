import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { motion } from 'framer-motion';

const ColorSelector = ({ selectedPart, currentColor, onColorChange }) => {
  if (!selectedPart) {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-md text-center text-gray-500">
        Sélectionnez une partie du modèle pour changer sa couleur
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6"
    >
      <h3 className="text-lg font-semibold mb-3">
        Couleur pour: <span className="text-blue-600">{selectedPart}</span>
      </h3>
      <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
        <HexColorPicker 
          color={currentColor} 
          onChange={onColorChange}
          className="w-full"
        />
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <div 
              className="w-8 h-8 rounded-md mr-2 border border-gray-300" 
              style={{ backgroundColor: currentColor }}
            />
            <span className="text-sm font-mono">{currentColor}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ColorSelector;
