import React, { useState } from 'react';

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import ReactMarkdown from 'react-markdown'; // Import react-markdown

const makeAPIRequest = async (prompt) => {
  const res = await axios.post("https://gemini-text-generator.vercel.app/generate", { prompt });
  console.log(res.data);
  return res.data;
};

function App() {
  const [prompt, setPrompt] = useState("");
  const mutation = useMutation({
    mutationFn: makeAPIRequest,
    mutationKey: ["gemini-api-request"],
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(prompt);
  };

  return (
    <div className='App w-full'>
      <div className='card w-full'>
        <h1 className='text-6xl m-8 font-semi-bold text-center '>GEMINI

        </h1>
        <p className='text-lg mx-6 text-center'>Enter a prompt and let AI craft unique content for you.
        
        </p>
        <form className='App-form flex items-center w-[97%] md:w-[67%] mt-2 p-2 mx-auto' onSubmit={submitHandler}>
          <label htmlFor="prompt"></label>
          <input 
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Type your prompt...'
            className='border p-2 rounded-md w-[100%]'
          />
          <button className='p-2 text-white bg-black rounded-md m-1' type='submit'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          </button>
        </form>
        <section className='' >
        
          {mutation.isPending && (
            <div className='flex items-start  w-[90%] md:w-[65%] mx-auto'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 inline mr-4 border scale-150 p-1 rounded-full mt-5 animate-pulse">
             <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
              </svg>
            <div className='card response-card border rounded-md w-[95%] mt-2 p-2 mx-auto'>
              Generating your content.......
            </div></div>)}
            

          {mutation.isError && <p>{mutation.error.message}</p>}
          {mutation.isSuccess && (
            <div className='flex items-start w-[90%]  md:w-[65%] mx-auto'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 inline mr-4 border scale-150 p-1 rounded-full mt-5">
  <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
</svg>
            <div className='card response-card border rounded-md w-[95%] mt-2 p-2 px-4 mx-auto text-left'>
              <ReactMarkdown className="markdown-content">{mutation.data}</ReactMarkdown>
            </div></div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
