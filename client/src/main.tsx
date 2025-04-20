import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from "./App.tsx";
import Header from "./components/Header.tsx";
import GameDetails from "./components/GameDetails.tsx";
import Teams from "./components/Teams.tsx";
import Players from "./components/Players.tsx";
import Team from "./components/Team.tsx";
import Player from "./components/Player.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-primary flex flex-col gap-2">
              <BrowserRouter>
                  <Header />
                  <main className="text-white flex flex-col gap-2 p-4">
                      <Routes>
                          <Route path="/" element={<App />} />
                          <Route path="/game/:id" element={<GameDetails />} />
                          <Route path="/teams" element={<Teams />} />
                          <Route path="/teams/:teamCode" element={<Team />} />
                          <Route path="/players" element={<Players />} />
                          <Route path="/players/:playerId" element={<Player />} />
                      </Routes>
                  </main>
              </BrowserRouter>
          </div>
      </QueryClientProvider>
  </StrictMode>,
)
