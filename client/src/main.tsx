import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router";
import App from "./App.tsx";
import Header from "./components/Header.tsx";
import GameDetails from "./components/GameDetails.tsx";
import Teams from "./components/Teams.tsx";
import Players from "./components/Players.tsx";
import Games from "./components/Games.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <div className="min-h-screen w-screen flex flex-col bg-primary">
          <BrowserRouter>
              <Header />
              <main className="p-4">
                      <Routes>
                          <Route path="/" element={<App />} />
                          <Route path="/game/:id" element={<GameDetails />} />
                          <Route path="/teams" element={<Teams />} />
                            <Route path="/players" element={<Players />} />
                            <Route path="/games" element={<Games />} />
                      </Routes>
              </main>
          </BrowserRouter>
      </div>
  </StrictMode>,
)
