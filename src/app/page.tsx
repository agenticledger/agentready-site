"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  FileText,
  Wrench,
  Zap,
  Bot,
  BookOpen,
  Code2,
  Cloud,
  Globe,
  GitBranch,
  MessageSquare,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  Send,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Category colors – subtle tinted backgrounds, not gamey             */
/* ------------------------------------------------------------------ */
const categoryStyle: Record<string, string> = {
  Payments:       "bg-blue-50 border-blue-200 text-blue-700",
  Accounting:     "bg-emerald-50 border-emerald-200 text-emerald-700",
  ERP:            "bg-violet-50 border-violet-200 text-violet-700",
  Banking:        "bg-cyan-50 border-cyan-200 text-cyan-700",
  "Spend Mgmt":   "bg-amber-50 border-amber-200 text-amber-700",
  "HR & Payroll":  "bg-rose-50 border-rose-200 text-rose-700",
  Billing:        "bg-indigo-50 border-indigo-200 text-indigo-700",
  Treasury:       "bg-teal-50 border-teal-200 text-teal-700",
  Tax:            "bg-orange-50 border-orange-200 text-orange-700",
  Expenses:       "bg-pink-50 border-pink-200 text-pink-700",
  "Close Mgmt":   "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700",
  "Practice Mgmt":"bg-purple-50 border-purple-200 text-purple-700",
  CRM:            "bg-sky-50 border-sky-200 text-sky-700",
  "Project Mgmt": "bg-lime-50 border-lime-200 text-lime-700",
  Analytics:      "bg-slate-100 border-slate-300 text-slate-700",
  Meetings:       "bg-yellow-50 border-yellow-200 text-yellow-700",
  Productivity:   "bg-green-50 border-green-200 text-green-700",
  Crypto:         "bg-zinc-100 border-zinc-300 text-zinc-700",
  "Agent Platform":"bg-violet-50 border-violet-200 text-violet-700",
  Social:         "bg-blue-50 border-blue-200 text-blue-700",
  Media:          "bg-red-50 border-red-200 text-red-700",
  Security:       "bg-stone-100 border-stone-300 text-stone-700",
  "AI Builder":   "bg-indigo-50 border-indigo-200 text-indigo-700",
};

const getCategoryClasses = (category: string) =>
  categoryStyle[category] ?? "bg-gray-50 border-gray-200 text-gray-700";

/* ------------------------------------------------------------------ */
/*  Portfolio data                                                     */
/* ------------------------------------------------------------------ */

const portfolioApps: { name: string; slug: string; category: string }[] = [
  { name: "Stripe", slug: "stripe", category: "Payments" },
  { name: "PayPal", slug: "paypal", category: "Payments" },
  { name: "Square", slug: "square", category: "Payments" },
  { name: "Xero", slug: "xero", category: "Accounting" },
  { name: "QuickBooks", slug: "qbo", category: "Accounting" },
  { name: "Bill.com", slug: "billcom", category: "Accounting" },
  { name: "NetSuite", slug: "netsuite", category: "ERP" },
  { name: "Mercury", slug: "mercury", category: "Banking" },
  { name: "Plaid", slug: "plaid", category: "Banking" },
  { name: "Brex", slug: "brex", category: "Spend Mgmt" },
  { name: "Ramp", slug: "ramp", category: "Spend Mgmt" },
  { name: "Gusto", slug: "gusto", category: "HR & Payroll" },
  { name: "Chargebee", slug: "chargebee", category: "Billing" },
  { name: "Modern Treasury", slug: "modern-treasury", category: "Treasury" },
  { name: "Avalara", slug: "avalara", category: "Tax" },
  { name: "Expensify", slug: "expensify", category: "Expenses" },
  { name: "FloQast", slug: "floqast", category: "Close Mgmt" },
  { name: "Karbon", slug: "karbon", category: "Practice Mgmt" },
  { name: "HubSpot", slug: "hubspot", category: "CRM" },
  { name: "Smartsheet", slug: "smartsheets", category: "Project Mgmt" },
  { name: "Cube.dev", slug: "cubedev", category: "Analytics" },
  { name: "Metabase", slug: "metabase", category: "Analytics" },
  { name: "Fireflies", slug: "fireflies", category: "Meetings" },
  { name: "Granola", slug: "granola", category: "Meetings" },
  { name: "Notion", slug: "notion", category: "Productivity" },
  { name: "Fireblocks", slug: "fireblocks", category: "Crypto" },
  { name: "Bitwave", slug: "bitwave", category: "Crypto" },
  { name: "Lighthouse", slug: "lighthouse", category: "Crypto" },
  { name: "CCView", slug: "ccview", category: "Crypto" },
  { name: "Lightspark SDK", slug: "lightspark-sdk", category: "Crypto" },
  { name: "Lightspark Grid", slug: "lightspark-grid", category: "Payments" },
  { name: "P2P Lambda", slug: "p2p-lambda", category: "Crypto" },
  { name: "Tres Finance", slug: "tres-finance", category: "Crypto" },
  { name: "GCP Web3", slug: "gcp-public-datasets", category: "Crypto" },
  { name: "Catalyx", slug: "catalyx-wallet-manager", category: "Treasury" },
  { name: "Finney", slug: "finney", category: "AI Builder" },
  { name: "MyAIforOne", slug: "myaiforone", category: "Agent Platform" },
  { name: "LinkedIn", slug: "linkedin", category: "Social" },
  { name: "YouTube", slug: "youtube-transcript", category: "Media" },
  { name: "Finance Is Cooked", slug: "financeiscooked", category: "Media" },
];

// Additional showcase (not on financemcps)
const showcaseApps = [
  { name: "Web3 Antivirus", url: "https://w3avmcp.agenticledger.ai", category: "Security" },
  { name: "Frexplorer", url: "https://frexplorer.agenticledger.ai/mcp-docs", category: "Crypto" },
];

function getPortfolioUrl(slug: string): string {
  return `https://financemcps.agenticledger.ai/${slug}/`;
}

/* ------------------------------------------------------------------ */
/*  Industry trend articles                                            */
/* ------------------------------------------------------------------ */

const trendArticles = [
  {
    company: "Salesforce",
    quote: "Salesforce launches Agentforce, letting any AI agent interact with Salesforce data",
    url: "https://www.salesforce.com/agentforce/",
    icon: "CRM",
  },
  {
    company: "Shopify",
    quote: "Millions of merchants can now sell directly through AI agent chats",
    url: "https://www.shopify.com/news/agentic-commerce-momentum",
    icon: "SHOP",
  },
  {
    company: "Google",
    quote: "Google embraces Anthropic's MCP standard for connecting AI models to data",
    url: "https://techcrunch.com/2025/04/09/google-says-itll-embrace-anthropics-standard-for-connecting-ai-models-to-data/",
    icon: "G",
  },
  {
    company: "Anthropic",
    quote: "Anthropic's Model Context Protocol becomes the standard for agent-app connectivity",
    url: "https://www.anthropic.com/news/model-context-protocol",
    icon: "MCP",
  },
];

/* ------------------------------------------------------------------ */
/*  Countdown hook                                                     */
/* ------------------------------------------------------------------ */

function useCountdown(start: number, end: number, intervalMs = 800) {
  const [value, setValue] = useState(start);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (value <= end) return;
    const timer = setTimeout(() => {
      setAnimating(true);
      setTimeout(() => {
        setValue((v) => v - 1);
        setAnimating(false);
      }, 200);
    }, intervalMs);
    return () => clearTimeout(timer);
  }, [value, end, intervalMs]);

  return { value, animating };
}

/* ------------------------------------------------------------------ */
/*  Fade-in on scroll                                                  */
/* ------------------------------------------------------------------ */

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, className: `transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}` };
}

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const fade = useFadeIn();
  return (
    <section ref={fade.ref} id={id} className={`${fade.className} ${className}`}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const { value: countdownValue, animating } = useCountdown(14, 10);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");
    setFormError("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      company: fd.get("company") as string,
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      apiDocsUrl: fd.get("apiDocsUrl") as string,
      message: fd.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      setFormState("sent");
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Something went wrong");
      setFormState("error");
    }
  }

  return (
    <div className="flex flex-col min-h-full bg-white text-slate-900">
      {/* ---- NAV ---- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              AR
            </div>
            <span className="font-semibold text-lg tracking-tight">Agent Ready</span>
          </div>
          <div className="hidden sm:flex items-center gap-8 text-sm text-slate-600">
            <a href="#portfolio" className="hover:text-slate-900 transition-colors">Portfolio</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#deliverables" className="hover:text-slate-900 transition-colors">Deliverables</a>
          </div>
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* ---- HERO ---- */}
      <header className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white">
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-20 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900 max-w-4xl mx-auto">
            Connect your app to Claude, ChatGPT, Gemini, Grok &amp; any AI agent in under{" "}
            <span className="relative inline-block">
              <span
                className={`inline-block tabular-nums text-emerald-600 transition-all duration-300 ${
                  animating ? "scale-75 opacity-0" : "scale-100 opacity-100"
                }`}
              >
                {countdownValue}
              </span>
            </span>{" "}
            <span className="text-emerald-600">business days.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Your customers access your app from any AI agent in the world. We handle
            everything — from API to agent-ready in days, not months.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 text-base"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 text-base px-8"
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            >
              See Portfolio
            </Button>
          </div>
        </div>
      </header>

      {/* ---- INDUSTRY TREND ---- */}
      <Section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              The biggest companies in the world are going agent-ready
            </h2>
            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
              The shift to AI-native software is happening now. Don&apos;t get left behind.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trendArticles.map((a) => (
              <a
                key={a.company}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="h-full p-6 bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 mb-4 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                    {a.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{a.company}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{a.quote}</p>
                  <span className="inline-flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                    Read more <ChevronRight className="w-3 h-3 ml-1" />
                  </span>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* ---- HOW IT WORKS ---- */}
      <Section className="py-20" id="how-it-works">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Three steps. That&apos;s it.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                num: "1",
                title: "Share your API docs",
                desc: "Send us your API documentation and an API key. That's all we need to get started.",
                icon: FileText,
              },
              {
                num: "2",
                title: "We build everything",
                desc: "In 10 business days, we create your MCP server, demo agent, interactive docs, and deploy it all.",
                icon: Wrench,
              },
              {
                num: "3",
                title: "Your app works with every AI",
                desc: "Your customers can now access your app from Claude, ChatGPT, Gemini, Grok, and any MCP-compatible AI agent.",
                icon: Zap,
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold mb-5">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Separator className="max-w-6xl mx-auto" />

      {/* ---- PORTFOLIO ---- */}
      <Section className="py-20" id="portfolio">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              40+ agent-ready integrations built in &lt; 10 business days
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              Click any tile to see the live MCP docs and demo agent
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {portfolioApps.map((app) => (
              <a
                key={app.slug}
                href={getPortfolioUrl(app.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className={`flex flex-col items-center justify-center min-h-[5.5rem] py-3 px-4 text-center border hover:shadow-md hover:scale-[1.03] transition-all duration-150 ${getCategoryClasses(app.category)}`}>
                  <span className="text-sm font-semibold leading-tight">
                    {app.name}
                  </span>
                  <span className="text-[11px] opacity-60 mt-1.5 font-medium">{app.category}</span>
                </Card>
              </a>
            ))}
            {showcaseApps.map((app) => (
              <a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className={`flex flex-col items-center justify-center min-h-[5.5rem] py-3 px-4 text-center border hover:shadow-md hover:scale-[1.03] transition-all duration-150 ${getCategoryClasses(app.category)}`}>
                  <span className="text-sm font-semibold leading-tight">
                    {app.name}
                  </span>
                  <span className="text-[11px] opacity-60 mt-1.5 font-medium">{app.category}</span>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* ---- WHAT YOU GET ---- */}
      <Section className="py-20 bg-slate-50" id="deliverables">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Everything you need to be agent-ready
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* For Your Customers */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                For Your Customers
              </h3>
              <div className="space-y-5">
                {[
                  { icon: Bot, title: "AI Agent Access", desc: "Your app works with Claude, ChatGPT, Gemini, Grok, and any AI agent" },
                  { icon: MessageSquare, title: "Demo Agent", desc: "A branded chat interface where customers try your app via AI" },
                  { icon: BookOpen, title: "Interactive API Docs", desc: "Professional documentation with live tool testing" },
                  { icon: Code2, title: "Embeddable Widget", desc: "Drop a chat widget on your website with one script tag" },
                  { icon: ExternalLink, title: "Use with Claude Page", desc: "One-click setup instructions for Claude Desktop and other AI tools" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Under the Hood */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                Under the Hood
              </h3>
              <div className="space-y-5">
                {[
                  { icon: Code2, title: "Local MCP Server", desc: "stdio server for Claude Desktop/Code with full tool access" },
                  { icon: Cloud, title: "Cloud MCP Server", desc: "Hosted HTTP endpoint with Streamable HTTP transport" },
                  { icon: Globe, title: "REST API", desc: "Direct tool calling via simple HTTP POST" },
                  { icon: Zap, title: "Custom Domain", desc: "Your own subdomain (e.g., yourappmcp.agenticledger.ai)" },
                  { icon: GitBranch, title: "GitHub Repository", desc: "Full source code delivered to your org" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- CONTACT FORM ---- */}
      <Section className="py-20" id="contact">
        <div className="mx-auto max-w-xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Let&apos;s make your app agent-ready
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              Share your API docs and we&apos;ll have you live in 10 business days
            </p>
          </div>

          {formState === "sent" ? (
            <Card className="p-8 text-center bg-emerald-50 border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-emerald-900 mb-2">Message sent!</h3>
              <p className="text-emerald-700">
                We&apos;ll be in touch within one business day.
              </p>
            </Card>
          ) : (
            <Card className="p-8 bg-white border-slate-200">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Company name *
                    </label>
                    <Input id="company" name="company" required placeholder="Acme Inc." />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Your name *
                    </label>
                    <Input id="name" name="name" required placeholder="Jane Smith" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email *
                  </label>
                  <Input id="email" name="email" type="email" required placeholder="jane@acme.com" />
                </div>
                <div>
                  <label htmlFor="apiDocsUrl" className="block text-sm font-medium text-slate-700 mb-1.5">
                    API docs URL <span className="text-slate-400">(optional)</span>
                  </label>
                  <Input id="apiDocsUrl" name="apiDocsUrl" type="url" placeholder="https://docs.acme.com/api" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Message <span className="text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your app and what you're looking for..."
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 resize-none"
                  />
                </div>

                {formState === "error" && (
                  <p className="text-sm text-red-600">{formError}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-base"
                  disabled={formState === "sending"}
                >
                  {formState === "sending" ? (
                    "Sending..."
                  ) : (
                    <>
                      Get Started
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </Section>

      {/* ---- FOOTER ---- */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            Built by{" "}
            <a
              href="https://agenticledger.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-700 hover:text-emerald-600 transition-colors"
            >
              AgenticLedger
            </a>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#portfolio" className="hover:text-slate-700 transition-colors">Portfolio</a>
            <a
              href="https://github.com/agenticledger"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700 transition-colors"
            >
              GitHub
            </a>
            <a href="#contact" className="hover:text-slate-700 transition-colors">Contact</a>
          </div>
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} AgenticLedger. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
