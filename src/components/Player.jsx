import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, VolumeX, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

const Player = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration,
    shuffle,
    repeat,
    togglePlay,
    handleNext,
    handlePrevious,
    seekTo,
    setVolume,
    toggleShuffle,
    toggleRepeat
  } = usePlayer();

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-3 z-50">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center space-x-4 w-1/4 min-w-[180px]">
          <img
            src={currentTrack.image}
            alt={currentTrack.name}
            className="w-14 h-14 rounded"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentTrack.name}</p>
            <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-2/4 max-w-[722px]">
          <div className="flex items-center space-x-4 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleShuffle}
              className={`text-gray-400 hover:text-white ${shuffle ? 'text-green-500' : ''}`}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevious}
              className="text-gray-400 hover:text-white"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              onClick={togglePlay}
              size="icon"
              className="bg-white text-black hover:bg-gray-200 rounded-full h-8 w-8"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNext}
              className="text-gray-400 hover:text-white"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleRepeat}
              className={`text-gray-400 hover:text-white ${
                repeat !== 'off' ? 'text-green-500' : ''
              }`}
            >
              <Repeat className="h-4 w-4" />
              {repeat === 'track' && (
                <span className="text-xs absolute -top-1 -right-1">1</span>
              )}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400 min-w-[40px] text-right">
              {formatTime(progress)}
            </span>
            <Slider
              value={[progress]}
              max={duration || 100}
              step={1}
              onValueChange={([value]) => seekTo(value)}
              className="flex-1"
            />
            <span className="text-xs text-gray-400 min-w-[40px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-end space-x-2 w-1/4 min-w-[180px]">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
            className="text-gray-400 hover:text-white"
          >
            {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={([value]) => setVolume(value / 100)}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
