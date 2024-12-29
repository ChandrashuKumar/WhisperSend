import type { Metadata } from "next";
import AuthProvider from "@/context/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhisperSend",
  description: "Anonymous messages sending application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
      <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
        <AuthProvider>
            {children}
            <Toaster />
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
