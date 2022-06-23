import { useEffect } from 'react';

export default function ReportWindow({ message, x, y, callBack }) {
  useEffect(() => {
    const timer = setTimeout(() => callBack(), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [callBack]);

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
      {message}
    </div>
  );
};
