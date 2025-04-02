import React from "react";
import { applyPreset } from "../utils/store";
import PriceDisplay from "./PriceDisplay";
import ColorPresets from "./ColorPresets";
import ModelParts from "./ModelParts";
import ColorSelector from "./ColorSelector";

const CustomizationPanel = ({ snap, modelState, onColorChange, onAddToCart }) => {
  const handleSelectPart = (part) => {
    modelState.current = part;
  };

  const handleApplyPreset = (preset) => {
    applyPreset(modelState, preset);
  };

  return (
    <div className="w-full md:w-1/3 h-1/2 md:h-full bg-white p-4 shadow-lg overflow-y-auto">
      {/* Affichage du prix */}
      <PriceDisplay 
        basePrice={snap.basePrice || 0} 
        customizationPrice={snap.customizationPrice || 0} 
      />

      {/* Préréglages de couleurs */}
      <ColorPresets 
        presets={snap.presets} 
        onApplyPreset={handleApplyPreset} 
      />

      {/* Liste des parties du modèle */}
      <ModelParts 
        parts={snap.parts} 
        current={snap.current} 
        onSelectPart={handleSelectPart} 
      />

      {/* Sélecteur de couleur */}
      <ColorSelector 
        selectedPart={snap.current} 
        currentColor={snap.current ? snap.colors[snap.current] : null}
        onColorChange={onColorChange}
      />

      {/* Bouton d'ajout au panier */}
      <div className="mt-8">
        <button
          onClick={onAddToCart}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Ajouter au panier - {(snap.basePrice + snap.customizationPrice).toFixed(2)} €
        </button>
      </div>
    </div>
  );
};

export default CustomizationPanel;