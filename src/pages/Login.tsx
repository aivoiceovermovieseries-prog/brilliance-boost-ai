import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Mock user data for demonstration
  const mockUsers = [
    { email: "student@example.com", password: "password", role: "student", stream: "JEE", name: "John Doe", isFirstTime: true },
    { email: "teacher@example.com", password: "password", role: "teacher", stream: "JEE", name: "Dr. Smith" },
    { email: "neet.student@example.com", password: "password", role: "student", stream: "NEET", name: "Jane Smith", isFirstTime: false }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    const user = mockUsers.find(u => u.email === formData.email && u.password === formData.password);
    
    if (user) {
      // Store user data in localStorage (in real app, use proper auth)
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });

      // Redirect based on role and first-time status
      if (user.role === 'student') {
        if (user.isFirstTime) {
          navigate('/quiz/initial');
        } else {
          navigate('/student/dashboard');
        }
      } else {
        navigate('/teacher/dashboard');
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Try student@example.com / password",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-10 w-10 text-white" />
            <span className="text-3xl font-bold text-white">learnaura</span>
          </div>
          <p className="text-white/80">Welcome back to your learning journey</p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gradient">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    className="pr-10 transition-all focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary text-primary-foreground shadow-glow"
              >
                Sign In
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-2">Demo Credentials:</p>
              <p className="text-xs text-muted-foreground">Student: student@example.com / password</p>
              <p className="text-xs text-muted-foreground">Teacher: teacher@example.com / password</p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate('/signup')}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;