import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Clock,
  Flame,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const STREAK_DAYS = 14;
const ALL_DAYS = Array.from({ length: 14 }, (_, i) => i + 1);

const SUBJECT_PROGRESS = [
  {
    subject: "Mathematics",
    emoji: "🔢",
    progress: 72,
    sessions: 8,
    color: "[&>div]:bg-primary",
  },
  {
    subject: "English/ELA",
    emoji: "📖",
    progress: 85,
    sessions: 12,
    color: "[&>div]:bg-secondary",
  },
  {
    subject: "Science",
    emoji: "🔬",
    progress: 60,
    sessions: 6,
    color: "[&>div]:bg-emerald-400",
  },
  {
    subject: "Social Studies",
    emoji: "🌍",
    progress: 55,
    sessions: 5,
    color: "[&>div]:bg-sky-400",
  },
  {
    subject: "NJ History",
    emoji: "🗺️",
    progress: 45,
    sessions: 4,
    color: "[&>div]:bg-orange-400",
  },
];

const QUIZ_SCORES = [
  { subject: "Math - Fractions", score: 90, date: "Mar 15", emoji: "🔢" },
  { subject: "ELA - Vocabulary", score: 95, date: "Mar 14", emoji: "📖" },
  { subject: "NJ History - Capitals", score: 100, date: "Mar 13", emoji: "🗺️" },
  { subject: "Science - Water Cycle", score: 80, date: "Mar 12", emoji: "🔬" },
  { subject: "Math - Geometry", score: 85, date: "Mar 11", emoji: "📐" },
  { subject: "ELA - Main Idea", score: 75, date: "Mar 10", emoji: "📖" },
];

const ACHIEVEMENTS = [
  {
    title: "First Flashcard!",
    desc: "Completed your first flashcard session",
    emoji: "✨",
    earned: true,
  },
  {
    title: "5-Day Streak!",
    desc: "Studied 5 days in a row",
    emoji: "🔥",
    earned: true,
  },
  {
    title: "NJ Expert",
    desc: "Mastered all NJ History flashcards",
    emoji: "🗺️",
    earned: true,
  },
  {
    title: "Math Star",
    desc: "Scored 100% on a Math quiz",
    emoji: "⭐",
    earned: false,
  },
  {
    title: "NJSLA Ready",
    desc: "Complete all NJSLA prep materials",
    emoji: "📝",
    earned: false,
  },
  {
    title: "2-Week Champion",
    desc: "Study for 14 days in a row",
    emoji: "🏆",
    earned: false,
  },
];

const DAILY_GOAL_MINUTES = 45;
const TODAY_MINUTES = 32;

export default function ProgressPage() {
  const dailyProgress = Math.round((TODAY_MINUTES / DAILY_GOAL_MINUTES) * 100);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-black mb-3">
          🌟 <span className="text-gradient">My Learning Journey</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Look how far you&apos;ve come! Keep up the amazing work! 💜
        </p>
      </motion.div>

      {/* Top stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {[
          {
            icon: Flame,
            label: "Day Streak",
            value: `${STREAK_DAYS} 🔥`,
            color: "from-orange-100 to-orange-50",
            iconColor: "text-orange-500",
          },
          {
            icon: Clock,
            label: "Today's Study",
            value: `${TODAY_MINUTES} min`,
            color: "from-bloom-lavender to-white",
            iconColor: "text-primary",
          },
          {
            icon: Target,
            label: "Daily Goal",
            value: `${DAILY_GOAL_MINUTES} min`,
            color: "from-bloom-pink to-white",
            iconColor: "text-secondary",
          },
          {
            icon: Trophy,
            label: "Achievements",
            value: "3 earned 🏆",
            color: "from-yellow-100 to-white",
            iconColor: "text-yellow-500",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <Card
                className={`bg-gradient-to-br ${stat.color} border-border card-glow`}
              >
                <CardContent className="p-4 text-center">
                  <Icon
                    size={24}
                    className={`${stat.iconColor} mx-auto mb-2`}
                  />
                  <div className="text-2xl font-black">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-semibold">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily goal */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/80 border-border card-glow h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                Today&apos;s Study Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span>{TODAY_MINUTES} minutes studied</span>
                <span className="text-muted-foreground">
                  Goal: {DAILY_GOAL_MINUTES} min
                </span>
              </div>
              <Progress
                data-ocid="progress.daily_goal.loading_state"
                value={dailyProgress}
                className="h-4 rounded-full [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-secondary mb-3"
              />
              <p className="text-sm text-muted-foreground">
                {dailyProgress >= 100
                  ? "🎉 Daily goal complete! You're amazing!"
                  : `You're ${dailyProgress}% there — ${DAILY_GOAL_MINUTES - TODAY_MINUTES} more minutes to reach your goal! 💪`}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Streak tracker */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/80 border-border card-glow h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame size={20} className="text-orange-500" />
                Study Streak — {STREAK_DAYS} Days! 🔥
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-3">
                {ALL_DAYS.map((day) => (
                  <div
                    key={day}
                    data-ocid={`progress.streak.item.${day}`}
                    className={`aspect-square rounded-full flex items-center justify-center text-xs font-bold ${
                      day <= STREAK_DAYS
                        ? "bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-xs"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                🌟 Amazing! You&apos;ve studied {STREAK_DAYS} days in a row!
                Keep going!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Subject progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-white/80 border-border card-glow mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen size={20} className="text-primary" />
              Subject Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {SUBJECT_PROGRESS.map((s, i) => (
                <motion.div
                  key={s.subject}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  data-ocid={`progress.subject.item.${i + 1}`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{s.emoji}</span>
                      <span className="font-semibold text-sm">{s.subject}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {s.sessions} sessions
                      </span>
                      <Badge
                        variant="secondary"
                        className={`font-bold text-xs ${
                          s.progress >= 80
                            ? "bg-emerald-100 text-emerald-600"
                            : s.progress >= 60
                              ? "bg-primary/10 text-primary"
                              : "bg-orange-100 text-orange-500"
                        }`}
                      >
                        {s.progress}%
                      </Badge>
                    </div>
                  </div>
                  <Progress
                    value={s.progress}
                    className={`h-3 rounded-full ${s.color}`}
                  />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent quiz scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white/80 border-border card-glow mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star size={20} className="text-yellow-500" />
              Recent Quiz Scores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {QUIZ_SCORES.map((score, i) => (
                <div
                  key={score.subject}
                  data-ocid={`progress.quiz.item.${i + 1}`}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-xl"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{score.emoji}</span>
                    <div>
                      <div className="font-semibold text-sm">
                        {score.subject}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {score.date}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-lg font-black ${
                      score.score === 100
                        ? "text-emerald-500"
                        : score.score >= 80
                          ? "text-primary"
                          : "text-orange-500"
                    }`}
                  >
                    {score.score}%{score.score === 100 && " 🏆"}
                    {score.score >= 90 && score.score < 100 && " ⭐"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-border card-glow-purple">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap size={20} className="text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ACHIEVEMENTS.map((a, i) => (
                <div
                  key={a.title}
                  data-ocid={`progress.achievement.item.${i + 1}`}
                  className={`p-3 rounded-xl border transition-all ${
                    a.earned
                      ? "bg-white/80 border-primary/20 shadow-xs"
                      : "bg-white/30 border-border opacity-50"
                  }`}
                >
                  <div className="text-2xl mb-1">{a.emoji}</div>
                  <div className="font-bold text-sm">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.desc}</div>
                  {a.earned && (
                    <Badge className="mt-2 bg-emerald-100 text-emerald-600 text-[10px] font-bold">
                      ✅ Earned!
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
