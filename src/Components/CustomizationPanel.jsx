import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";

const CustomizationPanel = ({ snap, modelState, onColorChange, onAddToCart, OnTogglePanel, isCompact = false }) => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [availableParts, setAvailableParts] = useState([]);
  
  // Couleurs prédéfinies pour la personnalisation
  const predefinedColors = [
    "#FAD02E", "#FF6B6B", "#4ECDC4", "#FF9F1C", "#1A535C", "#CBE896", "#6BCB77", "#E6E6FA"
  ];

  useEffect(() => {
    if (snap.parts) {
      const parts = Object.entries(snap.parts).map(([id, part]) => ({
        id,
        name: part.name || id,
        color: part.color || snap.colors[id] || "#ffffff"
      }));
      setAvailableParts(parts);
      
      // Trouver l'index de la partie actuellement sélectionnée
      if (snap.current) {
        const index = parts.findIndex(part => part.id === snap.current);
        if (index !== -1) {
          setCurrentPartIndex(index);
        }
      }
    }
  }, [snap.parts, snap.current, snap.colors]);

  // Navigation entre les parties
  const goToPreviousPart = () => {
    const newIndex = currentPartIndex > 0 ? currentPartIndex - 1 : availableParts.length - 1;
    setCurrentPartIndex(newIndex);
    modelState.current = availableParts[newIndex].id;
  };

  const goToNextPart = () => {
    const newIndex = currentPartIndex < availableParts.length - 1 ? currentPartIndex + 1 : 0;
    setCurrentPartIndex(newIndex);
    modelState.current = availableParts[newIndex].id;
  };

  // Sélection de couleur
  const handleColorSelect = (color) => {
    if (availableParts.length === 0 || currentPartIndex >= availableParts.length) return;
    
    const currentPart = availableParts[currentPartIndex].id;
    onColorChange(color);
    
    // Mettre à jour la couleur dans le tableau local
    const updatedParts = [...availableParts];
    updatedParts[currentPartIndex].color = color;
    setAvailableParts(updatedParts);
  };

  const currentPart = availableParts[currentPartIndex] || { id: "", name: "", color: "#ffffff" };

  return (
    <div className={ `relative ${isCompact ? 'h-1/5' : 'h-2/5'} p-4 flex flex-col bg-gray-200`}>

          {/* Bouton de toggle intégré */}
          <button type="button" className="absolute top-8 left-10 transform -translate-x-1/2
                   bg-white rounded-t-full shadow-lg cursor-pointer z-10
                   px-4 py-1 flex items-center"
        onClick={OnTogglePanel}
      >
        {isCompact ? (
          <ChevronUp size={20} className="text-black-600" />
        ) : (
          <ChevronDown size={20} className="text-black-600" />
        )}
      </button>
      {isCompact ? (
        <div>
        <div className="flex  w-1/2 mx-auto mb-4">
         <button 
           onClick={goToPreviousPart}
           className="p-2 rounded-full hover:bg-gray-100"
         >
           <ChevronLeft size={24} />
         </button>

         <div className="flex-grow text-center">
           <h3 className="text-lg font-medium">{currentPart.name}</h3>
         </div>

         <button 
           onClick={goToNextPart}
           className="p-2 rounded-full hover:bg-gray-100"
         >
           <ChevronRight size={24} />
         </button>
       </div>
     </div>
        
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
               {/* Sélecteur de partie avec navigation */}
          <div className="flex w-1/2 mx-auto mb-4">
            <button 
              onClick={goToPreviousPart}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex-grow text-center">
              <h3 className="text-lg font-medium">{currentPart.name}</h3>
            </div>

            <button 
              onClick={goToNextPart}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Palette de couleurs */}
          <div className=" w-full max-w-md mx-auto grid grid-cols-8 gap-2 sm:gap-3 px-4 mb-6">
            {predefinedColors.map((color, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-7 h-7 rounded-full cursor-pointer border-2"
                style={{ 
                  backgroundColor: color,
                  borderColor: color === currentPart.color ? "#000" : "transparent"
                }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>

          {/* Bouton d'ajout au panier */}
          <button
            onClick={onAddToCart}
            className="mt-auto py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center p-3"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to cart - {((snap.basePrice || 0) + (snap.customizationPrice || 0)).toFixed(2)} €
          </button>
        </div>
      )}
      {/* Prix total */}
      {/* <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-500">Prix de base: {snap.basePrice?.toFixed(2) || "0.00"} €</p>
          <p className="text-sm text-gray-500">Personnalisation: +{snap.customizationPrice?.toFixed(2) || "0.00"} €</p>
        </div>
        <div className="text-lg font-bold">
          Total: {((snap.basePrice || 0) + (snap.customizationPrice || 0)).toFixed(2)} €
        </div>
      </div> */}

   
    </div>
  );
};

export default CustomizationPanel;