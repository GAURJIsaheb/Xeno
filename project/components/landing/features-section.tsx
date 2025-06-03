import { 
  Brain, 
  Users, 
  BarChart3, 
  MailPlus, 
  CalendarClock, 
  Lock, 
  Sparkles, 
  LineChart 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-chart-1" />,
      title: "AI-Powered Segmentation",
      description: "Convert natural language queries into powerful audience segments with our AI engine",
    },
    {
      icon: <Users className="h-8 w-8 text-chart-2" />,
      title: "Audience Lookalikes",
      description: "Find similar high-value customers to expand your targeting with AI analysis",
    },
    {
      icon: <MailPlus className="h-8 w-8 text-chart-3" />,
      title: "Smart Messaging",
      description: "Get AI-generated message suggestions tailored to your campaign goals",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-chart-4" />,
      title: "Performance Analytics",
      description: "Track campaign delivery, engagement, and conversion metrics in real-time",
    },
    {
      icon: <CalendarClock className="h-8 w-8 text-chart-5" />,
      title: "Intelligent Scheduling",
      description: "Send at the optimal time based on customer activity patterns",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-chart-1" />,
      title: "Auto-Tagging",
      description: "AI automatically categorizes and tags campaigns based on content and audience",
    },
    {
      icon: <Lock className="h-8 w-8 text-chart-2" />,
      title: "Secure Authentication",
      description: "Enterprise-grade security with Google OAuth 2.0 integration",
    },
    {
      icon: <LineChart className="h-8 w-8 text-chart-3" />,
      title: "Campaign Insights",
      description: "AI-generated summaries of campaign performance and recommendations",
    },
  ];

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Intelligent Customer Engagement
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our platform combines powerful segmentation with AI to deliver the right message to the right customer at the right time.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-border transition-all duration-200 hover:shadow-md">
              <CardHeader>
                <div className="p-2 w-fit rounded-md bg-muted">
                  {feature.icon}
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}