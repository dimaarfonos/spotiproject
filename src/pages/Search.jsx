import React, { useState } from 'react';
import { Search as SearchIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { categories, mockTracks, featuredPlaylists } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useNavigate } from 'react-router-dom';
import PlaylistCard from '../components/PlaylistCard';
import TrackList from '../components/TrackList';

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Filter tracks and playlists based on search query
      const filteredTracks = mockTracks.filter(
        (track) =>
          track.name.toLowerCase().includes(query.toLowerCase()) ||
          track.artist.toLowerCase().includes(query.toLowerCase()) ||
          track.album.toLowerCase().includes(query.toLowerCase())
      );
      const filteredPlaylists = featuredPlaylists.filter((playlist) =>
        playlist.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults({
        tracks: filteredTracks,
        playlists: filteredPlaylists
      });
    } else {
      setSearchResults(null);
    }
  };

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
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="What do you want to listen to?"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-white text-black pl-12 pr-4 py-3 rounded-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
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
        {searchResults ? (
          <div>
            {/* Search Results */}
            {searchResults.tracks.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
                <TrackList tracks={searchResults.tracks.slice(0, 4)} showHeader={false} />
              </div>
            )}
            {searchResults.playlists.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Playlists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                  {searchResults.playlists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </div>
            )}
            {searchResults.tracks.length === 0 && searchResults.playlists.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-white mb-2">No results found for "{searchQuery}"</p>
                <p className="text-gray-400">Please make sure your words are spelled correctly or use less or different keywords.</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Browse All */}
            <h2 className="text-2xl font-bold text-white mb-4">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                  style={{ backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)` }}
                >
                  <div className="absolute inset-0 p-4">
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                  </div>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute bottom-0 right-0 w-24 h-24 object-cover rotate-12 translate-x-4 translate-y-2 shadow-xl"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
