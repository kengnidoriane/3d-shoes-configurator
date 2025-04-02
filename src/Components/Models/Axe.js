// Axe.js
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
// import { useSnapshot } from "valtio";

export default function Axe({ colors, updateCurrent }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/axe.glb");
  
  // Rotation lente
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 4) / 4;
  });

  // Gérer les événements de souris
  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    if (updateCurrent) updateCurrent(e.object.material.name);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "auto";
  };

  // S'assurer que colors est défini et a les propriétés nécessaires
  const safeColors = colors || {
    body: "#a8a8a8",
    design: "#d3d3d3",
    support: "#d3d3d3",
    inner: "#d3d3d3"
  };

  return (
    <group ref={group} dispose={null} scale={2}>
      <mesh
        geometry={nodes.body.geometry}
        material={materials.body}
        material-color={safeColors.body || "#a8a8a8"}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
      <mesh
        geometry={nodes.design.geometry}
        material={materials.design}
        material-color={safeColors.design || "#d3d3d3"}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
      <mesh
        geometry={nodes.support.geometry}
        material={materials.support}
        material-color={safeColors.support || "#d3d3d3"}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
      <mesh
        geometry={nodes.inner.geometry}
        material={materials.inner}
        material-color={safeColors.inner || "#d3d3d3"}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </group>
  );
}

useGLTF.preload("/axe.glb");
