import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { GraduationCap, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InitialQuiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Mock questions for JEE and NEET
  const getQuestions = (stream: string) => {
    if (stream === 'JEE') {
      return [
        {
          question: "If the roots of the equation x² - 3x + 2 = 0 are α and β, then α + β equals:",
          options: ["2", "3", "-3", "1"],
          correct: "3",
          subject: "Mathematics",
          topic: "Quadratic Equations"
        },
        {
          question: "The SI unit of electric field intensity is:",
          options: ["N/C", "C/N", "J/C", "V/m"],
          correct: "N/C",
          subject: "Physics",
          topic: "Electric Field"
        },
        {
          question: "Which of the following is an example of nucleophilic substitution reaction?",
          options: ["CH₃Cl + OH⁻ → CH₃OH + Cl⁻", "C₂H₄ + Br₂ → C₂H₄Br₂", "CH₄ + Cl₂ → CH₃Cl + HCl", "C₆H₆ + NO₂⁺ → C₆H₅NO₂ + H⁺"],
          correct: "CH₃Cl + OH⁻ → CH₃OH + Cl⁻",
          subject: "Chemistry",
          topic: "Organic Chemistry"
        },
        {
          question: "The derivative of sin(x²) with respect to x is:",
          options: ["cos(x²)", "2x cos(x²)", "2x sin(x²)", "cos(2x)"],
          correct: "2x cos(x²)",
          subject: "Mathematics",
          topic: "Differentiation"
        },
        {
          question: "A body is thrown vertically upward with initial velocity 20 m/s. The maximum height reached is: (g = 10 m/s²)",
          options: ["10 m", "20 m", "40 m", "80 m"],
          correct: "20 m",
          subject: "Physics",
          topic: "Kinematics"
        },
        {
          question: "The hybridization of carbon in diamond is:",
          options: ["sp", "sp²", "sp³", "sp³d"],
          correct: "sp³",
          subject: "Chemistry",
          topic: "Chemical Bonding"
        },
        {
          question: "The sum of first n natural numbers is:",
          options: ["n(n+1)", "n(n+1)/2", "n(n-1)/2", "n²"],
          correct: "n(n+1)/2",
          subject: "Mathematics",
          topic: "Sequences and Series"
        },
        {
          question: "Ohm's law states that:",
          options: ["V = IR", "V = I/R", "I = VR", "R = VI"],
          correct: "V = IR",
          subject: "Physics",
          topic: "Current Electricity"
        },
        {
          question: "The IUPAC name of CH₃-CH(CH₃)-CH₂OH is:",
          options: ["2-methylpropanol", "2-methyl-1-propanol", "isobutanol", "Both B and C"],
          correct: "Both B and C",
          subject: "Chemistry",
          topic: "Organic Nomenclature"
        },
        {
          question: "If log₂ 8 = x, then x equals:",
          options: ["2", "3", "8", "16"],
          correct: "3",
          subject: "Mathematics",
          topic: "Logarithms"
        }
      ];
    } else {
      return [
        {
          question: "The powerhouse of the cell is:",
          options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
          correct: "Mitochondria",
          subject: "Biology",
          topic: "Cell Biology"
        },
        {
          question: "The normal human body temperature is:",
          options: ["96.8°F", "97.8°F", "98.6°F", "99.6°F"],
          correct: "98.6°F",
          subject: "Biology",
          topic: "Human Physiology"
        },
        {
          question: "Which gas is released during photosynthesis?",
          options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
          correct: "Oxygen",
          subject: "Biology",
          topic: "Plant Physiology"
        },
        {
          question: "The atomic number of carbon is:",
          options: ["4", "6", "8", "12"],
          correct: "6",
          subject: "Chemistry",
          topic: "Atomic Structure"
        },
        {
          question: "The SI unit of force is:",
          options: ["Joule", "Newton", "Watt", "Pascal"],
          correct: "Newton",
          subject: "Physics",
          topic: "Mechanics"
        },
        {
          question: "DNA replication occurs during which phase of cell cycle?",
          options: ["G1 phase", "S phase", "G2 phase", "M phase"],
          correct: "S phase",
          subject: "Biology",
          topic: "Cell Division"
        },
        {
          question: "The pH of pure water at 25°C is:",
          options: ["6", "7", "8", "14"],
          correct: "7",
          subject: "Chemistry",
          topic: "Acids and Bases"
        },
        {
          question: "The largest bone in human body is:",
          options: ["Humerus", "Tibia", "Femur", "Fibula"],
          correct: "Femur",
          subject: "Biology",
          topic: "Human Anatomy"
        },
        {
          question: "Which organelle is known as the 'suicidal bag' of the cell?",
          options: ["Lysosome", "Ribosome", "Mitochondria", "Nucleus"],
          correct: "Lysosome",
          subject: "Biology",
          topic: "Cell Biology"
        },
        {
          question: "The acceleration due to gravity on Earth is approximately:",
          options: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "11 m/s²"],
          correct: "9.8 m/s²",
          subject: "Physics",
          topic: "Gravitation"
        }
      ];
    }
  };

  const questions = currentUser ? getQuestions(currentUser.stream) : [];

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, quizStarted]);

  const handleNext = () => {
    if (!selectedAnswer) {
      toast({
        title: "Please select an answer",
        description: "You must select an answer before proceeding.",
        variant: "destructive"
      });
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    setSelectedAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizComplete(newAnswers);
    }
  };

  const handleQuizComplete = (finalAnswers = answers) => {
    // Calculate results
    const correctAnswers = finalAnswers.filter((answer, index) => 
      answer === questions[index]?.correct
    ).length;
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    // Analyze weak and strong topics
    const topicPerformance: { [key: string]: { correct: number; total: number } } = {};
    
    questions.forEach((q, index) => {
      if (!topicPerformance[q.topic]) {
        topicPerformance[q.topic] = { correct: 0, total: 0 };
      }
      topicPerformance[q.topic].total++;
      if (finalAnswers[index] === q.correct) {
        topicPerformance[q.topic].correct++;
      }
    });

    const weakTopics = Object.entries(topicPerformance)
      .filter(([_, performance]) => (performance.correct / performance.total) < 0.7)
      .map(([topic]) => topic);

    const strongTopics = Object.entries(topicPerformance)
      .filter(([_, performance]) => (performance.correct / performance.total) >= 0.8)
      .map(([topic]) => topic);

    // Generate detailed report
    const report = {
      studentName: currentUser.name,
      stream: currentUser.stream,
      totalQuestions: questions.length,
      correctAnswers,
      score,
      weakTopics,
      strongTopics,
      completedAt: new Date().toISOString(),
      timeSpent: 600 - timeLeft,
      questionWiseResults: questions.map((q, index) => ({
        question: q.question,
        selectedAnswer: finalAnswers[index],
        correctAnswer: q.correct,
        isCorrect: finalAnswers[index] === q.correct,
        subject: q.subject,
        topic: q.topic
      }))
    };

    // Store results
    localStorage.setItem('initialQuizResult', JSON.stringify(report));
    
    // Update user to mark quiz as completed
    const updatedUser = { ...currentUser, isFirstTime: false, lastQuizScore: score };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Show completion toast
    toast({
      title: "Quiz Completed!",
      description: `You scored ${score}%. Redirecting to your dashboard...`,
    });

    // Redirect to dashboard
    setTimeout(() => {
      navigate('/student/dashboard');
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentUser) return null;

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gradient">Initial Assessment</span>
            </div>
            <CardTitle className="text-2xl">Welcome to your {currentUser.stream} Assessment</CardTitle>
            <CardDescription className="text-base">
              Let's understand your current knowledge level to personalize your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>10 carefully selected questions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>10 minutes duration</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-warning" />
                <span>Covers all major topics</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Detailed performance report</span>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">What happens after the quiz?</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Get a detailed analysis of your strengths and weaknesses</li>
                <li>• Receive personalized study recommendations</li>
                <li>• Access curated resources for weak topics</li>
                <li>• Your teacher will receive your performance report</li>
              </ul>
            </div>

            <Button 
              size="lg" 
              className="w-full gradient-primary text-primary-foreground shadow-glow"
              onClick={() => setQuizStarted(true)}
            >
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold text-gradient">{currentUser.stream} Assessment</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-muted-foreground">
                {questions[currentQuestion]?.subject} • {questions[currentQuestion]?.topic}
              </span>
              <span className="text-sm font-medium text-primary">
                Question {currentQuestion + 1}
              </span>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {questions[currentQuestion]?.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={selectedAnswer} 
              onValueChange={setSelectedAnswer}
              className="space-y-4"
            >
              {questions[currentQuestion]?.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer text-base"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between items-center mt-8">
              <Button 
                variant="outline" 
                onClick={() => {
                  if (currentQuestion > 0) {
                    setCurrentQuestion(currentQuestion - 1);
                    setSelectedAnswer(answers[currentQuestion - 1] || "");
                  }
                }}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              <Button 
                onClick={handleNext}
                className="gradient-primary text-primary-foreground"
                disabled={!selectedAnswer}
              >
                {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InitialQuiz;