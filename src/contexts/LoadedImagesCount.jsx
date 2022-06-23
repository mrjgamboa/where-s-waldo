import React, { useState, useContext } from 'react';

const LoadedImagesCount = React.createContext();
const LoadedImagesCountUpdate = React.createContext();

export function useLoadedImagesCount() {
  return useContext(LoadedImagesCount);
};

export function useLoadedImagesCountUpdate() {
  return useContext(LoadedImagesCountUpdate);
};

export default function LoadedImagesCountProvider({ children }) {
  const [count, setCount] = useState(0);

  return (
    <LoadedImagesCount.Provider value={count}>
      <LoadedImagesCountUpdate.Provider value={setCount}>
        {children}
      </LoadedImagesCountUpdate.Provider>
    </LoadedImagesCount.Provider>
  );
};
