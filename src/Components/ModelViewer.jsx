import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Shoe from "./Models/Shoe";
import Rocket from "./Models/Rocket";
import Axe from "./Models/Axe";
import Insect from "./Models/Insect";
import Teapot from "./Models/Teapot";
import Loader from "./Loader";

const ModelViewer = ({ modelId, modelState, snap, animating, onUpdateSelectedPart }) => {
  const controls = useRef();
  const cameraRef = useRef();

  const getModelComponent = () => {
    // S'assurer que colors est initialisé avant de le passer
    const colors = snap.colors || {};
    
    const updateCurrent = (value) => {
      onUpdateSelectedPart(value);
      animateToSelectedPart(value);
    };

    switch (modelId) {
      case 'rocket':
        return <Rocket castShadow colors={colors} updateCurrent={updateCurrent} />;
      case 'axe':
        return <Axe castShadow colors={colors} updateCurrent={updateCurrent} />;
      case 'insect':
        return <Insect castShadow colors={colors} updateCurrent={updateCurrent} />;
      case 'teapot':
        return <Teapot castShadow colors={colors} updateCurrent={updateCurrent} />;
      case 'shoe':
      default:
        return <Shoe castShadow colors={colors} updateCurrent={updateCurrent} />;
    }
  };

  const animateToSelectedPart = (part) => {
    if (!part || !controls.current) return;
    
    let targetPosition, lookAtTarget;
    
    switch (modelId) {
      case 'shoe':
        switch (part) {
          case 'sole':
            targetPosition = [0, -0.5, 2];
            lookAtTarget = [0, -0.5, 0];
            break;
          case 'laces':
            targetPosition = [0, 0.5, 2];
            lookAtTarget = [0, 0.5, 0];
            break;
          default:
            targetPosition = [1, 0, 2];
            lookAtTarget = [0, 0, 0];
        }
        break;
      
      case 'rocket':
        switch (part) {
          case 'base':
            targetPosition = [0.5, -1, 1];
            lookAtTarget = [0.5, -1, 0];
            break;
          case 'tip':
            targetPosition = [0.5, 1, 1];
            lookAtTarget = [0.5, 1, 0];
            break;
          default:
            targetPosition = [1, 0, 2];
            lookAtTarget = [0, 0, 0];
        }
        break;
      
      default:
        targetPosition = [1, 0, 2];
        lookAtTarget = [0, 0, 0];
    }
    
    // Utilisation de setLookAt avec des paramètres plus précis
    controls.current.setLookAt(
      targetPosition[0],   // Position x de la caméra
      targetPosition[1],   // Position y de la caméra
      targetPosition[2],   // Position z de la caméra
      lookAtTarget[0],     // Point de visée x
      lookAtTarget[1],     // Point de visée y
      lookAtTarget[2],     // Point de visée z
      true                 // Activer l'animation
    );
  };

  return (
    <div className="w-full h-3/5">
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
        
            {getModelComponent()}
          
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
            Selected part: {snap.parts[snap.current]?.name || snap.current}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModelViewer;