import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <br />
    <br />

    <footer>
      This was coded by Abijah God'swill Kutwane
      
      and is
      <a
        href="https://github.com/shecodi/abijah-react-weather-app/tree/main/src"
        class="link"
        target="_blank"
      >
        open-sourced on GitHub
      </a>
      and is
      <a
        href="https://abijah-react-weather-app.netlify.app/ "
        class="link"
        target="_blank"
      >
        hosted on Netlify
      </a>
      .
    </footer>
  </StrictMode>,
);
