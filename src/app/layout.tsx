import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent Ready by AgenticLedger — Make Your App Accessible to Every AI Agent",
  description:
    "Get your app usable from Claude, ChatGPT, Gemini, Grok & any AI agent in 10 business days. We build the MCP server, demo agent, and docs.",
  metadataBase: new URL("https://agentready.agenticledger.ai"),
  alternates: {
    canonical: "https://agentready.agenticledger.ai",
  },
  openGraph: {
    title: "Agent Ready by AgenticLedger — Make Your App Accessible to Every AI Agent",
    description:
      "Get your app usable from Claude, ChatGPT, Gemini, Grok & any AI agent in 10 business days. We build the MCP server, demo agent, and docs.",
    url: "https://agentready.agenticledger.ai",
    siteName: "Agent Ready by AgenticLedger",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent Ready by AgenticLedger",
    description:
      "Get your app usable from Claude, ChatGPT, Gemini, Grok & any AI agent in 10 business days.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "AgenticLedger",
      url: "https://agenticledger.ai",
      sameAs: ["https://github.com/agenticledger"],
    },
    {
      "@type": "WebSite",
      name: "Agent Ready by AgenticLedger",
      url: "https://agentready.agenticledger.ai",
    },
    {
      "@type": "Service",
      name: "Agent Ready",
      provider: {
        "@type": "Organization",
        name: "AgenticLedger",
      },
      description:
        "Make any business app accessible from AI agents in 10 business days. We build MCP servers, demo agents, interactive docs, and deploy everything.",
      serviceType: "AI Integration Service",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
