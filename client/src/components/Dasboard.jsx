import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

// Function to search YouTube videos


// Function to summarize video
const summarizeVideo = async (videoUrl) => {
  const res = await axios.post("http://localhost:5000/api/summarize", { videoUrl });
  return res.data; // return summary
};

// Function to generate PDF notes
const generatePDFNotes = async (videoUrl) => {
  const res = await axios.post("http://localhost:5000/api/pdf", { videoUrl });
  return res.data; // return PDF file link or data
};

// Function to generate Quiz
const generateQuiz = async (videoUrl) => {
  const res = await axios.post("http://localhost:5000/api/quiz", { videoUrl });
  return res.data; // return quiz questions
};

function SearchPage() {
  const [prompt, setPrompt] = useState("");

  const mutation = useMutation({
    mutationFn: makeAPIRequest,
    mutationKey: ["youtube-search-request"],
  });

  // Mutations for buttons
  const summarizeMutation = useMutation({
    mutationFn: summarizeVideo,
  });

  const pdfMutation = useMutation({
    mutationFn: generatePDFNotes,
  });

  const quizMutation = useMutation({
    mutationFn: generateQuiz,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(prompt);
  };

  return (
    <div className="w-full">
      <div className="card w-full">
        <h1 className="text-6xl m-8 font-semibold text-center">Video Search</h1>
        <p className="text-lg mx-6 text-center">
          Enter a keyword to find YouTube videos
        </p>

        {/* Search bar */}
        <form
          className="App-form flex items-center w-[97%] md:w-[67%] mt-2 p-2 mx-auto"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type a keyword..."
            className="border p-2 rounded-md w-full"
          />
          <button
            className="p-2 text-white bg-black rounded-md m-1"
            type="submit"
          >
            Search
          </button>
        </form>

        {/* Results */}
        <section className="mt-6 px-6">
          {mutation.isPending && (
            <p className="text-center">Fetching videos...</p>
          )}

          {mutation.isError && (
            <p className="text-center text-red-600">
              {mutation.error.message}
            </p>
          )}

          {mutation.isSuccess && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mutation.data.map((video, idx) => (
                <div
                  key={idx}
                  className="border rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col"
                >
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                  </a>
                  <div className="p-4 flex-1 flex flex-col">
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-lg hover:underline block"
                    >
                      {video.title}
                    </a>
                    <p className="text-gray-600 text-sm mb-4">{video.channel}</p>

                    {/* Action buttons */}
                    <div className="mt-auto flex flex-col space-y-2">
                      <button
                        onClick={() => summarizeMutation.mutate(video.url)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                      >
                        Summarize Video
                      </button>
                      <button
                        onClick={() => pdfMutation.mutate(video.url)}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                      >
                        Generate PDF Notes
                      </button>
                      <button
                        onClick={() => quizMutation.mutate(video.url)}
                        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition"
                      >
                        Take Quiz
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default SearchPage;