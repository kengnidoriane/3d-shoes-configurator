import React, { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function Shoe(props) {
  const { nodes, materials } = useGLTF("/Shoe/shoe.gltf");

  const colors = props.colors || {};

  return (
    <group
      {...props}
      dispose={null}
      onPointerOver={(e) => {
        e.stopPropagation();
      }}
      onPointerOut={(e) => {
        if (e.intersections.length === 0) {
        }
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        if (props.updateCurrent) {
          props.updateCurrent(e.object.material.name);
        }
      }}
      onPointerMissed={() => {
        if (props.updateCurrent) {
          props.updateCurrent(null);
        }
      }}
    >
      <mesh
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        material-color={colors.laces || "#ffffff"}
      />
      <mesh
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color={colors.mesh || "#ffffff"}
      />
      <mesh
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color={colors.caps || "#ffffff"}
      />
      <mesh
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color={colors.inner || "#ffffff"}
      />
      <mesh
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color={colors.sole || "#ffffff"}
      />
      <mesh
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color={colors.stripes || "#ffffff"}
      />
      <mesh
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color={colors.band || "#ffffff"}
      />
      <mesh
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        material-color={colors.patch || "#ffffff"}
      />
    </group>
  );
}

useGLTF.preload("/Shoe/shoe.gltf");