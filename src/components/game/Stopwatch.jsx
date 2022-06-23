//? reference: https://medium.com/codex/react-stopwatch-10bf9813d0ec
import { useState, useEffect } from 'react';
import { useLoadedImagesCount } from '../../contexts/LoadedImagesCount';

export default function Stopwatch({ targetsFound, callBack }) {
  
  const loadedImagesCount = useLoadedImagesCount();
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (loadedImagesCount === 4) setStart(true);
  }, [loadedImagesCount]);

  useEffect(() => {
    let interval = null;

    if(start) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [start]);

  useEffect(() => {
    if (targetsFound === 3) setStart(false);
  }, [targetsFound]);

  useEffect(() => {
    if (!start && (targetsFound === 3)) callBack(time);
  }, [start, targetsFound, time, callBack]);

  return ((loadedImagesCount !== 4)
    ? <p className='animate-pulse'>loading images...</p>
    : <div className='w-24 flex justify-center items-center'>
        <p>
          <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{('0' + (time / 10) % 1000).slice(-2)}</span>
        </p>
    </div>
  );
};
