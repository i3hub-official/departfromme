import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const quizData = {
  Mathematics: [
    { q: "What is the value of π (pi) to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], correct: 1 },
    { q: "Solve: 2x + 5 = 15", options: ["x = 5", "x = 10", "x = 7.5", "x = 20"], correct: 0 },
    { q: "What is the square root of 144?", options: ["11", "12", "13", "14"], correct: 1 },
    { q: "What is 15% of 200?", options: ["25", "30", "35", "40"], correct: 1 },
    { q: "If a triangle has angles 60° and 70°, what is the third angle?", options: ["40°", "50°", "60°", "70°"], correct: 1 },
    { q: "What is the area of a circle with radius 7? (Use π ≈ 22/7)", options: ["154", "144", "164", "174"], correct: 0 },
    { q: "Simplify: 3² + 4²", options: ["25", "49", "14", "7"], correct: 0 },
    { q: "What is the value of 5! (5 factorial)?", options: ["100", "120", "125", "150"], correct: 1 },
    { q: "If y = 2x + 3, what is y when x = 4?", options: ["9", "10", "11", "12"], correct: 2 },
    { q: "What is the sum of interior angles of a hexagon?", options: ["540°", "720°", "900°", "1080°"], correct: 1 }
  ],
  English: [
    { q: "What is the plural of 'child'?", options: ["childs", "children", "childes", "childrens"], correct: 1 },
    { q: "Identify the adjective: 'The beautiful sunset amazed us.'", options: ["sunset", "beautiful", "amazed", "us"], correct: 1 },
    { q: "What is a synonym for 'happy'?", options: ["sad", "joyful", "angry", "tired"], correct: 1 },
    { q: "Which is the correct spelling?", options: ["occured", "ocurred", "occurred", "occureed"], correct: 2 },
    { q: "What type of noun is 'London'?", options: ["Common", "Proper", "Abstract", "Collective"], correct: 1 },
    { q: "Choose the correct verb form: 'She ___ to school daily.'", options: ["go", "goes", "going", "gone"], correct: 1 },
    { q: "What is an antonym for 'difficult'?", options: ["hard", "easy", "complex", "tough"], correct: 1 },
    { q: "Identify the metaphor: 'Time is money' or 'The car is red'?", options: ["Time is money", "The car is red", "Both", "Neither"], correct: 0 },
    { q: "What is the past tense of 'run'?", options: ["runned", "ran", "running", "runs"], correct: 1 },
    { q: "Which sentence is grammatically correct?", options: ["Me and him went", "Him and I went", "He and I went", "I and he went"], correct: 2 }
  ],
  Chemistry: [
    { q: "What is the chemical symbol for Gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2 },
    { q: "How many elements are in the periodic table? (approximately)", options: ["92", "108", "118", "128"], correct: 2 },
    { q: "What is the pH of pure water?", options: ["6", "7", "8", "9"], correct: 1 },
    { q: "Which gas is most abundant in Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], correct: 1 },
    { q: "What is H₂O?", options: ["Hydrogen peroxide", "Water", "Hydrochloric acid", "Heavy water"], correct: 1 },
    { q: "What is the atomic number of Carbon?", options: ["4", "6", "8", "12"], correct: 1 },
    { q: "Which of these is a noble gas?", options: ["Oxygen", "Nitrogen", "Helium", "Hydrogen"], correct: 2 },
    { q: "What is NaCl commonly known as?", options: ["Sugar", "Salt", "Soda", "Sand"], correct: 1 },
    { q: "How many valence electrons does oxygen have?", options: ["4", "6", "8", "2"], correct: 1 },
    { q: "What type of bond forms when electrons are shared?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], correct: 1 }
  ],
  Physics: [
    { q: "What is the SI unit of force?", options: ["Joule", "Newton", "Watt", "Pascal"], correct: 1 },
    { q: "What is the speed of light in vacuum?", options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁷ m/s", "3 × 10⁹ m/s"], correct: 0 },
    { q: "What is the formula for kinetic energy?", options: ["mgh", "½mv²", "mc²", "Fd"], correct: 1 },
    { q: "Who discovered gravity?", options: ["Einstein", "Newton", "Galileo", "Tesla"], correct: 1 },
    { q: "What is the acceleration due to gravity on Earth?", options: ["8.8 m/s²", "9.8 m/s²", "10.8 m/s²", "11.8 m/s²"], correct: 1 },
    { q: "Ohm's Law is represented as:", options: ["V = IR", "P = VI", "E = mc²", "F = ma"], correct: 0 },
    { q: "What type of lens is used to correct myopia?", options: ["Convex", "Concave", "Bifocal", "Cylindrical"], correct: 1 },
    { q: "What is the unit of electric current?", options: ["Volt", "Ampere", "Ohm", "Coulomb"], correct: 1 },
    { q: "Which law states 'Energy cannot be created or destroyed'?", options: ["Newton's Law", "Conservation of Energy", "Ohm's Law", "Boyle's Law"], correct: 1 },
    { q: "What is the frequency of AC current in most countries?", options: ["30 Hz", "40 Hz", "50 Hz", "60 Hz"], correct: 2 }
  ],
  Biology: [
    { q: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"], correct: 1 },
    { q: "How many chromosomes do humans have?", options: ["23", "46", "48", "92"], correct: 1 },
    { q: "What is the process by which plants make food?", options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"], correct: 1 },
    { q: "What is the largest organ in the human body?", options: ["Liver", "Brain", "Skin", "Heart"], correct: 2 },
    { q: "What is DNA?", options: ["A protein", "A carbohydrate", "A nucleic acid", "A lipid"], correct: 2 },
    { q: "Which blood group is the universal donor?", options: ["A", "B", "AB", "O"], correct: 3 },
    { q: "How many chambers does the human heart have?", options: ["2", "3", "4", "5"], correct: 2 },
    { q: "What is the basic unit of life?", options: ["Atom", "Molecule", "Cell", "Organ"], correct: 2 },
    { q: "Which vitamin is produced when skin is exposed to sunlight?", options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"], correct: 2 },
    { q: "What is the process of cell division called?", options: ["Mitosis", "Meiosis", "Both A and B", "Osmosis"], correct: 2 }
  ]
};

export default function Quiz() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const subjects = Object.keys(quizData);
  const currentQuiz = selectedSubject ? quizData[selectedSubject] : [];

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
  };

  const handleAnswerSelect = (index) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      const isCorrect = index === currentQuiz[currentQuestion].correct;
      if (isCorrect) setScore(score + 1);
      setAnswers([...answers, { question: currentQuestion, selected: index, correct: currentQuiz[currentQuestion].correct }]);
    }
  };

  const handleNext = () => {
    if (currentQuestion < currentQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setSelectedSubject(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
  };

  if (!selectedSubject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2 text-indigo-900">Multi-Subject Quiz</h1>
          <p className="text-center text-gray-600 mb-8">Select a subject to begin</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => handleSubjectSelect(subject)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-indigo-500"
              >
                <h2 className="text-2xl font-semibold text-indigo-700 mb-2">{subject}</h2>
                <p className="text-gray-600">10 Questions</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">Quiz Complete!</h2>
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-indigo-600 mb-2">{score}/{currentQuiz.length}</div>
            <p className="text-xl text-gray-600">Your Score: {((score / currentQuiz.length) * 100).toFixed(0)}%</p>
          </div>
          <div className="space-y-4 mb-8">
            {currentQuiz.map((q, idx) => {
              const userAnswer = answers.find(a => a.question === idx);
              const isCorrect = userAnswer && userAnswer.selected === userAnswer.correct;
              return (
                <div key={idx} className={`p-4 rounded-lg border-2 ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                  <div className="flex items-start gap-2">
                    {isCorrect ? <CheckCircle className="text-green-600 mt-1" size={20} /> : <XCircle className="text-red-600 mt-1" size={20} />}
                    <div className="flex-1">
                      <p className="font-medium mb-1">{idx + 1}. {q.q}</p>
                      {!isCorrect && (
                        <p className="text-sm text-gray-600">
                          Your answer: <span className="text-red-600">{q.options[userAnswer.selected]}</span><br/>
                          Correct answer: <span className="text-green-600">{q.options[q.correct]}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={handleRestart}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            Back to Subjects
          </button>
        </div>
      </div>
    );
  }

  const question = currentQuiz[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-900">{selectedSubject}</h2>
            <span className="text-gray-600">Question {currentQuestion + 1}/{currentQuiz.length}</span>
          </div>
          
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / currentQuiz.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-6 text-gray-800">{question.q}</h3>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              let bgColor = 'bg-gray-50 hover:bg-gray-100';
              if (selectedAnswer !== null) {
                if (index === question.correct) {
                  bgColor = 'bg-green-100 border-green-500';
                } else if (index === selectedAnswer) {
                  bgColor = 'bg-red-100 border-red-500';
                }
              }
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-lg border-2 border-gray-200 text-left transition-all ${bgColor} ${selectedAnswer === null ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <button
              onClick={handleNext}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              {currentQuestion < currentQuiz.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}