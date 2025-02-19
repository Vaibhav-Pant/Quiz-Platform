"use client";

import { useState, useEffect } from "react";
import { saveQuizHistory } from "@/utils/indexedDB";
import Navbar from "@/components/ui/NavBar";
import StartScreen from "@/components/ui/StartScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import data from "@/data.json";

const quizData = data;

export default function QuizApp() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(
    null
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizFinished, setQuizFinished] = useState(false);
  const [attempts, setAttempts] = useState<
    { question: string; correct: boolean }[]
  >([]);
  const [inputValue, setInputValue] = useState<number | "">("");

  useEffect(() => {
    if (quizStarted && timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setInterval(
      () => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)),
      1000
    );
    return () => clearInterval(timer);
  }, [timeLeft, quizStarted]);

  const handleAnswer = (answer: string | number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const correct = quizData[currentQuestion].answer === answer;

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setAttempts((prev) => [
      ...prev,
      { question: quizData[currentQuestion].question, correct },
    ]);

    setTimeout(() => handleNextQuestion(), 1000);
  };

  const handleNextQuestion = async () => {
    setSelectedAnswer(null);
    setInputValue("");
    setTimeLeft(30);
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      await saveQuizHistory({
        date: new Date().toLocaleString(),
        score: score,
      });
      setQuizFinished(true);
    }
  };

  const restartQuiz = async () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimeLeft(30);
    setQuizFinished(false);
    setAttempts([]);
    setInputValue("");
  };

  if (!quizStarted)
    return (
      <>
        <Navbar />
        <StartScreen onStart={() => setQuizStarted(true)} />;
      </>
    );

  if (quizFinished) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center space-y-4">
          <Card className="w-[500px] text-center">
            <CardHeader>
              <h2 className="text-xl font-bold">🎉 Quiz Completed!</h2>
            </CardHeader>
            <CardContent>
              <Badge className="text-lg mb-4 px-4 py-2">
                {score} / {quizData.length}
              </Badge>
              <Separator className="mb-3" />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attempts.map((attempt, index) => (
                    <TableRow key={index}>
                      <TableCell>{attempt.question}</TableCell>
                      <TableCell>
                        {attempt.correct ? "✅ Correct" : "❌ Incorrect"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button className="mt-4" onClick={restartQuiz}>
                Restart Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <Card className="w-[500px]">
          <CardHeader>
            <h2 className="text-lg font-bold">
              Question {currentQuestion + 1} of {quizData.length}
            </h2>
          </CardHeader>
          <CardContent>
            <Progress
              value={(currentQuestion / quizData.length) * 100}
              className="mb-3"
            />
            <p className="text-gray-500 text-sm mb-2">
              ⏳ Time left: {timeLeft}s
            </p>
            <p className="text-lg font-semibold">
              {quizData[currentQuestion].question}
            </p>

            {quizData[currentQuestion].type === "mcq" ? (
              <div className="grid grid-cols-2 gap-2 mt-3">
                {quizData[currentQuestion].options?.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full transition-colors ${
                      selectedAnswer
                        ? option === quizData[currentQuestion].answer
                          ? "bg-green-500 text-white" // Correct answer stays green
                          : selectedAnswer === option
                          ? "bg-red-500 text-white" // Wrong answer stays red
                          : "bg-gray-200" // Disable other options
                        : "hover:bg-gray-300"
                    } ${selectedAnswer ? "pointer-events-none" : ""}`}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col mt-3 space-y-3">
                <input
                  type="number"
                  className="border p-2 rounded w-full"
                  value={inputValue}
                  onChange={(e) =>
                    setInputValue(
                      e.target.value ? parseInt(e.target.value) : ""
                    )
                  }
                  placeholder="Enter your answer"
                  required
                />

                <Button
                  className="w-full disabled:bg-gray-400"
                  onClick={() => handleAnswer(inputValue)}
                  disabled={inputValue === ""} // Disable until input is valid
                >
                  Next Question
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
