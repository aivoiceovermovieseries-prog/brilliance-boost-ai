import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Brain, Users, Award, BookOpen, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'student' | 'teacher' | null>(null);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Get personalized learning paths with our advanced AI tutor Radiance"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Resources",
      description: "Access curated study materials, books, and video content for JEE & NEET"
    },
    {
      icon: Award,
      title: "Detailed Analytics",
      description: "Track progress with comprehensive reports and performance insights"
    },
    {
      icon: MessageCircle,
      title: "24/7 AI Support",
      description: "Chat with Radiance anytime for instant doubt resolution"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gradient">learnaura</span>
          </div>
          <div className="flex space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/signup')}
              className="gradient-primary text-primary-foreground"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="gradient-hero absolute inset-0 opacity-90" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Master JEE & NEET with
            <span className="block text-yellow-300">AI-Powered Learning</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join thousands of students excelling in their entrance exams with personalized AI tutoring, 
            comprehensive analytics, and expert-curated resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 shadow-glow"
              onClick={() => navigate('/signup')}
            >
              Start Learning Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/login')}
            >
              Teacher Access
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Why Choose learnaura?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of education with AI-driven personalization and comprehensive learning tools
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="gradient-card border-0 shadow-lg hover:shadow-glow transition-all duration-300 animate-float">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gradient">Choose Your Path</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-glow border-2 ${
                userType === 'student' ? 'border-success shadow-glow' : 'border-border'
              }`}
              onClick={() => setUserType('student')}
            >
              <CardHeader className="text-center pb-8">
                <div className="mx-auto mb-4 w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-12 w-12 text-success" />
                </div>
                <CardTitle className="text-2xl">I'm a Student</CardTitle>
                <CardDescription className="text-lg">
                  Preparing for JEE or NEET entrance exams
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• Personalized learning paths</li>
                  <li>• AI-powered doubt resolution</li>
                  <li>• Performance analytics</li>
                  <li>• Free study resources</li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-glow border-2 ${
                userType === 'teacher' ? 'border-warning shadow-glow' : 'border-border'
              }`}
              onClick={() => setUserType('teacher')}
            >
              <CardHeader className="text-center pb-8">
                <div className="mx-auto mb-4 w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center">
                  <Users className="h-12 w-12 text-warning" />
                </div>
                <CardTitle className="text-2xl">I'm a Teacher</CardTitle>
                <CardDescription className="text-lg">
                  Guiding students towards success
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• Student progress tracking</li>
                  <li>• Detailed analytics reports</li>
                  <li>• Performance insights</li>
                  <li>• Class management tools</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {userType && (
            <div className="mt-8 animate-fade-in">
              <Button 
                size="lg" 
                className="gradient-primary text-primary-foreground shadow-glow"
                onClick={() => navigate(`/signup?type=${userType}`)}
              >
                Continue as {userType === 'student' ? 'Student' : 'Teacher'}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GraduationCap className="h-8 w-8" />
              <span className="text-2xl font-bold">learnaura</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-primary-foreground/80">
                Empowering the next generation of achievers
              </p>
              <p className="text-sm text-primary-foreground/60 mt-2">
                © 2024 learnaura. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;