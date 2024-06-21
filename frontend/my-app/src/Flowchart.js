import React, { useState } from 'react';
import axios from 'axios';

const Flowchart = () => {
  const [careerChoice, setCareerChoice] = useState('');
  const [experience, setExperience] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post('http://localhost:5000/api/flowchart', {
        career_choice: careerChoice,
        experience: experience
      });
      setResponse(result.data);
    } catch (error) {
      console.error("Error generating flowchart", error);
    }
  };

  return (
    <div>
      <h1>Flowchart Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Career Choice: </label>
          <input
            type="text"
            value={careerChoice}
            onChange={(e) => setCareerChoice(e.target.value)}
          />
        </div>
        <div>
          <label>Experience: </label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <button type="submit">Generate Flowchart</button>
      </form>
      {response && (
        <div>
          <h2>Generated Steps</h2>
          {response.steps.map((step, index) => (
            <div key={index}>
              <h3>Step {index + 1}</h3>
              <p>{step}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Flowchart;
