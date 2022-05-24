export default function Card({ text, imgSrc }) {
  return (
    <div tabIndex={0}
      className='rounded-md shadow-sm overflow-hidden cursor-pointer bg-white
      hover:shadow-md'
    >
      <img src={imgSrc} alt={`${text.toLowerCase()} preview`}
        className='w-full h-32 sm:h-48 object-cover'
      />
      <p className='m-3'>{text}</p>
    </div>
  );
};
