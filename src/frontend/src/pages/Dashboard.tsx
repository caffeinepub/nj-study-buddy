import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Flame,
  FlipHorizontal,
  GraduationCap,
  Star,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: FlipHorizontal,
    title: "Flashcards & Quizzes",
    desc: "Flip cards and test yourself with fun NJ-themed questions!",
    color: "from-bloom-lavender to-bloom-purple/10",
    iconColor: "text-primary",
  },
  {
    icon: GraduationCap,
    title: "NJ State Tests",
    desc: "Prep for NJSLA, NJGPA, PSAT, SAT, and more!",
    color: "from-bloom-pink to-bloom-hotpink/10",
    iconColor: "text-secondary",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    desc: "Watch your learning streak grow day by day! 🔥",
    color: "from-bloom-mint to-bloom-aqua/30",
    iconColor: "text-emerald-500",
  },
  {
    icon: BookOpen,
    title: "Diverse Subjects",
    desc: "Math, ELA, Science, Social Studies, NJ History & more!",
    color: "from-bloom-peach to-bloom-softpink/30",
    iconColor: "text-orange-400",
  },
];

const SUBJECTS = [
  { emoji: "🔢", name: "Math", color: "bg-bloom-lavender", subject: "Math" },
  { emoji: "📖", name: "English/ELA", color: "bg-bloom-pink", subject: "ELA" },
  { emoji: "🔬", name: "Science", color: "bg-bloom-mint", subject: "Science" },
  {
    emoji: "🌍",
    name: "Social Studies",
    color: "bg-bloom-aqua",
    subject: "Social Studies",
  },
  {
    emoji: "🗺️",
    name: "NJ History",
    color: "bg-bloom-peach",
    subject: "NJ History",
  },
];

const PROGRESS_DATA = [
  { subject: "Math", progress: 72, color: "[&>div]:bg-primary" },
  { subject: "English/ELA", progress: 85, color: "[&>div]:bg-secondary" },
  { subject: "Science", progress: 60, color: "[&>div]:bg-emerald-400" },
  { subject: "NJ History", progress: 45, color: "[&>div]:bg-orange-400" },
];

const STREAK_DAYS = [1, 2, 3, 4, 5, 6, 7];

interface Props {
  gradeLevel: string;
}

export default function Dashboard({ gradeLevel }: Props) {
  const gradeName =
    {
      "K-2": "K-2nd Grade",
      "3-5": "3rd-5th Grade",
      "6-8": "6th-8th Grade",
      "9-12": "9th-12th Grade",
    }[gradeLevel] ?? gradeLevel;
  const currentStreak = 5;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 mb-4 shadow-xs border border-border">
          <span className="text-sm font-semibold text-primary">
            🌸 {gradeName} Student
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
          Boost Your Learning,{" "}
          <span className="text-gradient">Garden State!</span> 🌺
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Fun Study Tools for NJSLA, NJGPA, and All NJ Grade Levels. You&apos;re
          going to do amazing! 💪
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/flashcards">
            <Button
              data-ocid="hero.start_studying.primary_button"
              size="lg"
              className="btn-primary text-white rounded-full px-8 py-6 text-lg font-bold shadow-purple hover:scale-105 transition-transform border-0"
            >
              ✨ Start Studying Now!
            </Button>
          </Link>
          <Link to="/subjects">
            <Button
              data-ocid="hero.explore_subjects.secondary_button"
              size="lg"
              variant="outline"
              className="btn-pink text-white rounded-full px-8 py-6 text-lg font-bold shadow-bloom hover:scale-105 transition-transform border-0"
            >
              🌸 Explore Subjects
            </Button>
          </Link>
        </div>

        {/* NJ silhouette decoration */}
        <div className="mt-8 flex justify-center">
          <div className="relative">
            <div className="w-48 h-20 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl flex items-center justify-center gap-4 border border-border/50">
              <span className="text-3xl animate-float">🏫</span>
              <div className="text-left">
                <div className="text-xs font-bold text-primary">NEW JERSEY</div>
                <div className="text-xs text-muted-foreground">
                  Garden State 🌸
                </div>
              </div>
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Feature cards */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-black text-center mb-6">
          ✨ Everything You Need to Succeed!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Card
                  className={`bg-gradient-to-br ${feature.color} border-border card-glow h-full`}
                >
                  <CardContent className="p-5">
                    <div
                      className={`w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center mb-3 shadow-xs ${feature.iconColor}`}
                    >
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Subjects quick access */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black">📚 Study Subjects</h2>
          <Link to="/subjects">
            <Button
              data-ocid="dashboard.subjects.secondary_button"
              variant="ghost"
              size="sm"
              className="text-primary font-semibold"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {SUBJECTS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.07 }}
            >
              <Link to="/subjects">
                <div
                  data-ocid={`subjects.item.${i + 1}`}
                  className={`${s.color} rounded-2xl p-5 text-center cursor-pointer hover:scale-105 transition-all duration-200 shadow-xs hover:shadow-bloom border border-white/50`}
                >
                  <div className="text-4xl mb-2">{s.emoji}</div>
                  <div className="text-sm font-bold text-foreground">
                    {s.name}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Progress + Streak section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
      >
        {/* NJ Test prep CTA */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-border card-glow-purple">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">📝</div>
              <div className="flex-1">
                <h3 className="text-xl font-black mb-2 text-gradient">
                  Practice for Success!
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  New Jersey students take the <strong>NJSLA</strong> and{" "}
                  <strong>NJGPA</strong> — let&apos;s get you ready! Prep
                  materials for every grade, every subject.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["NJSLA", "NJGPA", "PSAT", "SAT", "NJ Science"].map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="bg-white/80 text-primary font-semibold"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
                <Link to="/tests">
                  <Button
                    data-ocid="dashboard.tests.primary_button"
                    className="btn-primary text-white rounded-full border-0 shadow-purple"
                  >
                    View NJ Tests <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress summary */}
        <Card className="bg-white/80 border-border card-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black">🌟 My Learning Journey</h3>
              <div className="flex items-center gap-1.5 bg-orange-100 text-orange-500 rounded-full px-3 py-1">
                <Flame size={16} />
                <span className="font-bold text-sm">
                  {currentStreak} day streak!
                </span>
              </div>
            </div>

            {/* Daily streak */}
            <div className="flex gap-2 mb-5">
              {STREAK_DAYS.map((day) => (
                <div
                  key={day}
                  data-ocid={`progress.streak.item.${day}`}
                  className={`flex-1 aspect-square rounded-full flex items-center justify-center text-xs font-bold ${
                    day <= currentStreak
                      ? "bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-xs"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Subject progress bars */}
            <div className="space-y-3">
              {PROGRESS_DATA.map((p) => (
                <div key={p.subject}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>{p.subject}</span>
                    <span className="text-muted-foreground">{p.progress}%</span>
                  </div>
                  <Progress
                    value={p.progress}
                    className={`h-2.5 rounded-full ${p.color}`}
                  />
                </div>
              ))}
            </div>

            <Link to="/progress">
              <Button
                data-ocid="dashboard.progress.secondary_button"
                variant="ghost"
                size="sm"
                className="mt-4 text-primary font-semibold"
              >
                Full Report <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.section>

      {/* Motivational banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-white text-center shadow-purple"
      >
        <Trophy size={40} className="mx-auto mb-3 text-yellow-300" />
        <h3 className="text-2xl font-black mb-2">
          You&apos;re Doing Amazing! ⭐
        </h3>
        <p className="text-white/90">
          Every question you practice brings you closer to acing your NJ tests.
          Keep it up — Garden State students never give up! 💜
        </p>
      </motion.div>
    </div>
  );
}
