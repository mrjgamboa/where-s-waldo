import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

const GameData = React.createContext();

export function useGameData() {
  return useContext(GameData);
};

export default function GameDataProvider({ children }) {
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    const getLocationList = async () => {
      const data = await getDocs(collection(db, 'locations'));
      setGameData(data.docs.map((doc) => ({ ...doc.data()})));
    };
    getLocationList();
  }, []);

  return (
    <GameData.Provider value={gameData}>
      {children}
    </GameData.Provider>
  );
};
