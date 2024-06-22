import React, { useState } from "react";
import axios from "axios";

const Resume = () => {
  const [jd, setJd] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("jd", jd);
    formData.append("uploaded_file", file);

    try {
      const res = await axios.post("http://localhost:5000/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponse(res.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-extrabold text-gray-900">Smart ATS</h1>
          <p className="mt-2 text-center text-sm text-gray-600">Improve Your Resume ATS</p>
        </div>
        <form className="mt-4 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="jd" className="block text-gray-700 font-bold mb-2">Job Description:</label>
            <textarea
              id="jd"
              name="jd"
              rows="4"
              className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Paste the Job Description"
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mt-4">
            <label htmlFor="uploaded_file" className="block text-gray-700 font-bold mb-2">Resume:</label>
            <input
              type="file"
              id="uploaded_file"
              name="uploaded_file"
              accept=".pdf"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleFileChange}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </form>
        {response && (
          <div className="mt-6 w-full p-6 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-900">Response:</h2>
            <p className="mt-4 text-gray-600"><strong>Job Description Score:</strong> {response.jds}</p>
            <p className="my-4 text-gray-600"><strong>Missing Keywords:</strong> {response.missing}</p>
            <p className="mb-4 text-gray-600"><strong>Summary:</strong> {response.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;
