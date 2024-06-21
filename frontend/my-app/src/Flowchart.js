import React, { useState } from "react";
import axios from "axios";

const Flowchart = () => {
  const [careerChoice, setCareerChoice] = useState("");
  const [experience, setExperience] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/api/flowchart", {
        career_choice: careerChoice,
        experience: experience,
      });
      setResponse(result.data);
    } catch (error) {
      console.error("Error generating flowchart", error);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-4">Flowchart Generator</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Career Choice:
          </label>
          <input
    type="text"
    value={careerChoice}
    onChange={(e) => setCareerChoice(e.target.value)}
    className="mt-1 block w-3/4  h-12 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    style={{ height: '3rem' }} // Adjust height as needed
/>


        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Experience:
          </label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="mt-1 block w-3/4  h-12 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    style={{ height: '3rem' }} // Adjust height as needed
          />
        </div>


        
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate Flowchart
        </button>
      </form>
      {response && (
  <div>
    <h2 className="text-2xl font-bold mb-4">Generated Steps</h2>
    {response.steps.map((step, index) => (
      <div key={index} className="bg-gray-100 rounded-lg p-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">Step {index + 1}</h3>
        <p className="text-gray-800">{step}</p>
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default Flowchart;
