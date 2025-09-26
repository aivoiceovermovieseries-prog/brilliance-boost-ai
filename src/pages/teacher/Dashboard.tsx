import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Users, 
  TrendingUp,
  BookOpen,
  MessageCircle,
  FileText,
  Eye,
  Download,
  LogOut,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role !== 'teacher') {
        navigate('/login');
        return;
      }
      setCurrentUser(userData);
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

  // Mock student data for demonstration
  const mockStudents = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      stream: "JEE",
      lastActive: "2024-01-15",
      averageScore: 78,
      quizzesCompleted: 12,
      weakTopics: ["Organic Chemistry", "Thermodynamics"],
      strongTopics: ["Algebra", "Mechanics"],
      status: "active"
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya@example.com",
      stream: "JEE",
      lastActive: "2024-01-14",
      averageScore: 85,
      quizzesCompleted: 15,
      weakTopics: ["Optics"],
      strongTopics: ["Calculus", "Waves"],
      status: "active"
    },
    {
      id: 3,
      name: "Anjali Singh",
      email: "anjali@example.com",
      stream: "NEET",
      lastActive: "2024-01-13",
      averageScore: 72,
      quizzesCompleted: 8,
      weakTopics: ["Human Physiology", "Plant Biology"],
      strongTopics: ["Chemistry", "Physics"],
      status: "inactive"
    }
  ];

  const streamStudents = mockStudents.filter(student => student.stream === currentUser.stream);
  const classStats = {
    totalStudents: streamStudents.length,
    activeStudents: streamStudents.filter(s => s.status === 'active').length,
    averageClassScore: Math.round(streamStudents.reduce((acc, s) => acc + s.averageScore, 0) / streamStudents.length),
    totalQuizzes: streamStudents.reduce((acc, s) => acc + s.quizzesCompleted, 0)
  };

  const recentReports = [
    {
      studentName: "Rahul Sharma",
      subject: "Physics",
      topic: "Mechanics",
      score: 78,
      date: "2024-01-15",
      needsAttention: true
    },
    {
      studentName: "Priya Patel",
      subject: "Mathematics",
      topic: "Calculus",
      score: 92,
      date: "2024-01-14",
      needsAttention: false
    },
    {
      studentName: "Anjali Singh",
      subject: "Biology",
      topic: "Cell Biology",
      score: 68,
      date: "2024-01-13",
      needsAttention: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gradient">learnaura</span>
            <Badge variant="secondary" className="ml-2">Teacher</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{currentUser.name}</span> • {currentUser.stream} Stream
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
            Teacher Dashboard 👨‍🏫
          </h1>
          <p className="text-muted-foreground">
            Monitor and guide your {currentUser.stream} students' progress
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-primary">{classStats.totalStudents}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.stream} stream</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <p className="text-2xl font-bold text-success">{classStats.activeStudents}</p>
                  <p className="text-xs text-muted-foreground">this week</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Class Average</p>
                  <p className="text-2xl font-bold text-warning">{classStats.averageClassScore}%</p>
                  <p className="text-xs text-muted-foreground">overall performance</p>
                </div>
                <TrendingUp className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Quizzes</p>
                  <p className="text-2xl font-bold text-secondary">{classStats.totalQuizzes}</p>
                  <p className="text-xs text-muted-foreground">completed</p>
                </div>
                <FileText className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="reports">Recent Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  {currentUser.stream} Students Overview
                </CardTitle>
                <CardDescription>
                  Monitor your students' progress and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {streamStudents.map((student) => (
                    <div key={student.id} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-primary">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                            {student.status === 'active' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {student.status}
                          </Badge>
                          <Button size="sm" variant="outline" onClick={() => navigate(`/teacher/student/${student.id}`)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Average Score</p>
                          <p className={`font-semibold ${
                            student.averageScore >= 80 ? 'text-success' : 
                            student.averageScore >= 70 ? 'text-warning' : 'text-destructive'
                          }`}>
                            {student.averageScore}%
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Quizzes Done</p>
                          <p className="font-semibold">{student.quizzesCompleted}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Active</p>
                          <p className="font-semibold">{student.lastActive}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Needs Help</p>
                          <div className="flex flex-wrap gap-1">
                            {student.weakTopics.slice(0, 2).map((topic) => (
                              <Badge key={topic} variant="destructive" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Recent Student Reports
                </CardTitle>
                <CardDescription>
                  Latest quiz results and performance reports from your students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {report.needsAttention ? (
                          <AlertCircle className="h-5 w-5 text-warning" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-success" />
                        )}
                        <div>
                          <p className="font-semibold">{report.studentName}</p>
                          <p className="text-sm text-muted-foreground">
                            {report.subject} - {report.topic}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className={`font-bold ${
                            report.score >= 80 ? 'text-success' : 
                            report.score >= 70 ? 'text-warning' : 'text-destructive'
                          }`}>
                            {report.score}%
                          </p>
                          <p className="text-xs text-muted-foreground">{report.date}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="gradient-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Class Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
                    <p className="text-muted-foreground mb-4">
                      Detailed performance graphs, learning trends, and predictive insights coming soon.
                    </p>
                    <Button variant="outline">
                      View Analytics Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Common Weak Topics</CardTitle>
                  <CardDescription>Areas where students need the most help</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Organic Chemistry</span>
                      <Badge variant="destructive">67% struggle</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Thermodynamics</span>
                      <Badge variant="destructive">58% struggle</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Optics</span>
                      <Badge variant="secondary">42% struggle</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Complex Numbers</span>
                      <Badge variant="secondary">35% struggle</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  Teaching Resources
                </CardTitle>
                <CardDescription>
                  Materials and tools to help your students succeed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    Question Bank
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <BookOpen className="h-6 w-6 mb-2" />
                    Study Materials
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <MessageCircle className="h-6 w-6 mb-2" />
                    AI Teaching Assistant
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

export default TeacherDashboard;