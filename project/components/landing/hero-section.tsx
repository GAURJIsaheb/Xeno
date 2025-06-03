import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { MailPlus, Users, Sparkles, BarChart3 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                AI-Powered Customer Engagement
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Create targeted campaigns, automate customer segmentation, and drive conversions with our intelligent marketing platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/api/auth/signin"
                className={buttonVariants({ size: "lg" })}
              >
                Get Started
              </Link>
              <Link
                href="#features"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted/50 md:aspect-square lg:order-last lg:aspect-auto">
              <div className="flex h-full flex-col items-center justify-center space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                  {[
                    {
                      icon: <Users className="h-8 w-8 mb-2 text-chart-1" />,
                      title: "Smart Segmentation",
                      description: "Target the right audience with AI-powered segmentation",
                    },
                    {
                      icon: <MailPlus className="h-8 w-8 mb-2 text-chart-2" />,
                      title: "Campaign Builder",
                      description: "Create compelling campaigns with intelligent suggestions",
                    },
                    {
                      icon: <Sparkles className="h-8 w-8 mb-2 text-chart-4" />,
                      title: "AI Recommendations",
                      description: "Get smart timing and content suggestions",
                    },
                    {
                      icon: <BarChart3 className="h-8 w-8 mb-2 text-chart-3" />,
                      title: "Performance Analytics",
                      description: "Track and improve campaign metrics",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center rounded-lg border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md">
                      {item.icon}
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}