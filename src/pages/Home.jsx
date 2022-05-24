import Card from '../components/Card';
import dummy from './../dummy.png';

export default function Home() {
  return (
    <>
      <h2 className='text-center text-xl uppercase my-4 sm:my-8'>
        Select Location
      </h2>      
      <div className='grid sm:grid-cols-3 gap-8 m-1'>
        {/* map card */}
        <Card text='Dummy Console' imgSrc={dummy}/>
        <Card text='Dummy Console' imgSrc={dummy}/>
        <Card text='Dummy Console' imgSrc={dummy}/>
        <Card text='Dummy Console' imgSrc={dummy}/>
        <Card text='Dummy Console' imgSrc={dummy}/>
        <Card text='Dummy Console' imgSrc={dummy}/>
      </div>
    </>
  );
};
