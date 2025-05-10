
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Note: We're not importing the assets here yet.
// We need to make sure the actual image files are placed in the src/assets directory.
// If you've placed the images there, you can uncomment these imports:
// import './assets/subtle-pattern.png';
// import './assets/nepali-pattern.png';
// import './assets/border-top.png';
// import './assets/border-bottom.png';

createRoot(document.getElementById("root")!).render(<App />);
