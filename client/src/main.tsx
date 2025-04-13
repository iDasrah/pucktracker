import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router";
import App from "./App.tsx";
import Header from "./components/Header.tsx";
import GameDetails from "./components/GameDetails.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <div className="h-screen w-screen">
          <BrowserRouter>
              <Header />
              <main className="flex flex-col gap-4 h-full w-full bg-gray-700 p-4">
                      <Routes>
                          <Route path="/" element={<App />} />
                          <Route path="/game/:id" element={<GameDetails />} />
                      </Routes>
              </main>
          </BrowserRouter>
      </div>
  </StrictMode>,
)
