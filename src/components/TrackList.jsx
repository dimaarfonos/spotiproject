import React from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { Button } from './ui/button';

const TrackList = ({ tracks, showHeader = true, showImage = true }) => {
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  const handlePlayTrack = (track, index) => {
    playTrack(track, tracks, index);
  };

  return (
    <div className="mt-6">
      {showHeader && (
        <div className="grid grid-cols-[16px_4fr_3fr_3fr_1fr] gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
          <div>#</div>
          <div>TITLE</div>
          <div>ALBUM</div>
          <div>DATE ADDED</div>
          <div className="text-right">⏱</div>
        </div>
      )}
      <div className="mt-2">
        {tracks.map((track, index) => {
          const isCurrentTrack = currentTrack?.id === track.id;
          return (
            <div
              key={track.id}
              className="grid grid-cols-[16px_4fr_3fr_3fr_1fr] gap-4 px-4 py-3 rounded group hover:bg-gray-800/50 cursor-pointer"
              onDoubleClick={() => handlePlayTrack(track, index)}
            >
              <div className="flex items-center justify-center text-gray-400 group-hover:text-white">
                <span className="group-hover:hidden">{index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden group-hover:flex h-6 w-6 p-0"
                  onClick={() => handlePlayTrack(track, index)}
                >
                  <Play className="h-4 w-4 fill-white" />
                </Button>
              </div>
              <div className="flex items-center space-x-3 min-w-0">
                {showImage && (
                  <img
                    src={track.image}
                    alt={track.name}
                    className="w-10 h-10 rounded"
                  />
                )}
                <div className="min-w-0">
                  <p className={`text-base truncate ${
                    isCurrentTrack ? 'text-green-500' : 'text-white'
                  }`}>
                    {track.name}
                  </p>
                  <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-400 truncate">
                {track.album}
              </div>
              <div className="flex items-center text-sm text-gray-400">
                2 days ago
              </div>
              <div className="flex items-center justify-end space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0 text-gray-400 hover:text-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-400">{track.duration}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0 text-gray-400 hover:text-white"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackList;
