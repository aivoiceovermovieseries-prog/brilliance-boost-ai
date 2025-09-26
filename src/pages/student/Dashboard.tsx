import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  Brain, 
  BookOpen, 
  Video, 
  MessageCircle, 
  TrendingUp,
  Target,
  Clock,
  Award,
  PlayCircle,
  FileText,
  Users,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  if (!currentUser) return null;

  // Mock data for demonstration
  const mockStats = {
    totalQuizzes: 12,
    averageScore: 78,
    weakTopics: ['Organic Chemistry', 'Thermodynamics', 'Optics'],
    strongTopics: ['Algebra', 'Mechanics', 'Atomic Structure'],
    studyStreak: 15,
    weeklyProgress: 65
  };

  const recentQuizzes = [
    { id: 1, subject: 'Physics', topic: 'Mechanics', score: 85, date: '2024-01-15' },
    { id: 2, subject: 'Chemistry', topic: 'Organic Chemistry', score: 72, date: '2024-01-14' },
    { id: 3, subject: 'Mathematics', topic: 'Calculus', score: 90, date: '2024-01-13' }
  ];

  const recommendedVideos = [
    { title: 'Organic Chemistry Basics', channel: 'Physics Wallah', duration: '45 min', topic: 'Organic Chemistry' },
    { title: 'Thermodynamics Laws', channel: 'Unacademy', duration: '38 min', topic: 'Thermodynamics' },
    { title: 'Optics and Light', channel: 'Khan Academy', duration: '52 min', topic: 'Optics' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gradient">Blackbox AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, <span className="font-medium text-foreground">{currentUser.name}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {currentUser.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Continue your {currentUser.stream} preparation journey
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Study Streak</p>
                  <p className="text-2xl font-bold text-success">{mockStats.studyStreak}</p>
                  <p className="text-xs text-muted-foreground">days</p>
                </div>
                <Target className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold text-primary">{mockStats.averageScore}%</p>
                  <p className="text-xs text-muted-foreground">last 10 quizzes</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Quizzes</p>
                  <p className="text-2xl font-bold text-warning">{mockStats.totalQuizzes}</p>
                  <p className="text-xs text-muted-foreground">completed</p>
                </div>
                <Award className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Weekly Goal</p>
                  <p className="text-2xl font-bold text-secondary">{mockStats.weeklyProgress}%</p>
                  <Progress value={mockStats.weeklyProgress} className="mt-2" />
                </div>
                <Clock className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quiz">Take Quiz</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="ai-tutor">AI Tutor</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Performance Overview */}
              <Card className="gradient-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Strong Topics</span>
                        <span className="text-success">85% avg</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {mockStats.strongTopics.map((topic) => (
                          <span key={topic} className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Needs Improvement</span>
                        <span className="text-warning">65% avg</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {mockStats.weakTopics.map((topic) => (
                          <span key={topic} className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="gradient-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    Recent Quizzes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentQuizzes.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{quiz.topic}</p>
                          <p className="text-sm text-muted-foreground">{quiz.subject}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${quiz.score >= 80 ? 'text-success' : quiz.score >= 70 ? 'text-warning' : 'text-destructive'}`}>
                            {quiz.score}%
                          </p>
                          <p className="text-xs text-muted-foreground">{quiz.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quiz">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-primary" />
                  Take a Quiz
                </CardTitle>
                <CardDescription>
                  Test your knowledge and improve your skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button 
                    className="h-20 flex-col gradient-primary text-primary-foreground"
                    onClick={() => navigate('/quiz/practice')}
                  >
                    <Brain className="h-6 w-6 mb-2" />
                    Practice Quiz
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => navigate('/quiz/mock')}
                  >
                    <FileText className="h-6 w-6 mb-2" />
                    Mock Test
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => navigate('/quiz/weak-topics')}
                  >
                    <Target className="h-6 w-6 mb-2" />
                    Weak Topics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="gradient-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="h-5 w-5 mr-2 text-primary" />
                    Recommended Videos
                  </CardTitle>
                  <CardDescription>
                    Based on your weak topics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recommendedVideos.map((video, index) => (
                      <div key={index} className="flex items-center p-3 bg-muted/50 rounded-lg">
                        <PlayCircle className="h-8 w-8 text-primary mr-3" />
                        <div className="flex-1">
                          <p className="font-medium">{video.title}</p>
                          <p className="text-sm text-muted-foreground">{video.channel} • {video.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => navigate('/resources/videos')}
                  >
                    View All Videos
                  </Button>
                </CardContent>
              </Card>

              <Card className="gradient-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Study Materials
                  </CardTitle>
                  <CardDescription>
                    Free books and materials for {currentUser.stream}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                      <FileText className="h-8 w-8 text-primary mr-3" />
                      <div>
                        <p className="font-medium">NCERT Physics</p>
                        <p className="text-sm text-muted-foreground">Class 11 & 12</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                      <FileText className="h-8 w-8 text-primary mr-3" />
                      <div>
                        <p className="font-medium">RD Sharma Mathematics</p>
                        <p className="text-sm text-muted-foreground">Practice Problems</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                      <FileText className="h-8 w-8 text-primary mr-3" />
                      <div>
                        <p className="font-medium">NCERT Chemistry</p>
                        <p className="text-sm text-muted-foreground">Complete Series</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => navigate('/resources/books')}
                  >
                    View All Materials
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-tutor">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                  Chat with Radiance - Your AI Tutor
                </CardTitle>
                <CardDescription>
                  Get instant help with your doubts and questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Meet Radiance</h3>
                  <p className="text-muted-foreground mb-4">
                    Your personal AI-powered tutor, available 24/7 to help you with any {currentUser.stream} related questions.
                  </p>
                  <Button 
                    size="lg" 
                    className="gradient-primary text-primary-foreground"
                    onClick={() => navigate('/ai-tutor')}
                  >
                    Start Chatting
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Detailed Performance Reports
                </CardTitle>
                <CardDescription>
                  Analyze your progress and identify areas for improvement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
                  <p className="text-muted-foreground mb-4">
                    View comprehensive reports about your learning progress, strengths, and areas that need improvement.
                  </p>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => navigate('/reports')}
                  >
                    View Detailed Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;