import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [length, setlength] = useState(8);
  const [num_allow, setNum_allow] = useState(false);
  const [char_allow, setChar_allow] = useState(false);
  const [password, setPassword] = useState("");

  const password_generator = useCallback ( () => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (num_allow) str += "01234567890123456789"
    if (char_allow) str += "!@#$%^&*<>?:{&^%$#@!~?"

    for(let i=1 ; i <= length ; i++){
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);

  } , [length,num_allow,char_allow,setPassword])

  const password_reference = useRef(null);

  const copy_password = useCallback( () => {
    password_reference.current?.select();
    // password_reference.current?.setSelectionRange(5,10) # only select but not copy
    window.navigator.clipboard.writeText(password);
  } , [password])

  useEffect( () => {
    password_generator()
  } , [length,num_allow,char_allow,password_generator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto rounded-lg shadow-md px-4 py-3 my-8 bg-gray-400 '>
        <h1 className='text-4xl text-center my-5 '>Password Generator</h1>
        
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
           type="text"
           value={password}
           placeholder='password'
           readOnly
           className='outline-none w-full py-1 px-3'
           ref={password_reference}
          />
          <button
           className=' outline-none bg-blue-500 px-3 py-0.5 shrink-0'
           onClick={copy_password} 
          >COPY</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-2'>
            <input
             type='range'
             min={6}
             max={50}
             value={length}
             className='cursor-pointer'
             onChange={(e) => {setlength(e.target.value)}}
            />
            <label>Lenght : {length}</label>
          </div>

          <div className='flex items-center gap-x-2'>
            <input
             type='checkbox'
             defaultChecked={num_allow}
             onChange={() => {setNum_allow((prev) => !prev);}}
             />
            <label>Numbers</label>
          </div>

          <div className='flex items-center gap-x-2'>
            <input
             type='checkbox'
             defaultChecked={char_allow}
             onChange={() => {setChar_allow((prev) => !prev);}}
             />
            <label>Characters</label>
          </div>

        </div>
        
      </div>
    </>
  );
}

export default App;
