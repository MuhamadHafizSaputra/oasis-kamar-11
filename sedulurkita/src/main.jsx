// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 1. Impor MapProvider
import { MapProvider } from '@vis.gl/react-maplibre';
// 2. Impor CSS Maplibre
import 'maplibre-gl/dist/maplibre-gl.css';

import { AuthProvider } from './context/AuthContext.jsx';

// 3. Hapus '!' dari document.getElementById('root')
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider> {/* <-- 2. Bungkus di luar */}
        <MapProvider>
          <App />
        </MapProvider>
      </AuthProvider> {/* <-- 3. Tutup bungkus */}
    </StrictMode>,
)