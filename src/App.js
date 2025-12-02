import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import LikedSongs from './pages/LikedSongs';

function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <div className="h-screen flex flex-col bg-black">
          <div className="flex-1 flex overflow-hidden">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<Library />} />
              <Route path="/playlist/:id" element={<Playlist />} />
              <Route path="/liked" element={<LikedSongs />} />
            </Routes>
          </div>
          <Player />
        </div>
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;
