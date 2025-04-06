
import { createRoot } from 'react-dom/client'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import App from './App.jsx'
import Contextprovider from './store/Contextprovider.jsx'
createRoot(document.getElementById('root')).render(
  
  <Contextprovider>
    <App />
  </Contextprovider>,
)
