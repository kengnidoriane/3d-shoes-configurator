import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { modelStateMap, initializePartColors } from "../utils/store";
import ModelViewer from "./ModelViewer";
import CustomizationPanel from "./CustomizationPanel";

const CustomizationPage = () => {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [panelHeight, setPanelHeight] = useState("2/5")
  
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

  // Toggle pour le panneau de personnalisation
  const togglePanel = () => {
    setPanelHeight(prev => prev === "2/5" ? "1/5" : "2/5")
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-grow relative">
        <ModelViewer 
          modelId={modelId}
          modelState={modelState}
          snap={snap}
          animating={animating}
          onUpdateSelectedPart={handleUpdateSelectedPart}
        />


        <AnimatePresence>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="absolute bottom-0 left-0 right-0 bg-white shadow-lg"
            //   style={{ height: "33.333%" }}
            >
              <CustomizationPanel 
                snap={snap}
                modelState={modelState}
                onColorChange={(color) => updateColorForPart(snap.current, color)}
                onAddToCart={handleAddToCart}
                OnTogglePanel={togglePanel}
                isCompact={panelHeight === "1/5"}
              />
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomizationPage;