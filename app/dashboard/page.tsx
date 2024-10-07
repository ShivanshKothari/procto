"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { BookOpenIcon, FileTextIcon, LockIcon, UsersIcon, VideoIcon } from 'lucide-react'

export default function Dashboard() {
  const [userName, setUserName] = useState('User')

  useEffect(() => {
    // TODO: Fetch user data from API
    setUserName('John Doe')
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="p-6 bg-primary text-primary-foreground">
        <h1 className="text-3xl font-bold">Welcome, {userName}</h1>
        <p className="text-xl">Procto Dashboard</p>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Exams</CardTitle>
              <LockIcon className="w-8 h-8 text-primary" />
            </CardHeader>
            <CardContent>
              <p>You have 2 upcoming exams this week.</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/exam">View Exams</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Quizzes</CardTitle>
              <BookOpenIcon className="w-8 h-8 text-primary" />
            </CardHeader>
            <CardContent>
              <p>You have created 5 quizzes.</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/quiz">Manage Quizzes</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collaboration</CardTitle>
              <UsersIcon className="w-8 h-8 text-primary" />
            </CardHeader>
            <CardContent>
              <p>You have 1 upcoming meeting.</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/collaborate">View Meetings</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <FileTextIcon className="w-8 h-8 text-primary" />
            </CardHeader>
            <CardContent>
              <p>You have 10 shared documents.</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/documents">Manage Documents</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Virtual Meetings</CardTitle>
              <VideoIcon className="w-8 h-8 text-primary" />
            </CardHeader>
            <CardContent>
              <p>Schedule or join a virtual meeting.</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/meetings">Schedule Meeting</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}