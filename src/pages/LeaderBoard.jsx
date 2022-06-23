import { useState, useEffect } from 'react';
import { 
  collection,
  query, 
  onSnapshot, 
  orderBy,
  limit 
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { useGameData } from '../contexts/GameData';
import convertMsToMinutesSeconds from '../helpers/convertMsToMinutesSeconds';

export default function Leaderboard() {
  const gameData = useGameData(); 
  const [location, setLocation] = useState('');
  const [leaderboard, setLeaderboard] = useState([]); 

  useEffect(() => {
    if (gameData.length && (location === '')) {
      setLocation(gameData[0].name);
    }
  }, [gameData, location]);

  useEffect(() => {
    const loadLeaderboard = () => {
      const leaderboardQuery = query(
        collection(db, `${location}`),
        orderBy('ms'),
        limit(10)
      );

      onSnapshot(leaderboardQuery, (snapshot) => {
        const holder = []
        snapshot.forEach(doc => {
          holder.push(doc.data());
        });
        setLeaderboard(holder);
      });
    };
    
    if (location) loadLeaderboard();
  }, [location]);

  return ((gameData.length > 0) ? (
    <>
      <h2 className='text-center text-xl uppercase my-4 sm:my-6'>
        leaderboard
      </h2>
      <div className='ml-2 mb-5'>
        <label className='capitalize'>location:</label>
        <select 
          className='bg-transparent px-1 ml-1'
          onChange={(e) => setLocation(e.target.value)}
        >
          {gameData.map(
            (location, index) => (
              <option 
                value={location.name} 
                key={location.url} 
              >
                {location.name}
              </option>
            )
          )}
        </select>
      </div>
      {(leaderboard.length > 0) ? (
        <table className='w-full md:w-4/5 mx-auto'>
          <thead>
            <tr className='uppercase text-lg border-y'>
              <th className='font-medium p-1 text-left'>rank</th>
              <th className='font-medium p-1 text-left'>name</th>
              <th className='font-medium p-1 text-right'>time</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(
              ({name, ms}, index) => (
                <tr 
                  key={`${index}${ms}${name}`}
                  className='border-b'
                >
                  <td className='text-left p-1 pl-2 sm:w-1/3'>
                    {index + 1}
                  </td>
                  <td className='break-words p-1 sm:w-1/3'>
                    {name}
                  </td>
                  <td className='break-words p-1 sm:w-1/3 text-right'>
                    {`${convertMsToMinutesSeconds(ms)} (${ms.toLocaleString()}ms)`}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <p>no record</p>
      )}
    </>
  ) : (
    <p className='animate-pulse'>loading data...</p>
  ));
};
