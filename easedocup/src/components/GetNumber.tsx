import { ChangeEvent, SetStateAction, useState } from "react";

const GetNumber = () => {
  const [code, setCodeData] = useState("");

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCodeData(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("Value enetered " + code);
  };

  return (
    <>
      <div className='flex flex-col items-center p-10'>
        <div className='flex flex-row p-5 border-2 border-gray-950 rounded-2xl dark:border-slate-200'>
          <div className=''>#</div>
          <input
            className='pl-3 dark:bg-zinc-950 foucs:outline-none bg-slate-100'
            defaultValue={12345}
            type='number'
            value={code}
            onChange={handleChange}
          />
        </div>
        <div className='pt-16'>
          <button
            className='p-4 bg-green-400 dark:bg-green-600 border-2 rounded-2xl border-gray-950'
            onClick={() => handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default GetNumber;
