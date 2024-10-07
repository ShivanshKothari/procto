"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon, TrashIcon } from 'lucide-react'

type Question = {
  text: string;
  options: string[];
  correctAnswer: string;
}

export default function CreateQuiz() {
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<Question[]>([{ text: '', options: ['', ''], correctAnswer: '' }])

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', ''], correctAnswer: '' }])
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const updateQuestion = (index: number, field: keyof Question, value: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    setQuestions(updatedQuestions)
  }

  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options.push('')
    setQuestions(updatedQuestions)
  }

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options[optionIndex] = value
    setQuestions(updatedQuestions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Call API to create quiz
    console.log({ title, questions })
    alert('Quiz created successfully!')
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Quiz</CardTitle>
          <CardDescription>Design your quiz with multiple-choice questions</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                placeholder="Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              {questions.map((question, questionIndex) => (
                <Card key={questionIndex}>
                  <CardContent className="space-y-2">
                    <Input
                      placeholder="Question"
                      value={question.text}
                      onChange={(e) => updateQuestion(questionIndex, 'text', e.target.value)}
                      required
                    />
                    {question.options.map((option, optionIndex) => (
                      <Input
                        key={optionIndex}
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                        required
                      />
                    ))}
                    <Button type="button" onClick={() => addOption(questionIndex)}>
                      Add Option
                    </Button>
                    <Input
                      placeholder="Correct Answer"
                      value={question.correctAnswer}
                      onChange={(e) => updateQuestion(questionIndex, 'correctAnswer', e.target.value)}
                      required
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="button" variant="destructive" onClick={() => removeQuestion(questionIndex)}>
                      <TrashIcon className="w-4 h-4 mr-2" /> Remove Question
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Button type="button" onClick={addQuestion}>
                <PlusIcon className="w-4 h-4 mr-2" /> Add Question
              </Button>
            </div>
            <Button type="submit" className="mt-4">Create Quiz</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}