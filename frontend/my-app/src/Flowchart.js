// src/components/Flowchart.js

import React, { useState } from "react";
import axios from "axios";

const Flowchart = () => {
  const [careerChoice, setCareerChoice] = useState("");
  const [experience, setExperience] = useState("");
  const [steps, setSteps] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/flowchart", {
        career_choice: careerChoice,
        experience: experience,
      });
      setSteps(response.data);
    } catch (error) {
      console.error("Error fetching flowchart steps", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-gray-700 bg-opacity-75 p-8 rounded-lg shadow-lg text-black mt-8"
      >
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">
            Career Choice:
          </label>
          <input
            type="text"
            value={careerChoice}
            onChange={(e) => setCareerChoice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">
            Experience:
          </label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Generate Roadmap
        </button>
      </form>

      <h2 className="text-2xl font-bold text-center mb-6">Roadmap</h2>

      {steps && (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="relative w-3/4 mx-auto p-6 bg-white rounded-md shadow-md">
            <div className="absolute inset-0 flex justify-center">
              <div className="w-0.5 bg-gray-300"></div>
            </div>
            <div className="space-y-12">
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 ml-auto">
                  <h3 className="text-xl font-semibold">{steps.step1}</h3>
                  <p className="text-base">{steps.step1e}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 mr-auto">
                  <h3 className="text-xl font-semibold">{steps.step2}</h3>
                  <p className="text-base">{steps.step2e}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 ml-auto">
                  <h3 className="text-xl font-semibold">{steps.step3}</h3>
                  <p className="text-base">{steps.step3e}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 mr-auto">
                  <h3 className="text-xl font-semibold">{steps.step4}</h3>
                  <p className="text-base">{steps.step4e}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 ml-auto">
                  <h3 className="text-xl font-semibold">{steps.step5}</h3>
                  <p className="text-base">{steps.step5e}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 mr-auto">
                  <h3 className="text-xl font-semibold">Tech Stack:</h3>
                  <p className="text-base">{steps.tech}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flowchart;
