

import React from 'react';

const Tutorials = () => {
  // Define the video data arrays
  const dataStructuresVideos = [
    { src: "https://www.youtube.com/embed/videoseries?si=rX8a2VWkIeH3OBD3&list=PLAXnLdrLnQpRcveZTtD644gM9uzYqJCwr" },
    { src: "https://www.youtube.com/embed/videoseries?si=slqct15dVAb7KMdW&list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU" },
    { src: "https://www.youtube.com/embed/videoseries?si=ydr47ZCWHUOAihvY&list=PLmZVoKmWPOelODOBtNXxALDvnNMI4aI4Q" },
  ];

  const pythonVideos = [
    { src: "https://www.youtube.com/embed/videoseries?si=eKuXExu-Ru_vT2kB&list=PLgNJO2hghbmgISKP3sZeTMRR1lgPLYjGr" },
    { src: "https://www.youtube.com/embed/videoseries?si=R6Odl1ZT0jIW8_sY&list=PLZPZq0r_RZOOkUQbat8LyQii36cJf2SWT" },
    { src: "https://www.youtube.com/embed/videoseries?si=a440_xndSOgAIif4&list=PLD9On7HGkOA8Q7z6Juuqah2eFCkPwwik4" },
  ];

  const javaVideos = [
    { src: "https://www.youtube.com/embed/videoseries?si=moAUQBZXmhvanrGp&list=PLZPZq0r_RZOMhCAyywfnYLlrjiVOkdAI1" },
    { src: "https://www.youtube.com/embed/videoseries?si=GIB7uWCLrB89_5qH&list=PLzMcBGfZo4-mOYgu42wKsStsA_ClOMpr3" },
    { src: "https://www.youtube.com/embed/videoseries?si=ddzPduMCasjpd8mQ&list=PLWKjhJtqVAbnRT_hue-3zyiuIYj0OlpyG" },
  ];

  const webDevelopmentVideos = [
    { src: "https://www.youtube.com/embed/videoseries?si=O8rc-Iz3mDIrADpJ&list=PLWKjhJtqVAbkArDMazoARtNz1aMwNWmvC" },
    { src: "https://www.youtube.com/embed/videoseries?si=lHZ8cSQXgLBoqozl&list=PLWKjhJtqVAbnSe1qUNMG7AbPmjIG54u88" },
    { src: "https://www.youtube.com/embed/videoseries?si=NxbSKkdLRyMkFrzw&list=PLWKjhJtqVAblNvGKk6aQVPAJHxrRXxHTs" },
  ];

  // Function to render video cards
  const renderCards = (videos) => {
    return videos.map((video, index) => (
      <div className="w-full md:w-1/2 lg:w-1/3 p-4" key={index}>
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <iframe
            className="w-full h-64"
            src={video.src}
            title={`YouTube video player ${index}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-700 border-b-2 border-gray-800 pb-2">Data Structures & Algorithms Complete Guide</h1>
        <div className="flex flex-wrap -mx-4">{renderCards(dataStructuresVideos)}</div>

        <h1 className="text-3xl font-bold mb-6 text-gray-700 border-b-2 border-gray-800 pb-2 mt-12">Start your Python learning journey</h1>
        <div className="flex flex-wrap -mx-4">{renderCards(pythonVideos)}</div>

        <h1 className="text-3xl font-bold mb-6 text-gray-700 border-b-2 border-gray-800 pb-2 mt-12">Start your Java learning journey</h1>
        <div className="flex flex-wrap -mx-4">{renderCards(javaVideos)}</div>

        <h1 className="text-3xl font-bold mb-6 text-gray-700 border-b-2 border-gray-800 pb-2 mt-12">Complete Web Development Guide</h1>
        <div className="flex flex-wrap -mx-4">{renderCards(webDevelopmentVideos)}</div>
      </div>
    </div>
  );
};

export default Tutorials;
