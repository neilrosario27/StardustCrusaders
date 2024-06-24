import React from 'react';
// import './Home.css';

const steps = {
    home: "Home",
    homeDesc: "Welcome to your personalized dashboard. Navigate through various features to enhance your learning and career journey.",
    
    roadmap: "Roadmap",
    roadmapDesc: "Get a personalized career roadmap to achieve your goals, such as landing your dream job.",
    
    resumeScreening: "Resume Screening",
    resumeScreeningDesc: "Analyze your resume in relation to the job description for the position you're applying for.",
    
    dsa: "DSA",
    dsaDesc: "Focus on developing your data structures and algorithms skills by practicing problems of various difficulties.",
    
    quiz: "Quiz",
    quizDesc: "Personalized quiz application that helps you assess your current level of skill.",
    
    calendar: "Calendar",
    calendarDesc: "Manage your learning timelines by planning ahead to optimize your learning journey.",
    
    tutorials: "Tutorials",
    tutorialsDesc: "Access the best hand-picked tutorials for various topics such as Python, Java, web development, and DSA, all ad-free.",
    
    mockInterviewText: "Mock Interview (Text)",
    mockInterviewTextDesc: "Engage in text-to-text mock interviews with our trained chatbots to perfectly emulate a real interview environment.",
    
    mockInterviewAudio: "Mock Interview (Audio)",
    mockInterviewAudioDesc: "Engage in speech-to-speech mock interviews with our trained chatbots to perfectly emulate a real interview environment."
  };

const Home = () => {
  return (
    <>
      {steps && (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="relative w-3/4 mx-auto p-6 bg-white rounded-md shadow-md">
            <div className="absolute inset-0 flex justify-center">
              <div className="w-0.5 bg-gray-300"></div>
            </div>
            <div className="space-y-12">
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 ml-auto">
                  <h3 className="text-xl font-semibold">{steps.home}</h3>
                  <p className="text-base">{steps.homeDesc}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 mr-auto">
                  <h3 className="text-xl font-semibold">{steps.roadmap}</h3>
                  <p className="text-base">{steps.roadmapDesc}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 ml-auto">
                  <h3 className="text-xl font-semibold">{steps.resumeScreening}</h3>
                  <p className="text-base">{steps.resumeScreeningDesc}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 mr-auto">
                  <h3 className="text-xl font-semibold">{steps.dsa}</h3>
                  <p className="text-base">{steps.dsaDesc}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 ml-auto">
                  <h3 className="text-xl font-semibold">{steps.quiz}</h3>
                  <p className="text-base">{steps.quizDesc}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 mr-auto">
                  <h3 className="text-xl font-semibold">{steps.calendar}</h3>
                  <p className="text-base">{steps.calendarDesc}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 ml-auto">
                  <h3 className="text-xl font-semibold">{steps.tutorials}</h3>
                  <p className="text-base">{steps.tutorialsDesc}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 mr-auto">
                  <h3 className="text-xl font-semibold">{steps.mockInterviewText}</h3>
                  <p className="text-base">{steps.mockInterviewTextDesc}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-md shadow-md w-5/12 ml-auto">
                  <h3 className="text-xl font-semibold">{steps.mockInterviewAudio}</h3>
                  <p className="text-base">{steps.mockInterviewAudioDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;