import React from "react";
import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center space-y-4 bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
        <div className="w-48 bg-gray-200 rounded-full h-4 dark:bg-gray-700">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-out" 
            style={{ 
              width: `${progress}%`, 
              maxWidth: '100%'
            }}
          ></div>
        </div>
        <div className="text-gray-700 font-semibold">
          Loading... {Math.round(progress)}%
        </div>
        <div className="animate-pulse">
          <svg 
            className="w-10 h-10 text-blue-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
          </svg>
        </div>
      </div>
    </Html>
  );
}
