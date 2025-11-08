// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 1. Impor MapProvider
import { MapProvider } from '@vis.gl/react-maplibre';
// 2. Impor CSS Maplibre
import 'maplibre-gl/dist/maplibre-gl.css';

// 3. Hapus '!' dari document.getElementById('root')
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 4. Bungkus App dengan MapProvider */}
    <MapProvider>
      <App />
    </MapProvider>
  </StrictMode>,
)