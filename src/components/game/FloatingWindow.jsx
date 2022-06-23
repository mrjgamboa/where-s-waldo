export default function FloatingWindow({ targets, selectTarget, x, y, unmountTrigger }) {

  return (
    <div 
      className={`
        absolute z-10 bg-primary rounded drop-shadow-md p-1
        flex flex-col
      `}
      style={{
        top: `${y}px`,
        left: `${x}px`
      }}
    >
      <button onClick={unmountTrigger}>
        <svg 
          xmlns='http://www.w3.org/2000/svg' 
          className='h-6 w-6 hover:text-red-500' fill='none' viewBox='0 0 24 24' 
          stroke='currentColor' strokeWidth={2}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>
      {targets.map((target, index) => !target.located && (
        <button 
          key={target.url}
          className='uppercase text-left m-1'
          onClick={() => selectTarget(target, index)}
        >
          {target.name}
        </button>
      ))}
    </div>
  );
};
