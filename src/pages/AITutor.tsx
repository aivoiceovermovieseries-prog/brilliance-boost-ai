import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  GraduationCap, 
  MessageCircle, 
  Send, 
  Trash2, 
  ArrowLeft,
  Bot,
  User,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const AITutor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
      // Load chat history from localStorage
      const chatHistory = localStorage.getItem(`chat_${JSON.parse(user).id}`) || '[]';
      setMessages(JSON.parse(chatHistory));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const saveChatHistory = (newMessages: Message[]) => {
    if (currentUser) {
      localStorage.setItem(`chat_${currentUser.id}`, JSON.stringify(newMessages));
    }
  };

  // Mock AI responses (in real implementation, this would call ChatGPT API)
  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Mock responses based on common queries
    if (lowerMessage.includes('physics') || lowerMessage.includes('force') || lowerMessage.includes('velocity')) {
      return `Great question about physics! Let me help you understand this concept better. 

For ${currentUser?.stream === 'JEE' ? 'JEE' : 'NEET'} physics, it's important to focus on the fundamental principles and practice numerical problems regularly. 

Here are some key points:
• Master the basic formulas and their applications
• Practice derivations step by step
• Solve previous year questions
• Understand the conceptual meaning behind each formula

Would you like me to explain any specific physics concept in detail?`;
    }
    
    if (lowerMessage.includes('chemistry') || lowerMessage.includes('organic') || lowerMessage.includes('inorganic')) {
      return `Chemistry can be challenging, but with the right approach, you can master it! 

For ${currentUser?.stream} chemistry preparation:
• Focus on NCERT thoroughly - it's your foundation
• Practice naming reactions and mechanisms
• Create reaction charts for organic chemistry
• Memorize important chemical reactions
• Solve numerical problems regularly

Remember, chemistry requires both understanding and memorization. Which specific topic would you like help with?`;
    }
    
    if (lowerMessage.includes('math') || lowerMessage.includes('calculus') || lowerMessage.includes('algebra')) {
      return `Mathematics is all about practice and understanding patterns! 

For ${currentUser?.stream} mathematics:
• Practice daily - consistency is key
• Master basic concepts before moving to advanced topics
• Solve previous year papers
• Focus on speed and accuracy
• Create formula sheets for quick revision

Which mathematical topic are you finding challenging? I can provide specific guidance and practice problems.`;
    }
    
    if (lowerMessage.includes('biology') && currentUser?.stream === 'NEET') {
      return `Biology is crucial for NEET success! Here's how to excel:

• NCERT is your Bible - read it multiple times
• Create detailed diagrams and flowcharts
• Focus on human physiology and plant biology
• Practice previous year questions extensively
• Make concise notes for quick revision

Biology requires extensive reading and understanding. Which biological system or topic would you like me to explain in detail?`;
    }
    
    if (lowerMessage.includes('study plan') || lowerMessage.includes('schedule')) {
      return `Here's a personalized study plan suggestion for ${currentUser?.stream}:

**Daily Schedule:**
• Morning (2-3 hours): Strong subject practice
• Afternoon (2-3 hours): Weak subject focus
• Evening (1-2 hours): Revision and doubt clearing

**Weekly Plan:**
• 6 days focused study
• 1 day for mock tests and analysis

**Monthly Goals:**
• Complete syllabus topics systematically
• Regular mock tests
• Weakness analysis and improvement

Would you like me to create a more detailed schedule based on your specific needs?`;
    }
    
    if (lowerMessage.includes('motivation') || lowerMessage.includes('stressed') || lowerMessage.includes('difficult')) {
      return `I understand that ${currentUser?.stream} preparation can be overwhelming sometimes. Remember:

🌟 **You're capable of achieving your dreams!**

• Every expert was once a beginner
• Consistent effort beats sporadic intensity
• Mistakes are learning opportunities
• Your hard work will pay off

Take regular breaks, maintain a healthy routine, and believe in yourself. You've got this! 

What specific challenge are you facing? I'm here to help you overcome it.`;
    }
    
    // Default response
    return `Hello! I'm Radiance, your AI tutor for ${currentUser?.stream} preparation. I'm here to help you with:

📚 Subject explanations and doubt clearing
📈 Study planning and strategies  
🎯 Exam preparation tips
💪 Motivation and guidance

Feel free to ask me anything about your studies, and I'll provide detailed, personalized assistance. What would you like to know today?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      role: 'user',
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(inputMessage);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
      saveChatHistory(updatedMessages);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI tutor. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearChatHistory = () => {
    setMessages([]);
    if (currentUser) {
      localStorage.removeItem(`chat_${currentUser.id}`);
    }
    toast({
      title: "Chat Cleared",
      description: "Your chat history has been cleared.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/student/dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gradient">Radiance AI Tutor</h1>
                <p className="text-xs text-muted-foreground">Your personalized {currentUser.stream} assistant</p>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearChatHistory}
            disabled={messages.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl p-4 h-[calc(100vh-80px)] flex flex-col">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <Card className="gradient-card border-0 shadow-lg mb-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                Welcome to Radiance AI Tutor! 🌟
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                I'm here to help you excel in your {currentUser.stream} preparation. You can ask me about:
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Subject concepts and explanations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-success rounded-full"></span>
                  <span>Problem-solving strategies</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-warning rounded-full"></span>
                  <span>Study planning and time management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  <span>Exam preparation tips</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Messages */}
        <div className="flex-1 mb-4">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your studies..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="gradient-primary text-primary-foreground"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;