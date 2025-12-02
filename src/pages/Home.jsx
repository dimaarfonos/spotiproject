import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { featuredPlaylists, recentlyPlayed } from '../data/mockData';
import PlaylistCard from '../components/PlaylistCard';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const currentHour = new Date().getHours();
  let greeting = 'Good morning';
  
  if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good afternoon';
  } else if (currentHour >= 18) {
    greeting = 'Good evening';
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md">
        <div className="flex items-center justify-between p-4">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/40 text-white rounded-full h-8 w-8"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/40 text-white rounded-full h-8 w-8"
              onClick={() => navigate(1)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:scale-105 transition-transform"
            >
              Sign up
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-8">
              Log in
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Greeting */}
        <h1 className="text-4xl font-bold text-white mb-6">{greeting}</h1>

        {/* Recently Played */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {recentlyPlayed.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800/50 hover:bg-gray-700/50 rounded flex items-center overflow-hidden cursor-pointer group transition-colors"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover"
              />
              <span className="text-white font-semibold px-4 flex-1">{item.name}</span>
              <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  className="bg-green-500 hover:bg-green-400 rounded-full h-12 w-12 shadow-xl"
                >
                  <svg className="h-6 w-6 text-black fill-black ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Playlists */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Spotify Playlists</h2>
            <Button variant="link" className="text-gray-400 hover:text-white">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {featuredPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>

        {/* More Sections */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Made for you</h2>
            <Button variant="link" className="text-gray-400 hover:text-white">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {featuredPlaylists.slice(0, 5).map((playlist) => (
              <PlaylistCard key={`made-${playlist.id}`} playlist={playlist} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
