import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import {
  LockIcon,
  BookOpenIcon,
  UsersIcon,
  FileTextIcon,
  VideoIcon,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-6 bg-primary text-primary-foreground">
        <h1 className="text-3xl font-bold">Procto</h1>
        <p className="text-xl">Secure and Engaging Proctored Exam Solution</p>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Secure Exams</CardTitle>
              <LockIcon className="w-8 h-8 text-primary" />
            </CardHeader>
            <CardContent>
              <p>
                Advanced proctoring with multi-factor authentication and
                AI-powered cheating detection.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/exam">Start Exam</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Quizzes</CardTitle>
              <BookOpenIcon className="w-8 h-8 text-primary" />
            </CardHeader>
            <CardContent>
              <p>
                Engage students with gamified online quizzes inspired by popular
                platforms.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/quiz">Create Quiz</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collaboration Tools</CardTitle>
              <UsersIcon className="w-8 h-8 text-primary" />
            </CardHeader>
            <CardContent>
              <p>
                Virtual meetings, document sharing, and interactive whiteboards
                for seamless collaboration.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/collaborate">Collaborate</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Sharing</CardTitle>
              <FileTextIcon className="w-8 h-8 text-primary" />
            </CardHeader>
            <CardContent>
              <p>
                Securely share and collaborate on documents within the platform.
              </p>
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
              <p>
                Host and join virtual meetings with integrated whiteboard
                functionality.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/meetings">Schedule Meeting</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Started</h2>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-secondary text-secondary-foreground p-4 text-center">
        <p>&copy; 2024 Procto. All rights reserved.</p>
      </footer>
    </div>
  );
}
