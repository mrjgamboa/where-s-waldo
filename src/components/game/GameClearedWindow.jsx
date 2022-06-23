import { addDoc, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config';
import convertMsToMinutesSeconds from '../../helpers/convertMsToMinutesSeconds';

export default function GameClearedWindow({ location, msec }) {
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTime(msec);
  }, [msec]);

  const uploadGameResult = async (e) => {
    e.preventDefault();
    if (document.querySelector('form').checkValidity()) {
      setIsSubmitting(true)
      await addDoc(
        collection(db, `${location}`), { 
          name: name,
          ms: msec
        }
      );
      navigate('/leaderboard');
    }
  };

  return (
    <div 
      className='flex flex-col justify-center items-center gap-y-3
        w-4/5 mx-auto mt-[10vh]'
    >
      <h2 className='uppercase text-xl m-1'>
        you cleared {location}!
      </h2>
      <p className='capitalize'>
        time: {convertMsToMinutesSeconds(time)} ({time.toLocaleString()}ms)
      </p>
      {isSubmitting ? (
        <p>submitting...</p>
      ) : (
        <form 
          className='flex flex-col gap-y-1'
          onSubmit={uploadGameResult}
        >
          <label className='capitalize'>
            enter your name:
          </label>
          <input 
            type='text'
            name='name'
            id='name'
            value={name}
            minLength={2}
            maxLength={25}
            onChange={(e) => setName(e.target.value.trim())}
            className='border-b bg-transparent px-1'
            required
          />
          <button 
            type='submit'
            className='border-0 rounded uppercase block ml-auto p-1'
          >
            submit
          </button>
        </form>
      )}
    </div>
  );
};
