import { useState, useEffect } from 'react';
import { storage, db } from './../firebase-config';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { v4 } from 'uuid';

function H2({ text }) {
  return (
    <h2 className='uppercase text-center my-4 sm:my-8 text-xl'>{text}</h2>
  );
}

function Form({ onSubmit, children }) {
  return (
    <form className='w-full md:max-w-3xl md:mx-auto space-y-3 p-4'
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

function Label({ id, text  }) {
  return (
    <label htmlFor={id} className='w-2/5 inline-block capitalize'>
      {text}
    </label>
  );
}

function InputFile({ text, name, onChange }) {
  return (
    <div>
      <Label id={name} text={text} />
      <input type='file' name={name} accept='image/*' id={name}
        className='border-b w-3/5 px-2'
        onChange={onChange}
      />
    </div>
  );
}

function InputText({ text, name, value, onChange}) {
  return (
    <div>
      <Label id={name} text={text} />
      <input type='text' name={name}  id={name}
        className='border-b w-3/5 bg-transparent px-2'
        value={value} onChange={onChange}
      />
    </div>
  );
}

function InputRadio({ name, value, text }) {
  return (
    <div>
      <input type='radio' name={name} id={value} value={value}/>
      <label htmlFor={value}
        className='inline-block first-letter:capitalize ml-1'
      >
        {`${value}${!!text ? (` ${text}`) : ''}`}
      </label>
    </div>
  );
}

function Fieldset({ text, children }) {
  return (
    <fieldset 
      className='border p-2 w-full flex flex-col gap-1 rounded'
    >
      <legend className='first-letter:capitalize'>{text}</legend>
      {children}
    </fieldset>
  );
}

function LocationImageViewer({ url }) {
  const tiles = [];
  for (let counter = 1; counter <= 200; counter += 1) {
    tiles.push(`${counter}`)
  }
  return (
    <>
      {url.length > 0 &&
        <>
          <p className='xl:ml-32 capitalize'>selected location image preview</p>
          <div className='relative h-full max-w-5xl lg:mx-auto'>
            <img src={url} alt={`location preview`}/>
            <div className='absolute inset-0 bg-transparent grid grid-cols-10'>
              {tiles.map(num =>   
                <div className='border' key={`tile${num}`}>
                  {num}
                </div>
              )}
            </div>
          </div>
        </>
      }
    </>
  );
}

function Select({ text, name, array, onChange }) {
  return (
    <>
      <Label text={text}/>
      <select name={name} id={name} 
        className='border-b w-3/5 bg-transparent px-2'
        onChange={onChange}
      >
        <option hidden>--</option>
        <option disabled>--</option>
        {array.map(item => 
          <option value={item.url} key={item.name} >
            {item.name}
          </option>
        )}
      </select>
    </>
  );
}

function SubmitButton({ text }) {
  return (
    <button type='submit' 
      className='border block ml-auto p-2 rounded capitalize'
    >
      {text}
    </button>
  );
}

function ImageManager({ text, list}) {
  return (
    <>
      <H2 text={`folder: ${text}`}/>
      <div className='grid grid-cols-3 lg:grid-cols-6 gap-2 m-1 
        overflow-y-auto h-[450px] bg-white px-2'
      >
        {list.map(image => 
          <img src={image.url} alt={image.name} key={image.name}/>
        )}
      </div>
    </>
  );
}

function LevelListViewer({ array }) {
  return (
    <div className='p-2 max-h-96 overflow-y-auto bg-white mx-2'>
      {array.map(item => 
        <div className='my-3 bg-blue-100' key={v4()}>
          <p className='capitalize font-semibold'>location name:
            <span className='ml-2 uppercase'>{item.name}</span>
          </p>
          <p>URL: {item.url}</p>
          {item.targets.map(target =>
            <div className='my-1' key={target.url}>
              <p className='capitalize'>target name: {target.name}</p>
              <p className='break-words'>target URL: {target.url}</p>
              <p>target coordinates: {target.coords}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [imageLocationList, setImageLocationList] = useState([]);
  const [imageTargetList, setImageTargetList] = useState([]);
  const [levelList, setLevelList] = useState([]);

  const [image, setImage] = useState({});
  const [level, setLevel] = useState({ location: '', imgUrl: ''});
  const [targets, setTargets] = useState({
    a: { tName: '', tUrl: null, coords: '' },
    b: { tName: '', tUrl: null, coords: '' },
    c: { tName: '', tUrl: null, coords: '' }
  });
  
  const  handleImageChange = e => {
    setImage({ ...image, file: e.target.files[0] });
  };

  const handleRadioChange = e => {
    setImage({ ...image, path: e.target.value });
  };

  const uploadImage = e => {
    e.preventDefault();
    if (!image.path) {
      alert('Please select where to upload the image!');
      return;
    }
    if (image.file == null) {
      alert('Please select an image to upload the image!');
      return;
    }
    const newFileName = image.file.name + v4();
    const imageRef = ref(storage, `images/${image.path}/${newFileName}`);
    uploadBytes(imageRef, image.file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => {
        if (image.path === 'locations') {
          setImageLocationList(prev => [...prev, { name: newFileName, url: url }]);
        }
        if (image.path === 'targets') {
          setImageTargetList(prev => [...prev, { name: newFileName, url: url }]);
        }
      });
    });
  };

  const handleLevelLocationChange = e => {
    setLevel({
      ...level,
      [e.target.name]: e.target.value
    });
  };

  const handleLevelTargetChange = (key, e) => {
    setTargets({
      ...targets,
      [key]: {
        ...targets[key],
        [e.target.name]: e.target.value
      }
    });
  };

  const createLevel = async e => {
    e.preventDefault();
    const data = {
      name: level.location,
      url: level.imgUrl,
      targets: Object.values(targets)
    };
    await addDoc(collection(db, 'locations'), data);
    setLevelList([ ...levelList, data ]);
  };

  useEffect(() => {
    const getImageList = folder => {
      listAll(ref(storage, `images/${folder}/`))
      .then((response) => {
        const array = [];
        response.items.forEach((item) => {
          getDownloadURL(item)
          .then((url) => { 
            array.push({
              name: item.name,
              url: url
            }); 
            if (folder === 'locations') setImageLocationList([...array]);
            if (folder === 'targets') setImageTargetList([...array]);
          });
        });
      });
    };

    const getLocationList = async () => {
      const data = await getDocs(collection(db, 'locations'));
      setLevelList(data.docs.map((doc) => ({ ...doc.data()})));
    };

    getImageList('locations');
    getImageList('targets');
    getLocationList();
  }, []);

  return (
    <>
      {imageLocationList.length > 0 &&
        <ImageManager text='locations' list={imageLocationList}/>
      }
      {imageTargetList.length > 0 &&
        <ImageManager text='targets' list={imageTargetList}/>
      }
      <H2 text='upload new image'/>
      <Form onSubmit={uploadImage}>
        <Fieldset text='select where to upload:'>
          <div onChange={handleRadioChange} >
            <InputRadio name='path' value='locations' text='(1080x2340)'/>
            <InputRadio name='path' value='targets' text='(transparent background)'/>
          </div>
        </Fieldset>
        <InputFile name='image' text='image' onChange={handleImageChange}/>
        <SubmitButton text='upload' />
      </Form>
      {levelList.length > 0 &&
        <>
          <H2 text='level list' />
          <LevelListViewer array={levelList}/>
        </>
      }
      <H2 text='add new level' />
      <LocationImageViewer url={level.imgUrl}/>
      <Form onSubmit={createLevel}>
        <InputText text='location name' name='location' 
          value={level.location} onChange={handleLevelLocationChange} />
        <Select text='select location image' name='imgUrl' 
          array={imageLocationList} onChange={handleLevelLocationChange} />
        <Fieldset text='targets'>
          <div className='p-2 bg-red-100 rounded-sm'>
            How to enter coordinates?
            <ul className='list-disc'>
              <li className='text-xs ml-4'>Single coord e.g., -104-</li>
              <li className='text-xs ml-4'>Multiple coords e.g., -1-2-11-12- </li>
            </ul>
          </div>
          {Object.entries(targets).map(([key, value], index) => {
            return (
              <Fieldset text={key} key={key} >
                <div>
                  <InputText text='name'  name='tName' 
                    value={value.tName} 
                    onChange={(e) => handleLevelTargetChange(key, e)} />
                  <Select text='select target image' name='tUrl' array={imageTargetList} 
                    onChange={(e) => handleLevelTargetChange(key, e)} />
                  <InputText text='coords'  name='coords' 
                    value={value.coords} 
                    onChange={(e) => handleLevelTargetChange(key, e)} />
                </div>
              </Fieldset>
            );
          })}
        </Fieldset>
        <SubmitButton text='submit' />
      </Form>
    </>
  );
};
