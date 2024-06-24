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
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-start pt-16">
      <div className="max-w-md w-full bg-gray-700 bg-opacity-75 p-8 rounded-lg shadow-lg text-white mt-8">
        <h1 className="text-center text-4xl font-extrabold text-white">
          Smart ATS
        </h1>
        <p className="mt-2 text-center text-sm text-white">
          Improve Your Resume ATS
        </p>

        <form
          className="mt-4 space-y-6"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <label htmlFor="jd" className="block text-white font-bold mb-2">
              Job Description:
            </label>
            <textarea
              id="jd"
              name="jd"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Paste the Job Description"
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mt-4">
            <label
              htmlFor="uploaded_file"
              className="block text-white font-bold mb-2"
            >
              Resume:
            </label>
            <div className="flex items-center justify-between bg-gray-700 border border-gray-300 rounded-lg cursor-pointer px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <span className="text-gray-300">Upload a PDF file</span>
              <input
                type="file"
                id="uploaded_file"
                name="uploaded_file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
                required
              />
              <label
                htmlFor="uploaded_file"
                className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
              >
                Choose File
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {response && (
        <div className="mt-8 max-w-md w-full bg-white p-6 rounded-md shadow-md text-black">
          <h2 className="text-lg font-semibold">Response:</h2>
          <p className="mt-4">
            <strong>Job Description Suggestions:</strong> {response.jds}
          </p>
          <p className="my-4">
            <strong>Missing Keywords:</strong> {response.missing}
          </p>
          <p className="mb-4">
            <strong>Summary:</strong> {response.summary}
          </p>
        </div>
      )}
    </div>
  );
};

export default Resume;