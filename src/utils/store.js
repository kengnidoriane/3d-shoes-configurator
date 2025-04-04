import { proxy } from "valtio";

// État pour le modèle de chaussure
const shoeState = proxy({
  current: null,
  basePrice: 99.99,
  customizationPrice: 0,
  colors: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
  },
  parts: {
    laces: { name: "Laces", color: "#ffffff" },
    mesh: { name: "Mesh", color: "#ffffff" },
    caps: { name: "Caps", color: "#ffffff" },
    inner: { name: "Inner", color: "#ffffff" },
    sole: { name: "Sole", color: "#ffffff" },
    stripes: { name: "Stripes", color: "#ffffff" },
    band: { name: "Band", color: "#ffffff" },
    patch: { name: "Patch", color: "#ffffff" },
  },
  presets: {
    Classic: {
      laces: "#ffffff",
      mesh: "#ffffff",
      caps: "#ffffff",
      inner: "#ffffff",
      sole: "#ffffff",
      stripes: "#ffffff",
      band: "#ffffff",
      patch: "#ffffff",
    },
    Sport: {
      laces: "#ff0000",
      mesh: "#ffffff",
      caps: "#000000",
      inner: "#ffffff",
      sole: "#000000",
      stripes: "#ff0000",
      band: "#000000",
      patch: "#ff0000",
    },
    Urban: {
      laces: "#000000",
      mesh: "#808080",
      caps: "#000000",
      inner: "#404040",
      sole: "#000000",
      stripes: "#ffffff",
      band: "#000000",
      patch: "#808080",
    },
  },
});

// État pour le modèle de fusée
const rocketState = proxy({
  current: null,
  basePrice: 149.99,
  customizationPrice: 0,
  colors: {
    hull: "#4287f5",
    base: "#d3d3d3",
    tip: "#d3d3d3",
    wings: "#a8a8a8",
    window: "#a8a8a8",
  },
  parts: {
    hull: { name: "Hull", color: "#4287f5" },
    base: { name: "Base", color: "#d3d3d3" },
    tip: { name: "Tip", color: "#d3d3d3" },
    wings: { name: "Wings", color: "#a8a8a8" },
    window: { name: "Window", color: "#a8a8a8" },
  },
  presets: {
    Space: {
      hull: "#4287f5",
      base: "#d3d3d3",
      tip: "#d3d3d3",
      wings: "#a8a8a8",
      window: "#a8a8a8",
    },
    Fire: {
      hull: "#ff4500",
      base: "#ffd700",
      tip: "#ff0000",
      wings: "#ff4500",
      window: "#ffff00",
    },
    Stealth: {
      hull: "#2f4f4f",
      base: "#000000",
      tip: "#2f4f4f",
      wings: "#000000",
      window: "#4682b4",
    },
  },
});

// État pour le modèle de hache
const axeState = proxy({
  current: null,
  basePrice: 79.99,
  customizationPrice: 0,
  colors: {
    body: "#a8a8a8",
    design: "#d3d3d3",
    support: "#d3d3d3",
    inner: "#d3d3d3",
  },
  parts: {
    body: { name: "Body", color: "#a8a8a8" },
    design: { name: "Design", color: "#d3d3d3" },
    support: { name: "Support", color: "#d3d3d3" },
    inner: { name: "Inner", color: "#d3d3d3" },
  },
  presets: {
    Warrior: {
      body: "#8b4513",
      design: "#cd853f",
      support: "#a0522d",
      inner: "#deb887",
    },
    Viking: {
      body: "#708090",
      design: "#c0c0c0",
      support: "#2f4f4f",
      inner: "#778899",
    },
    Modern: {
      body: "#000000",
      design: "#ff0000",
      support: "#000000",
      inner: "#808080",
    },
  },
});

// État pour le modèle d'insecte
const insectState = proxy({
  current: null,
  basePrice: 59.99,
  customizationPrice: 0,
  colors: {
    body: "#d3d3d3",
    shell: "#a8a8a8"
  },
  parts: {
    body: { name: "Body", color: "#d3d3d3" },
    shell: { name: "Shell", color: "#a8a8a8" },
  },
  presets: {
    Nature: {
      body: "#556b2f",
      shell: "#8fbc8f",
    },
    Exotic: {
      body: "#9932cc",
      shell: "#ba55d3",
    },
    Camouflage: {
      body: "#556b2f",
      shell: "#6b8e23",
    },
  },
});

// État pour le modèle de théière
const teapotState = proxy({
  current: null,
  basePrice: 89.99,
  customizationPrice: 0,
  colors: {
    lid: "#d3d3d3",
    base: "#a8a8a8"
  },
  parts: {
    lid: { name: "Lid", color: "#d3d3d3" },
    base: { name: "Base", color: "#a8a8a8" },
  },
  presets: {
    Classic: {
      lid: "#ffffff",
      base: "#ffffff",
    },
    Vintage: {
      lid: "#cd853f",
      base: "#deb887",
    },
    Modern: {
      lid: "#000000",
      base: "#ff0000",
    },
  },
});

// Mapping des états de modèles
export const modelStateMap = {
  shoe: shoeState,
  rocket: rocketState,
  axe: axeState,
  insect: insectState,
  teapot: teapotState,
};

// Initialiser les couleurs des parties
export const initializePartColors = (state) => {
  // Copier les couleurs initiales dans l'objet parts
  if (state.colors && state.parts) {
    Object.entries(state.colors).forEach(([key, color]) => {
      if (state.parts[key]) {
        state.parts[key].color = color;
      }
    });
  }
};

// Appliquer un préréglage de couleurs
export const applyPreset = (state, preset) => {
  if (!preset) return;
  // Appliquer les couleurs du préréglage
  Object.entries(preset).forEach(([part, color]) => {
    if (state.colors[part]) {
      state.colors[part] = color;

      // Mettre à jour la couleur dans l'objet parts
      if (state.parts && state.parts[part]) {
        state.parts[part].color = color;
      }
    }
  });
  
  // Ajouter 5€ pour l'application d'un préréglage
  state.customizationPrice += 5;
};
