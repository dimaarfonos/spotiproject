import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Heart, MoreHorizontal } from 'lucide-react';
import { mockTracks } from '../data/mockData';
import TrackList from '../components/TrackList';
import { Button } from '../components/ui/button';
import { usePlayer } from '../context/PlayerContext';

const LikedSongs = () => {
  const navigate = useNavigate();
  const { playTrack } = usePlayer();
  const tracks = mockTracks;

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0], tracks, 0);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-purple-900 via-purple-900/20 to-black">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-purple-900/50 backdrop-blur-md">
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

      {/* Liked Songs Header */}
      <div className="flex items-end p-6 pb-8" style={{ minHeight: '340px' }}>
        <div className="w-60 h-60 bg-gradient-to-br from-purple-500 to-blue-500 shadow-2xl rounded flex items-center justify-center">
          <Heart className="h-24 w-24 text-white fill-white" />
        </div>
        <div className="ml-6 flex-1">
          <p className="text-sm font-semibold text-white mb-2">PLAYLIST</p>
          <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
            Liked Songs
          </h1>
          <div className="flex items-center space-x-2 text-sm text-white">
            <span className="font-semibold">You</span>
            <span>•</span>
            <span>{tracks.length} songs</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-gradient-to-b from-purple-900/20 to-black px-6 py-6">
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
            className="text-green-500 hover:text-green-400 h-10 w-10"
          >
            <Heart className="h-8 w-8 fill-green-500" />
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

export default LikedSongs;
