"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type Question = {
  id: number;
  text: string;
  options: string[];
}

export default function Exam() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{[key: number]: string}>({})
  const [examStarted, setExamStarted] = useState(false)

  useEffect(() => {
    // TODO: Fetch exam questions from API
    setQuestions([
      {
        id: 1,
        text: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"]
      },
      {
        id: 2,
        text: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"]
      },
      // Add more questions...
    ])
  }, [])

  const startExam = async () => {
    // TODO: Call API to start exam
    setExamStarted(true)
  }

  const submitExam = async () => {
    // TODO: Call API to submit exam
    alert("Exam submitted successfully!")
    setExamStarted(false)
  }

  const handleAnswer = (value: string) => {
    setAnswers({...answers, [questions[currentQuestion].id]: value})
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Procto Exam</CardTitle>
          <CardDescription>Answer all questions to the best of your ability</CardDescription>
        </CardHeader>
        <CardContent>
          {!examStarted ? (
            <Button onClick={startExam}>Start Exam</Button>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">Question {currentQuestion + 1} of {questions.length}</h2>
              <p className="mb-4">{questions[currentQuestion].text}</p>
              <RadioGroup onValueChange={handleAnswer} value={answers[questions[currentQuestion].id]}>
                {questions[currentQuestion].options.map((option, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {examStarted && (
            <>
              <Button 
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              {currentQuestion < questions.length - 1 ? (
                <Button 
                  onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                >
                  Next
                </Button>
              ) : (
                <Button onClick={submitExam}>Submit Exam</Button>
              )}
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}