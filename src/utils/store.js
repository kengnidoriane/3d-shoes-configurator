import { proxy } from 'valtio';

export const state = proxy({
  current: null,
  selectedPart: null,
  basePrice: 99.99,
  customizationPrice: 0,
  models: {
    shoe: {
      colors: {
        laces: "#d3d3d3",
        mesh: "#d3d3d3",
        caps: "#d3d3d3",
        inner: "#d3d3d3",
        sole: "#d3d3d3",
        stripes: "#d3d3d3",
        band: "#d3d3d3",
        patch: "#d3d3d3",
      }
    },
    rocket: {
      colors: {
        hull: "#d3d3d3",
        base: "#d3d3d3",
        tip: "#d3d3d3",
        wings: "#a8a8a8",
        window: "#a8a8a8",
      }
    },
    axe: {
      colors: {
        body: "#a8a8a8",
        design: "#d3d3d3",
        support: "#d3d3d3",
        inner: "#d3d3d3",
      }
    },
    insect: {
      colors: { 
        body: "#d3d3d3", 
        shell: "#a8a8a8" 
      }
    },
    teapot: {
      colors: { 
        lid: "#d3d3d3", 
        base: "#a8a8a8" 
      }
    }
  },
  presets: {
    classic: {
      name: 'Classic',
      price: 0,
      colors: {
        laces: '#ffffff',
        mesh: '#000000',
        caps: '#ffffff',
        inner: '#ffffff',
        sole: '#ffffff',
      }
    },
    sport: {
      name: 'Sport',
      price: 29.99,
      colors: {
        laces: '#ff0000',
        mesh: '#000000',
        caps: '#ff0000',
        inner: '#ffffff',
        sole: '#ff0000',
      }
    },
    premium: {
      name: 'Premium',
      price: 49.99,
      colors: {
        laces: '#ffd700',
        mesh: '#000000',
        caps: '#ffd700',
        inner: '#ffffff',
        sole: '#ffd700',
      }
    }
  }
});