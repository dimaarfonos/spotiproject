import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Heart, MoreHorizontal, Clock } from 'lucide-react';
import { featuredPlaylists, mockTracks } from '../data/mockData';
import TrackList from '../components/TrackList';
import { Button } from '../components/ui/button';
import { usePlayer } from '../context/PlayerContext';

const Playlist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playTrack } = usePlayer();
  
  const playlist = featuredPlaylists.find((p) => p.id === id) || featuredPlaylists[0];
  const tracks = mockTracks;

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0], tracks, 0);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-gray-900/95 to-transparent backdrop-blur-md">
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

      {/* Playlist Header */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-transparent"
          style={{ height: '340px' }}
        />
        <div className="relative flex items-end p-6 pb-8" style={{ minHeight: '340px' }}>
          <img
            src={playlist.image}
            alt={playlist.name}
            className="w-60 h-60 shadow-2xl rounded"
          />
          <div className="ml-6 flex-1">
            <p className="text-sm font-semibold text-white mb-2">PLAYLIST</p>
            <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
              {playlist.name}
            </h1>
            <p className="text-gray-200 text-base mb-4">{playlist.description}</p>
            <div className="flex items-center space-x-2 text-sm text-white">
              <span className="font-semibold">Spotify</span>
              <span>•</span>
              <span>{tracks.length} songs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Actions */}
      <div className="bg-gradient-to-b from-black/40 to-black px-6 py-6">
        <div className="flex items-center space-x-6">
          <Button
            size="icon"
            onClick={handlePlayAll}
            className="bg-green-500 hover:bg-green-400 rounded-full h-14 w-14 shadow-xl hover:scale-105 transition-transform"
          >
            <Play className="h-7 w-7 text-black fill-black ml-1" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white h-10 w-10"
          >
            <Heart className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white h-10 w-10"
          >
            <MoreHorizontal className="h-8 w-8" />
          </Button>
        </div>
      </div>

      {/* Track List */}
      <div className="px-6 pb-24">
        <TrackList tracks={tracks} />
      </div>
    </div>
  );
};

export default Playlist;
