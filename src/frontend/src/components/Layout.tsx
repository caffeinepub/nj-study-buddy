import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  FlipHorizontal,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

const GRADE_LEVELS = [
  { value: "K-2", label: "K-2nd" },
  { value: "3-5", label: "3rd-5th" },
  { value: "6-8", label: "6th-8th" },
  { value: "9-12", label: "9th-12th" },
];

const NAV_LINKS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/subjects", label: "Subjects", icon: BookOpen },
  { to: "/tests", label: "NJ Tests", icon: GraduationCap },
  { to: "/flashcards", label: "Flashcards", icon: FlipHorizontal },
  { to: "/progress", label: "My Progress", icon: BarChart3 },
];

interface LayoutProps {
  children: React.ReactNode;
  gradeLevel: string;
  onGradeChange: (grade: string) => void;
}

export default function Layout({
  children,
  gradeLevel,
  onGradeChange,
}: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-xs">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            data-ocid="nav.link"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-bloom">
              <span className="text-xl">🌸</span>
            </div>
            <div className="leading-tight">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                NJ
              </div>
              <div className="text-lg font-black text-gradient leading-none">
                Study Bloom
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`nav.${link.label.toLowerCase().replace(/ /g, "_")}.link`}
                  className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Grade selector + mobile menu */}
          <div className="flex items-center gap-2">
            <Select value={gradeLevel} onValueChange={onGradeChange}>
              <SelectTrigger
                data-ocid="nav.grade.select"
                className="w-28 rounded-full bg-primary text-primary-foreground border-0 font-semibold text-xs shadow-purple"
              >
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                {GRADE_LEVELS.map((g) => (
                  <SelectItem key={g.value} value={g.value}>
                    {g.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <button
              type="button"
              className="md:hidden p-2 rounded-full hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-ocid="nav.menu.toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white/95 backdrop-blur-md">
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = currentPath === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    data-ocid={`mobile.nav.${link.label.toLowerCase().replace(/ /g, "_")}.link`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon size={18} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Decorative sparkles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
        <Sparkles
          className="absolute top-20 left-10 text-primary/10"
          size={40}
        />
        <Sparkles
          className="absolute top-40 right-20 text-secondary/10"
          size={32}
        />
        <Sparkles
          className="absolute bottom-40 left-1/4 text-primary/10"
          size={28}
        />
        <Sparkles
          className="absolute bottom-20 right-1/3 text-secondary/10"
          size={36}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 relative z-10">{children}</main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/60 backdrop-blur-sm border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
            <span>🌸 Handcrafted for NJ Students — Garden State Proud! 🌸</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with 💜 using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
