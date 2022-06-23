import { Link } from 'react-router-dom';
import { useGameData } from '../contexts/GameData';
import Card from '../components/Card';

export default function Home() {
  const gameData = useGameData();
  
  return ((gameData.length > 0) ? (
    <>
      <h2 className='text-center text-xl uppercase my-4 sm:my-6'>
        select location
      </h2>
      <div className='grid sm:grid-cols-3 gap-8 m-1'>
        {(gameData.length > 0) &&
          gameData.map(({ name, url }) => (
            <Link to={`location/${name}`} key={url}>
              <Card text={name} imgSrc={url}/>
            </Link>
          ))
        }
      </div>
    </>
  ) : (
    <p className='animate-pulse'>loading data...</p>
  ));
};
