import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SendHorizontal, X } from 'lucide-react';
import { FileText, Sparkles, BookOpenCheck } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Card, CardContent } from "./ui/card";

export default function SearchPage() {
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const makeAPIRequest = async (query) => {
    const res = await axios.post("http://localhost:5000/api/search", { query });
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: makeAPIRequest,
    mutationKey: ["youtube-search-request"],
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(prompt);
  };

  const fetchSummary = async (videoUrl) => {
    try {
      setLoadingSummary(true);
      const res = await axios.post("http://localhost:5000/api/summarise", { url: videoUrl });
      setSummary(res.data);
      setShowSummary(true);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch summary");
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div className='flex justify-center items-center w-[80vw] mt-12 flex-col'>
      
      {/* Summary Card */}
      {showSummary && (
        <Card className="absolute w-[50vw] h-[vh] top-[30%] opacity-95 z-50">
          <CardContent className="flex flex-col px-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Summary</h1>
              <Button className="mt-4 self-end" onClick={() => setShowSummary(false)}>
                <X />
              </Button>
            </div>
            {loadingSummary ? (
              <p className="text-center text-gray-300">Loading summary...</p>
            ) : (
              
            )}
          </CardContent>
        </Card>
      )}

      <h1 className='text-center text-5xl font-semibold'>Search Youtube Videos</h1>
      <h3 className='mt-2 text-xl font-extralight'>
        Just write the topic name that you want to study today and get the list of videos!
      </h3>

      {/* Search Form */}
      <form className="flex flex-row w-full max-w-sm items-center gap-2 mt-6" onSubmit={submitHandler}>
        <Input
          type="text"
          placeholder="Topic"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button type="submit">
          <SendHorizontal />
        </Button>
      </form>

      {/* Video List */}
      <section className="mt-6 px-6 w-full">
        {mutation.isPending && <p className="text-center">Fetching videos...</p>}

        {mutation.isError && (
          <p className="text-center text-red-600">{mutation.error.message}</p>
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
                  <div className="flex text-gray-400 text-sm mb-4 justify-between items-center">
                    <div>{video.channel}</div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline"><Sparkles />Actions</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => fetchSummary(video.url)}>
                            <Sparkles /> Summarize Video
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText /> Download PDF notes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BookOpenCheck /> Take Quiz
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
