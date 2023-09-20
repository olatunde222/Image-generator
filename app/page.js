"use client"; // is used to declare a boundary between a Server and Client Component modules

import Image from "next/image";
import Link from "next/link";
import React from "react";

const IMAGE_SIZES = [
  { value: "256*256", label: "256 X 256" },
  { value: "512*512", label: "512 X 512" },
  { value: "1024*1024", label: "1024 X 1024" },
];

export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");
  const [imageSize, setImageSize] = React.useState(IMAGE_SIZES[0].value);
  const [images, setImages] = React.useState([]);

  // Creates a function that will be called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // making the api call to generate the image
    let response = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt, imageSize }),
      headers: {
        "Content-type": "application/json",
      },
    });
    // If the request is successful
    if (response.ok) {
      response = await response.json();
      setImages(response.data);
    }
    setLoading(false);
  };
  return (
    <main className="bg-[#000] bg-gradient-to-b from-[#000] to-[#ec2f4b43]">
      <div className="max-w-5xl mx-auto px-5 lg:px-0">
        <h1 className="py-4 text-6xl font-bold inline-block font-novaSquarePeg text-transparent bg-clip-text bg-gradient-to-r from-[#009FFF] to-[#eC2F4B]">
          ImaginAi
        </h1>
      </div>
      <div className="max-w-5xl mx-auto px-5 lg:px-0 min-h-[calc(100vh-170px)]">
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-primary-main leading-4"
              >
                Describe the image you wish to generate:
              </label>
              <textarea
                id="prompt"
                rows={2}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Generate a white furry cat sitting on a Chair"
                className="block w-full px-2 py-1 rounded-md shadow-sm resize-none placeholder:text-primary-light border border-primary-main outline-primary-main text-md mt-2 text-primary-main"
              ></textarea>
              <span className="mt-1 text-xs leading-6 text-primary-main">
                Try giving a very detailed prompt
              </span>
            </div>
            <div>
              <div className="w-full">
                <label
                  htmlFor="size"
                  className="block text-sm font-medium leading-4 text-primary-main"
                >
                  Select Image Size
                </label>
                <select
                  onChange={(e) => setImageSize(e.target.value)}
                  id="size"
                  className=" mt-2 w-full px-2 py-3 border rounded-md shadow-sm border-primary-main outline-primary-main text-md text-primary-main"
                >
                  {IMAGE_SIZES.map((sizes) => (
                    <option className="" key={sizes.label}>
                      {sizes.value}
                    </option>
                  ))}
                </select>
                <div className="mt-5 text-right">
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-md bg-primary-main px-3 py-2 hover:bg-primary-dark text-primary-contrast font-semibold shadow-sm disabled:bg-primary-light disabled:cursor-not-allowed"
                  >
                    {loading ? "Generating..." : "Generate"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className=" mt-4 pt-4 border-t">
          {images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map(({ url }, idx) => (
                <img src={url} alt="ai-generated-images" />
              ))}
            </div>
          ) : (
            <div className="text-primary-main">No data to display</div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center border-t py-4 max-w-5xl mx-auto px-5 lg:px-0">
        <div className="text-sm uppercase text-primary-main">
          All rights reserved
        </div>
        <Link href={""} target="_blank">
          <img src="" alt="gitHubImage" className="h-7 w-7" />
        </Link>
      </div>
    </main>
  );
}
