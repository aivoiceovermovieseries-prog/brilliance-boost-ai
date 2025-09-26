import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Eye, EyeOff, Users, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'student' | 'teacher'>(
    searchParams.get('type') as 'student' | 'teacher' || 'student'
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stream: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (userType === 'teacher' && !formData.stream) {
      toast({
        title: "Stream Required",
        description: "Please select your teaching stream.",
        variant: "destructive"
      });
      return;
    }

    // Mock user creation
    const newUser = {
      name: formData.name,
      email: formData.email,
      role: userType,
      stream: userType === 'student' ? '' : formData.stream, // Students select stream after signup
      isFirstTime: true,
      id: Date.now().toString()
    };

    localStorage.setItem('currentUser', JSON.stringify(newUser));

    toast({
      title: "Account Created",
      description: `Welcome to learnaura, ${formData.name}!`,
    });

    // Redirect based on user type
    if (userType === 'student') {
      navigate('/student/stream-selection');
    } else {
      navigate('/teacher/dashboard');
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
          <p className="text-white/80">Join thousands of successful learners</p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gradient">Create Account</CardTitle>
            <CardDescription>
              Start your journey to academic excellence
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* User Type Selection */}
            <div className="mb-6">
              <Label className="text-base font-medium">I am a:</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Button
                  type="button"
                  variant={userType === 'student' ? 'default' : 'outline'}
                  className={userType === 'student' ? 'bg-success hover:bg-success/90' : ''}
                  onClick={() => setUserType('student')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Student
                </Button>
                <Button
                  type="button"
                  variant={userType === 'teacher' ? 'default' : 'outline'}
                  className={userType === 'teacher' ? 'bg-warning hover:bg-warning/90' : ''}
                  onClick={() => setUserType('teacher')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Teacher
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>

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

              {userType === 'teacher' && (
                <div className="space-y-2">
                  <Label htmlFor="stream">Teaching Stream</Label>
                  <Select onValueChange={(value) => setFormData({...formData, stream: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your teaching stream" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JEE">JEE (Engineering)</SelectItem>
                      <SelectItem value="NEET">NEET (Medical)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary text-primary-foreground shadow-glow"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={() => navigate('/login')}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in here
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

export default SignUp;