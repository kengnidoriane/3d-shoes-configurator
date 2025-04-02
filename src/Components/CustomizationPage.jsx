import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { modelStateMap, initializePartColors } from "../utils/store";
import ModelViewer from "./ModelViewer";
import CustomizationPanel from "./CustomizationPanel";

const CustomizationPage = () => {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState(null);
  const [animating, setAnimating] = useState(false);
  
  // Utiliser l'état correspondant au modèle sélectionné
  const modelState = modelStateMap[modelId];
  const snap = useSnapshot(modelState);

  // Initialiser les couleurs des parties au chargement
  useEffect(() => {
    if (modelState) {
      initializePartColors(modelState);
    } else {
      // Rediriger vers le catalogue si le modèle n'existe pas
      navigate('/');
    }
  }, [modelState, navigate, modelId]);

  // Gérer le retour au catalogue
  const handleBackToCatalog = () => {
    navigate('/');
  };

  // Ajouter au panier (simulation)
  const handleAddToCart = () => {
    alert(`Produit ajouté au panier! Prix total: ${(snap.basePrice + snap.customizationPrice).toFixed(2)} €`);
  };

  // Fonction pour mettre à jour la partie sélectionnée
  const handleUpdateSelectedPart = (part) => {
    modelState.current = part;
    setSelectedPart(part);
    setAnimating(true);
    
    // Réinitialiser l'état d'animation après un délai
    setTimeout(() => {
      setAnimating(false);
    }, 1000);
  };

  // Fonction pour mettre à jour la couleur d'une partie
  const updateColorForPart = (part, color) => {
    if (!part || !modelState) return;
    
    // Mettre à jour la couleur dans l'objet colors
    modelState.colors[part] = color;
    
    // Mettre également à jour la couleur dans l'objet parts
    if (modelState.parts[part]) {
      modelState.parts[part].color = color;
    }
    
    // Ajouter 2€ pour chaque changement de couleur
    modelState.customizationPrice += 2;
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Barre supérieure avec bouton retour et titre */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <button 
          onClick={handleBackToCatalog}
          className="mr-4 px-3 py-1 rounded-md hover:bg-gray-100"
        >
          ← Retour
        </button>
        <h1 className="text-xl font-semibold">
          Personnalisation {
            modelId === 'shoe' ? 'de chaussure' : 
            modelId === 'rocket' ? 'de fusée' : 
            modelId === 'axe' ? 'de hache' : 
            modelId === 'insect' ? 'd\'insecte' : 'de théière'
          }
        </h1>
      </div>
      
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Zone de visualisation 3D */}
        <ModelViewer 
          modelId={modelId}
          modelState={modelState}
          snap={snap}
          animating={animating}
          onUpdateSelectedPart={handleUpdateSelectedPart}
        />

        {/* Panneau de personnalisation */}
        <CustomizationPanel 
          snap={snap}
          modelState={modelState}
          onColorChange={(color) => updateColorForPart(snap.current, color)}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default CustomizationPage;