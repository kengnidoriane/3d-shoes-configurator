// CustomizationPage.jsx
import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Html, PerspectiveCamera } from "@react-three/drei";
import { useParams, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { motion, AnimatePresence } from "framer-motion";
import Shoe from "./Models/Shoe";
import Rocket from "./Models/Rocket";
import Axe from "./Models/Axe";
import Insect from "./Models/Insect";
import Teapot from "./Models/Teapot";
import Loader from "./Loader";
import { modelStateMap, initializePartColors, applyPreset } from "../utils/store";
import ModelParts from "./ModelParts";
import ColorSelector from "./ColorSelector";
import ColorPresets from "./ColorPresets";
import PriceDisplay from "./PriceDisplay";

const CustomizationPage = () => {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const controls = useRef();
  const cameraRef = useRef();
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

  const getModelComponent = () => {
    switch (modelId) {
      case 'rocket':
        return (
          <Rocket
            castShadow
            colors={snap.colors}
            updateCurrent={(value) => {
              modelState.current = value;
              setSelectedPart(value);
              animateToSelectedPart(value);
            }}
          />
        );
      case 'axe':
        return (
          <Axe
            castShadow
            colors={snap.colors}
            updateCurrent={(value) => {
              modelState.current = value;
              setSelectedPart(value);
              animateToSelectedPart(value);
            }}
          />
        );
      case 'insect':
        return (
          <Insect
            castShadow
            colors={snap.colors}
            updateCurrent={(value) => {
              modelState.current = value;
              setSelectedPart(value);
              animateToSelectedPart(value);
            }}
          />
        );
      case 'teapot':
        return (
          <Teapot
            castShadow
            colors={snap.colors}
            updateCurrent={(value) => {
              modelState.current = value;
              setSelectedPart(value);
              animateToSelectedPart(value);
            }}
          />
        );
      case 'shoe':
      default:
        return (
          <Shoe
            castShadow
            colors={snap.colors}
            updateCurrent={(value) => {
              modelState.current = value;
              setSelectedPart(value);
              animateToSelectedPart(value);
            }}
          />
        );
    }
  };

  const animateToSelectedPart = (part) => {
    if (!part || !controls.current) return;
    
    setAnimating(true);
    
    // Définir des positions de caméra spécifiques pour chaque partie
    // Ces valeurs sont approximatives et devraient être ajustées pour chaque modèle
    let targetPosition;
    
    switch (modelId) {
      case 'shoe':
        if (part === 'sole') targetPosition = [0, -0.5, 2];
        else if (part === 'laces') targetPosition = [0, 0.5, 2];
        else targetPosition = [1, 0, 2];
        break;
      case 'rocket':
        if (part === 'base') targetPosition = [0.5, -1, 1];
        else if (part === 'tip') targetPosition = [0.5, 1, 1];
        else targetPosition = [1, 0, 2];
        break;
      default:
        targetPosition = [1, 0, 2];
    }
    
    // Animer la caméra vers la nouvelle position
    controls.current.setLookAt(
      targetPosition[0], targetPosition[1], targetPosition[2],
      0, 0, 0,
      true // animate
    );
    
    // Réinitialiser l'état d'animation après un délai
    setTimeout(() => {
      setAnimating(false);
    }, 1000);
  };

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

  const handleSelectPart = (part) => {
    setSelectedPart(part);
    modelState.current = part;
    animateToSelectedPart(part);
  };

  const handleApplyPreset = (preset) => {
    applyPreset(modelState, preset);
  };

  const resetControls = () => {
    if (controls.current) {
      controls.current.reset();
    }
  };

  // Gérer le retour au catalogue
  const handleBackToCatalog = () => {
    navigate('/');
  };

  // Ajouter au panier (simulation)
  const handleAddToCart = () => {
    alert(`Produit ajouté au panier! Prix total: ${(snap.basePrice + snap.customizationPrice).toFixed(2)} €`);
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
          Personnalisation {modelId === 'shoe' ? 'de chaussure' : 
                          modelId === 'rocket' ? 'de fusée' : 
                          modelId === 'axe' ? 'de hache' : 
                          modelId === 'insect' ? 'd\'insecte' : 'de théière'}
        </h1>
      </div>
      
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Zone de visualisation 3D */}
        <div className="w-full md:w-2/3 h-1/2 md:h-full relative">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[1, 0, 2]} ref={cameraRef} />
            <ambientLight intensity={0.7} />
            <spotLight
              intensity={0.5}
              penumbra={1}
              position={[7, 15, 10]}
              castShadow
            />
            <mesh
              receiveShadow
              rotation={[-Math.PI / 2, 0, 1.1]}
              position={[0, -1, 0]}
            >
              <planeGeometry args={[100, 100]} />
              <shadowMaterial opacity={0.3} />
            </mesh>
            <Suspense fallback={<Loader />}>
              <Float
                speed={1}
                rotationIntensity={animating ? 0.2 : 1}
                floatIntensity={animating ? 0.2 : 1}
                floatingRange={[0, 0.3]}
              >
                {getModelComponent()}
              </Float>
            </Suspense>
            <OrbitControls 
              ref={controls} 
              maxDistance={5} 
              minDistance={1.5} 
              enablePan={false}
              enableZoom={!animating}
              enableRotate={!animating}
            />
          </Canvas>

          {/* Indicateur de partie sélectionnée */}
          <AnimatePresence>
            {snap.current && (
              <motion.div
                key={snap.current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 left-4 bg-white px-4 py-2 rounded-md shadow-lg"
              >
                Partie sélectionnée: {snap.parts[snap.current]?.name || snap.current}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Panneau de personnalisation */}
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
            onColorChange={(color) => updateColorForPart(snap.current, color)}
          />

          {/* Bouton d'ajout au panier */}
          <div className="mt-8">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Ajouter au panier - {(snap.basePrice + snap.customizationPrice).toFixed(2)} €
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPage;