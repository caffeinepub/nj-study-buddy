import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { BookOpen, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const GRADE_TABS = [
  { value: "all", label: "All Grades" },
  { value: "K-2", label: "K–2nd" },
  { value: "3-5", label: "3rd–5th" },
  { value: "6-8", label: "6th–8th" },
  { value: "9-12", label: "9th–12th" },
];

interface SubjectItem {
  emoji: string;
  name: string;
  desc: string;
  color: string;
  grades: string[];
  topics: string[];
  tests: string[];
}

const SUBJECTS: SubjectItem[] = [
  {
    emoji: "🔢",
    name: "Mathematics",
    desc: "Numbers, algebra, geometry, data, and more — mastered step by step!",
    color: "from-bloom-lavender to-bloom-purple/20",
    grades: ["K-2", "3-5", "6-8", "9-12"],
    topics: [
      "Addition & Subtraction",
      "Multiplication & Division",
      "Fractions",
      "Geometry",
      "Algebra",
      "Statistics",
    ],
    tests: ["NJSLA Math", "NJGPA Math", "PSAT", "SAT"],
  },
  {
    emoji: "📖",
    name: "English Language Arts",
    desc: "Reading, writing, vocabulary, and comprehension skills for every grade!",
    color: "from-bloom-pink to-bloom-softpink/30",
    grades: ["K-2", "3-5", "6-8", "9-12"],
    topics: [
      "Reading Comprehension",
      "Writing",
      "Vocabulary",
      "Grammar",
      "Poetry",
      "Literary Analysis",
    ],
    tests: ["NJSLA ELA", "NJGPA ELA", "PSAT", "SAT"],
  },
  {
    emoji: "🔬",
    name: "Science",
    desc: "Explore life science, earth science, chemistry, and physics!",
    color: "from-bloom-mint to-emerald-100",
    grades: ["K-2", "3-5", "6-8", "9-12"],
    topics: [
      "Life Science",
      "Earth Science",
      "Physical Science",
      "Chemistry",
      "Biology",
      "Environmental Science",
    ],
    tests: ["NJ Science Assessment (Grades 5, 8, 11)"],
  },
  {
    emoji: "🌍",
    name: "Social Studies",
    desc: "History, government, economics, and world cultures!",
    color: "from-bloom-aqua to-sky-100",
    grades: ["K-2", "3-5", "6-8", "9-12"],
    topics: [
      "US History",
      "World History",
      "Government & Civics",
      "Economics",
      "Geography",
    ],
    tests: ["US History NJSLA"],
  },
  {
    emoji: "🗺️",
    name: "NJ History & Geography",
    desc: "Learn about the great Garden State — its history, landmarks, and people!",
    color: "from-bloom-peach to-orange-100",
    grades: ["K-2", "3-5", "6-8", "9-12"],
    topics: [
      "NJ State Capital",
      "NJ Landmarks",
      "NJ Government",
      "Famous NJ People",
      "NJ Counties",
      "NJ Wildlife",
    ],
    tests: ["NJ History Standards"],
  },
  {
    emoji: "🎨",
    name: "Arts & Music",
    desc: "Express yourself through visual arts, music, and creative exploration!",
    color: "from-pink-100 to-purple-100",
    grades: ["K-2", "3-5", "6-8"],
    topics: [
      "Visual Arts",
      "Music Theory",
      "Art History",
      "Creative Expression",
    ],
    tests: [],
  },
];

interface Props {
  gradeLevel: string;
}

export default function Subjects({ gradeLevel }: Props) {
  const [selectedGrade, setSelectedGrade] = useState(gradeLevel);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const filtered = SUBJECTS.filter(
    (s) => selectedGrade === "all" || s.grades.includes(selectedGrade),
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-black mb-3">
          📚 <span className="text-gradient">Study Subjects</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Pick a subject and start learning — NJ-aligned content for every
          grade!
        </p>
      </motion.div>

      {/* Grade filter */}
      <div className="flex justify-center mb-8">
        <Tabs value={selectedGrade} onValueChange={setSelectedGrade}>
          <TabsList className="bg-white/80 border border-border rounded-full p-1 gap-1">
            {GRADE_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                data-ocid={`subjects.${tab.value.replace("-", "_")}.tab`}
                className="rounded-full text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Subject cards */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((subject, i) => (
            <motion.div
              key={subject.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              data-ocid={`subjects.item.${i + 1}`}
            >
              <Card
                className={`bg-gradient-to-br ${subject.color} border-border card-glow cursor-pointer hover:scale-[1.02] transition-all duration-200`}
                onClick={() =>
                  setExpandedSubject(
                    expandedSubject === subject.name ? null : subject.name,
                  )
                }
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{subject.emoji}</span>
                      <div>
                        <div className="text-base font-black">
                          {subject.name}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {subject.grades.map((g) => (
                            <Badge
                              key={g}
                              variant="secondary"
                              className="text-[10px] bg-white/60 font-semibold"
                            >
                              {g}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      size={18}
                      className={`text-muted-foreground transition-transform ${
                        expandedSubject === subject.name ? "rotate-90" : ""
                      }`}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    {subject.desc}
                  </p>

                  <AnimatePresence>
                    {expandedSubject === subject.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/50 pt-3 mb-3">
                          <div className="text-xs font-bold text-foreground mb-2">
                            📋 Topics Covered:
                          </div>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {subject.topics.map((t) => (
                              <span
                                key={t}
                                className="text-xs bg-white/70 rounded-full px-2.5 py-1 font-medium"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          {subject.tests.length > 0 && (
                            <>
                              <div className="text-xs font-bold text-foreground mb-2">
                                📝 NJ Tests:
                              </div>
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {subject.tests.map((t) => (
                                  <Badge
                                    key={t}
                                    className="bg-primary/10 text-primary text-[10px] font-semibold"
                                  >
                                    {t}
                                  </Badge>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Link to="/flashcards">
                            <Button
                              data-ocid={`subjects.flashcards_${i + 1}.primary_button`}
                              size="sm"
                              className="btn-primary text-white rounded-full border-0 text-xs"
                            >
                              ✨ Flashcards
                            </Button>
                          </Link>
                          <Link to="/tests">
                            <Button
                              data-ocid={`subjects.tests_${i + 1}.secondary_button`}
                              size="sm"
                              variant="outline"
                              className="rounded-full text-xs border-primary/30 text-primary"
                            >
                              📝 Test Prep
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div
          data-ocid="subjects.empty_state"
          className="text-center py-16 text-muted-foreground"
        >
          <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-semibold">
            No subjects found for this grade level
          </p>
        </div>
      )}
    </div>
  );
}
