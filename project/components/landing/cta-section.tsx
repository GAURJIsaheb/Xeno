import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to transform your customer engagement strategy?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start creating intelligent campaigns that connect with your audience on a deeper level.
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
                href="#"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Contact Sales
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6 grid-cols-1">
              {[
                {
                  title: "Intelligent Segmentation",
                  description: "Create precise audience segments with natural language commands",
                },
                {
                  title: "AI-Powered Recommendations",
                  description: "Get smart suggestions for messaging and optimal send times",
                },
                {
                  title: "Comprehensive Analytics",
                  description: "Track campaign performance with detailed metrics and insights",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {index + 1}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}