import React from 'react';

const Quizzes = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-blue-900 text-2xl font-bold mb-4">Your Administered Quizzes</h1>
      {/* Placeholder for quizzes performance */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg text-blue-500 font-bold mb-2">Quizzes Performance</h2>
        
        {/* Placeholder for bar chart */}
        <div className="mt-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Placeholder for bar chart */}
            <div className="text-center">
              <p className="text-gray-700">Quizzes Performance</p>
              <div className="w-full h-64 bg-gray-300 rounded-lg mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;