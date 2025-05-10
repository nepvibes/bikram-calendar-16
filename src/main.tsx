
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import static assets to ensure they're included in the build
import './assets/subtle-pattern.png';
import './assets/nepali-pattern.png';
import './assets/border-top.png';
import './assets/border-bottom.png';

createRoot(document.getElementById("root")!).render(<App />);
