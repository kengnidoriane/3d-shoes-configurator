import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { useParams, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { state } from "../utils/store";
import { motion } from "framer-motion";
import { HexColorPicker } from "react-colorful";
import Shoe from "./Models/Shoe";
import Rocket from "./Models/Rocket";
import Axe from "./Models/Axe";
import Insect from "./Models/Insect";
import Teapot from "./Models/Teapot";
import Loader from "./Loader";

const CustomizationPage = () => {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const snap = useSnapshot(state);
  const controlsRef = useRef();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const getModelComponent = () => {
    switch (modelId) {
      case 'shoe':
        return Shoe;
      case 'rocket':
        return Rocket;
      case 'axe':
        return Axe;
      case 'insect':
        return Insect;
      case 'teapot':
        return Teapot;
      default:
        return Shoe;
    }
  };

  const ModelComponent = getModelComponent();

  const handlePartSelect = (partName) => {
    state.selectedPart = partName;
    setShowColorPicker(true);

    // Animation de la caméra
    if (controlsRef.current) {
      const positions = {
        laces: [0, 0, 2],
        sole: [0, -1, 2],
        // Ajoutez d'autres positions pour chaque partie
      };
      
      controlsRef.current.setAzimuthalAngle(positions[partName]?.[0] || 0);
      controlsRef.current.setPolarAngle(positions[partName]?.[1] || 0);
      controlsRef.current.update();
    }
  };

  const updatePrice = () => {
    const basePrice = state.basePrice;
    const customizationPrice = state.customizationPrice;
    return (basePrice + customizationPrice).toFixed(2);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Zone de visualisation 3D */}
      <div className="w-full md:w-3/4 h-2/3 md:h-screen relative">
        <Canvas shadows camera={{ position: [0, 0, 2.5], fov: 50 }}>
          <Suspense fallback={<Loader />}>
            <Stage environment="city" intensity={0.5}>
              <ModelComponent />
            </Stage>
            <OrbitControls 
              ref={controlsRef}
              enablePan={false}
              enableZoom={true}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI - Math.PI / 4}
            />
          </Suspense>
        </Canvas>

        {/* Indicateur de partie sélectionnée */}
        {snap.selectedPart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 left-4 bg-white px-4 py-2 rounded-md shadow-lg"
          >
            Partie sélectionnée: {snap.selectedPart}
          </motion.div>
        )}
      </div>

      {/* Panneau de personnalisation */}
      <div className="w-full md:w-1/4 h-1/3 md:h-screen bg-white p-4 shadow-lg overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Personnalisation</h2>
          <div className="flex flex-col space-y-2">
            <p className="text-xl font-semibold text-blue-600">
              Prix: {updatePrice()} €
            </p>
            {state.customizationPrice > 0 && (
              <p className="text-sm text-gray-600">
                +{state.customizationPrice}€ de personnalisation
              </p>
            )}
          </div>
        </div>

        {/* Presets de couleurs */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Styles prédéfinis</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(state.presets).map(([key, preset]) => (
              <button
                key={key}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
                onClick={() => {
                  state.colors = { ...preset.colors };
                  state.customizationPrice = preset.price;
                }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sélecteur de couleurs */}
        {showColorPicker && snap.selectedPart && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Couleur</h3>
            <HexColorPicker
              color={snap.colors[snap.selectedPart]}
              onChange={(color) => {
                state.colors[snap.selectedPart] = color;
                state.customizationPrice += 5; // Ajoute 5€ pour chaque changement de couleur
              }}
            />
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto">
          <button
            onClick={() => {
              // Logique de sauvegarde
              alert('Personnalisation sauvegardée !');
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-3"
          >
            Sauvegarder
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Retour au catalogue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPage;