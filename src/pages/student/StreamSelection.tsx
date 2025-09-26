import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Zap, Heart, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StreamSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedStream, setSelectedStream] = useState<'JEE' | 'NEET' | null>(null);

  const handleStreamSelection = () => {
    if (!selectedStream) return;

    // Update user data with selected stream
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const updatedUser = { ...currentUser, stream: selectedStream };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    toast({
      title: "Stream Selected",
      description: `Welcome to ${selectedStream} preparation! Let's start with an assessment.`,
    });

    // Navigate to initial quiz
    navigate('/quiz/initial');
  };

  const streamInfo = {
    JEE: {
      icon: Zap,
      color: 'warning',
      title: 'JEE (Engineering)',
      description: 'Joint Entrance Examination for engineering colleges',
      subjects: ['Mathematics', 'Physics', 'Chemistry'],
      colleges: 'IITs, NITs, IIITs and other engineering colleges',
      features: [
        'Advanced mathematical problem-solving',
        'Physics concepts and applications',
        'Chemistry theory and numericals',
        'Mock tests and previous year papers'
      ]
    },
    NEET: {
      icon: Heart,
      color: 'success',
      title: 'NEET (Medical)',
      description: 'National Eligibility Entrance Test for medical colleges',
      subjects: ['Biology', 'Physics', 'Chemistry'],
      colleges: 'AIIMS, Medical colleges across India',
      features: [
        'Biology concepts and diagrams',
        'Medical physics applications',
        'Organic and inorganic chemistry',
        'Medical entrance preparation'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-10 w-10 text-white" />
            <span className="text-3xl font-bold text-white">Blackbox AI</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Choose Your Stream</h1>
          <p className="text-white/80 text-lg">Select your entrance exam to get personalized learning content</p>
        </div>

        {/* Stream Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {Object.entries(streamInfo).map(([key, info]) => {
            const IconComponent = info.icon;
            const isSelected = selectedStream === key;
            
            return (
              <Card 
                key={key}
                className={`cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 ${
                  isSelected 
                    ? `border-${info.color} shadow-glow bg-${info.color}/5` 
                    : 'border-white/20 bg-white/95 hover:bg-white'
                }`}
                onClick={() => setSelectedStream(key as 'JEE' | 'NEET')}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-4 w-20 h-20 bg-${info.color}/10 rounded-full flex items-center justify-center`}>
                    <IconComponent className={`h-12 w-12 text-${info.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{info.title}</CardTitle>
                  <CardDescription className="text-base">
                    {info.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">SUBJECTS</h4>
                    <div className="flex flex-wrap gap-2">
                      {info.subjects.map((subject) => (
                        <span 
                          key={subject}
                          className={`px-3 py-1 rounded-full text-xs font-medium bg-${info.color}/10 text-${info.color}`}
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">TARGET COLLEGES</h4>
                    <p className="text-sm">{info.colleges}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">WHAT YOU'LL GET</h4>
                    <ul className="text-sm space-y-1">
                      {info.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Continue Button */}
        {selectedStream && (
          <div className="text-center animate-fade-in">
            <Card className="bg-white/95 border-white/20 shadow-2xl">
              <CardContent className="p-6">
                <p className="text-lg mb-4">
                  Ready to start your <strong>{selectedStream}</strong> preparation journey?
                </p>
                <Button 
                  size="lg" 
                  className="gradient-primary text-primary-foreground shadow-glow"
                  onClick={handleStreamSelection}
                >
                  Start Initial Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  We'll ask you 10 questions to understand your current level
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamSelection;