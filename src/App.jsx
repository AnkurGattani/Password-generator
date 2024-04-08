import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "1234567890";
    }
    if (charAllowed) {
      str += "~!@#$%^&*()+-/;:{}[]?,.<>";
    }

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className='w-full max-w-2xl mx-auto shadow-md p-2 my-8 rounded-lg  bg-gray-900 text-white '>
        <h1 className='text-4xl text-center my-5'>Password Generator</h1>

        <div className='flex shadow overflow-hidden mb-4 rounded-lg text-black text-lg'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button className='outline-none bg-blue-800 px-3 py-2 shrink-0 text-white hover:bg-blue-600' onClick={copyPasswordToClipboard} >
            Copy
          </button>
        </div>

        <div className='flex text-sm gap-x-10 items-stretch flex-wrap'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className='cursor-grab'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label> Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1 '>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput"> Numbers </label>
          </div>

          <div className='flex items-center gap-x-1 '>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="charInput"> Characters </label>
          </div>

        </div>

      </div>

    </>
  )
}

export default App
