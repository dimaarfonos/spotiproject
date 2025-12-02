import React from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/playlist/${playlist.id}`)}
      className="bg-gray-900/40 p-4 rounded-lg hover:bg-gray-800/60 transition-all duration-300 cursor-pointer group"
    >
      <div className="relative mb-4">
        <img
          src={playlist.image}
          alt={playlist.name}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <Button
          size="icon"
          className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-400 rounded-full h-12 w-12 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
          onClick={(e) => {
            e.stopPropagation();
            // Handle play
          }}
        >
          <Play className="h-6 w-6 text-black fill-black ml-0.5" />
        </Button>
      </div>
      <h3 className="font-semibold text-white mb-2 truncate">{playlist.name}</h3>
      <p className="text-sm text-gray-400 line-clamp-2">{playlist.description}</p>
    </div>
  );
};

export default PlaylistCard;
