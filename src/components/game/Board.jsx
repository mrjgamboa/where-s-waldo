import { 
  useLoadedImagesCount,
  useLoadedImagesCountUpdate 
} from '../../contexts/LoadedImagesCount';

export default function Board({ backgroundURL, onDivClick, children }) {

  const loadedImagesCount = useLoadedImagesCount();
  const loadedImagesCountUpdate = useLoadedImagesCountUpdate();

  const tiles = [];
  for (let counter = 1; counter <= 200; counter += 1) {
    tiles.push(`${counter}`)
  }

  return (
    <div className='relative h-full max-w-5xl lg:mx-auto overflow-x-hidden'>
      <img src={backgroundURL} alt={`location preview`}
        onLoad={() => loadedImagesCountUpdate(prev => prev += 1)} />
      <div 
        className={`
          ${(loadedImagesCount < 4) && ('hidden ')}
          absolute inset-0 bg-transparent grid grid-cols-10 hover:cursor-crosshair
        `}
      >
        {tiles.map(num => (
          <div 
            key={`tile${num}`} 
            onClick={(e) => onDivClick(e, `${num}`)}
          ></div>
        ))}
      </div>
      {children}
    </div>
  );
};
