import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, List, LayoutGrid } from 'lucide-react';
import { featuredPlaylists } from '../data/mockData';
import PlaylistCard from '../components/PlaylistCard';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [filter, setFilter] = useState('all'); // all, playlists, albums, artists

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-md">
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
        {/* Library Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Your Library</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? (
                <List className="h-5 w-5" />
              ) : (
                <LayoutGrid className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6">
          {['all', 'playlists', 'albums', 'artists'].map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              onClick={() => setFilter(tab)}
              className={`rounded-full px-4 capitalize ${
                filter === tab
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>

        {/* Library Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {featuredPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {featuredPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                onClick={() => navigate(`/playlist/${playlist.id}`)}
                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-800/50 cursor-pointer group"
              >
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="w-12 h-12 rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{playlist.name}</p>
                  <p className="text-sm text-gray-400 truncate">Playlist</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
