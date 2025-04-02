import React from 'react';
import { motion } from 'framer-motion';

const ColorPresets = ({ presets, onApplyPreset }) => {
  if (!presets || Object.keys(presets).length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Styles prédéfinis</h3>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(presets).map(([key, preset]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors flex items-center justify-between"
            onClick={() => onApplyPreset(preset)}
          >
            <span>{key}</span>
            <div className="flex">
              {Object.values(preset).slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full ml-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ColorPresets;
