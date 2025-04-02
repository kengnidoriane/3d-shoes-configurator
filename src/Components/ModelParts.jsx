import React from 'react';
import { motion } from 'framer-motion';

const ModelParts = ({ parts, current, onSelectPart }) => {
  if (!parts || Object.keys(parts).length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Parties du modèle</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(parts).map(([key, part]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-2 rounded-md text-left transition-all ${
              current === key 
                ? 'bg-blue-100 border-2 border-blue-500 shadow-md' 
                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => onSelectPart(key)}
          >
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: part.color || '#cccccc' }}
              />
              <span>{part.name || key}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ModelParts;
