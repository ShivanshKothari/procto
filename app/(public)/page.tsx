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
  EyeIcon,
  HandIcon,
  CopyIcon,
  CodeIcon,
  GraduationCapIcon,
  ShieldCheckIcon,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-32 md:py-48 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Next Generation Code Examination Platform</h1>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Advanced proctoring solution designed specifically for coding assessments and technical interviews, 
            with real-time monitoring and AI-powered analysis.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild className="px-8">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="px-8">
              <Link href="/login" className='text-primary'>Sign In/Register</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <main className="flex-grow container mx-auto px-6 md:px-8 py-24 md:py-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Advanced Proctoring Features</h2>
        <div className="grid gap-8 md:gap-12 md:grid-cols-3">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <HandIcon className="w-8 h-8 text-primary" />
                <CardTitle>Hand Movement Detection</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Real-time monitoring of hand movements ensures exam integrity by detecting and 
                preventing unauthorized activities.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <EyeIcon className="w-8 h-8 text-primary" />
                <CardTitle>Iris Movement Tracking</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Advanced eye-tracking technology monitors candidate focus and detects suspicious 
                eye movements during examinations.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CopyIcon className="w-8 h-8 text-primary" />
                <CardTitle>Copy-Paste Prevention</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Intelligent system to detect and prevent unauthorized code copying while allowing 
                legitimate coding practices.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CodeIcon className="w-8 h-8 text-primary" />
                <CardTitle>Code Editor Integration</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Built-in code editor with syntax highlighting, auto-completion, and support for 
                multiple programming languages.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="w-8 h-8 text-primary" />
                <CardTitle>AI-Powered Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Advanced AI algorithms detect suspicious behavior and ensure examination integrity 
                in real-time.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <GraduationCapIcon className="w-8 h-8 text-primary" />
                <CardTitle>Technical Assessment</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Comprehensive assessment tools designed specifically for evaluating coding skills 
                and technical knowledge.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <section className="mt-24 md:mt-32 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Transform Your Code Assessments?</h2>
          <Button size="lg" asChild className="px-8">
            <Link href="/register">Start Free Trial</Link>
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <p className="text-sm">
            2024 Procto. Built with cutting-edge technology for the next generation of technical assessments.
          </p>
        </div>
      </footer>
    </div>
  );
}
