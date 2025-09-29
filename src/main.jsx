import { createRoot } from 'react-dom/client'
import './global.css';
import { App } from './app';

let selectedTileId = null;

createRoot(document.getElementById("app")).render(
    <App />
)