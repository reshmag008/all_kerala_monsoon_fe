import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Player } from '@/types/player';


interface PlayerContextType {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Omit<Player, 'id'>) => void;
  updatePlayer: (id: string, player: Omit<Player, 'id'>) => void;
  deletePlayer: (id: string) => void;
  getPlayer: (id: string) => Player | undefined;
}


const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  // const [players, setPlayers] = useState<Player[]>([]);

  const [players, setPlayersState] = useState<Player[]>([]);

  const setPlayers = (players: Player[]) => {
    setPlayersState(players);
  };


  const addPlayer = (playerData: Omit<Player, 'id'>) => {

    
  const newPlayer: Player = {
    ...playerData,
    id: crypto.randomUUID(),
  };

  setPlayersState((prev) => [...prev, newPlayer]);
};

  const updatePlayer = (id: string, playerData: Omit<Player, 'id'>) => {
  setPlayersState((prev) =>
    prev.map((player) =>
      player.id === id ? { ...playerData, id } : player
    )
  );
};

  const deletePlayer = (id: string) => {
  setPlayersState((prev) => prev.filter((player) => player.id !== id));
};

  const getPlayer = (id: string) => {
    return players.find((player) => player.id === id);
  };

  return (
    <PlayerContext.Provider
      value={{ players, setPlayers,addPlayer, updatePlayer, deletePlayer, getPlayer }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
