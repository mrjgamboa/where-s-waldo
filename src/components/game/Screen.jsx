import { useLoadedImagesCountUpdate } from '../../contexts/LoadedImagesCount';

export default function Screen({ targets, children }) {

  const loadedImagesCountUpdate = useLoadedImagesCountUpdate();

  return (
    <div className='flex justify-around bg-primary
        my-2 p-2 border sticky top-0 rounded-sm z-20'
    >
      {targets.map(({ name, url, located }) => 
        <div 
          key={url} 
          className={`
            flex flex-col justify-evenly items-center
            ${located ? 'grayscale' : ''}
          `}
        >
          <img 
            src={url} 
            alt={name} 
            className='w-10' 
            onLoad={() => loadedImagesCountUpdate(prev => prev += 1)}
          />
          <p className='uppercase'>{name}</p>
        </div>
      )}
      { children }
    </div>
  );
};
