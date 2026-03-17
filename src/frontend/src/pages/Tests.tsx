import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, Clock, Target } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const NJ_TESTS = [
  {
    id: "njsla-ela",
    name: "NJSLA ELA",
    full: "NJ Student Learning Assessment — English Language Arts",
    grades: ["3-5", "6-8"],
    gradeList: "Grades 3–9",
    emoji: "📖",
    color: "from-bloom-pink to-bloom-softpink/30",
    desc: "Tests reading comprehension, writing, vocabulary, and literary analysis aligned with NJ Learning Standards.",
    topics: [
      "Reading Informational Text",
      "Reading Literature",
      "Writing Narratives",
      "Writing Arguments",
      "Language & Vocabulary",
      "Research & Evidence",
    ],
    tips: [
      "Read every day for at least 20 minutes",
      "Practice writing with strong topic sentences",
      "Learn 5 new vocabulary words each week",
      "Answer questions using text evidence",
    ],
    time: "2-3 sessions",
    format: "Performance Tasks + Computer-Based",
  },
  {
    id: "njsla-math",
    name: "NJSLA Math",
    full: "NJ Student Learning Assessment — Mathematics",
    grades: ["3-5", "6-8"],
    gradeList: "Grades 3–8",
    emoji: "🔢",
    color: "from-bloom-lavender to-bloom-purple/20",
    desc: "Covers mathematical concepts, problem-solving, and reasoning aligned with NJ Math Standards.",
    topics: [
      "Operations & Algebraic Thinking",
      "Number & Operations",
      "Fractions & Decimals",
      "Geometry",
      "Measurement & Data",
      "Statistics & Probability",
    ],
    tips: [
      "Show all your work — partial credit counts!",
      "Practice mental math every day",
      "Memorize multiplication tables through 12",
      "Use drawings to solve word problems",
    ],
    time: "2-3 sessions",
    format: "Computer-Based + Paper",
  },
  {
    id: "njgpa",
    name: "NJGPA",
    full: "NJ Graduation Proficiency Assessment",
    grades: ["9-12"],
    gradeList: "Grade 11",
    emoji: "🎓",
    color: "from-purple-100 to-bloom-lavender",
    desc: "Required for NJ high school graduation — tests ELA and Math skills needed for college and career readiness.",
    topics: [
      "Literary Analysis",
      "Argumentative Writing",
      "Algebra I & II",
      "Geometry",
      "Data Analysis",
      "Research Simulation",
    ],
    tips: [
      "Practice timed writing under test conditions",
      "Review Algebra I and II thoroughly",
      "Take practice tests to build stamina",
      "Know how to cite textual evidence",
    ],
    time: "Multiple sessions",
    format: "Computer-Based Performance Tasks",
  },
  {
    id: "nj-science",
    name: "NJ Science Assessment",
    full: "New Jersey Science Assessment (NJSA)",
    grades: ["3-5", "6-8", "9-12"],
    gradeList: "Grades 5, 8, 11",
    emoji: "🔬",
    color: "from-bloom-mint to-emerald-100",
    desc: "Assesses science knowledge and practices aligned with New Jersey's Next Generation Science Standards (NJNGSS).",
    topics: [
      "Life Science",
      "Earth & Space Science",
      "Physical Science",
      "Engineering Practices",
      "Scientific Inquiry",
      "Environmental Science",
    ],
    tips: [
      "Understand concepts, not just facts",
      "Practice describing experiments",
      "Learn the scientific method",
      "Review data interpretation skills",
    ],
    time: "1-2 sessions",
    format: "Computer-Based",
  },
  {
    id: "us-history",
    name: "US History NJSLA",
    full: "NJSLA US History",
    grades: ["9-12"],
    gradeList: "Grade 11",
    emoji: "🗽",
    color: "from-bloom-aqua to-sky-100",
    desc: "Covers US History from colonization through the modern era, with emphasis on NJ's role in national history.",
    topics: [
      "Colonial Era",
      "American Revolution",
      "Civil War & Reconstruction",
      "Industrial Revolution",
      "World Wars",
      "Civil Rights Movement",
    ],
    tips: [
      "Make a timeline of major US events",
      "Study primary source documents",
      "Connect NJ events to national history",
      "Practice writing historical essays",
    ],
    time: "1-2 sessions",
    format: "Computer-Based Performance Tasks",
  },
  {
    id: "psat",
    name: "PSAT/NMSQT",
    full: "Preliminary SAT / National Merit Scholarship Qualifying Test",
    grades: ["9-12"],
    gradeList: "Grades 10–11",
    emoji: "⭐",
    color: "from-bloom-peach to-orange-100",
    desc: "Prep test for the SAT — tests reading, writing, and math. Qualifies students for National Merit Scholarships!",
    topics: [
      "Reading Comprehension",
      "Writing & Language",
      "Math (No Calculator)",
      "Math (Calculator)",
      "Vocabulary in Context",
      "Data Analysis",
    ],
    tips: [
      "Take official practice tests from College Board",
      "Build vocabulary with flashcards",
      "Master heart of algebra topics",
      "Read diverse types of passages daily",
    ],
    time: "2 hours 45 minutes",
    format: "Paper-Based",
  },
  {
    id: "sat",
    name: "SAT School Day",
    full: "SAT — College Admissions Test",
    grades: ["9-12"],
    gradeList: "Grade 11",
    emoji: "🏆",
    color: "from-yellow-100 to-bloom-peach",
    desc: "The major college admissions test — NJ students take it free on a school day in 11th grade!",
    topics: [
      "Reading & Writing",
      "Math — Algebra",
      "Math — Advanced Topics",
      "Problem-Solving & Data Analysis",
      "Passport to Advanced Math",
    ],
    tips: [
      "Digital SAT format — practice on Khan Academy",
      "Pace yourself — 2 modules of each section",
      "Use process of elimination",
      "Double-check your answers if time allows",
    ],
    time: "2 hours 14 minutes",
    format: "Digital (Computer-Based)",
  },
  {
    id: "psat89",
    name: "PSAT 8/9",
    full: "PSAT for 8th and 9th Graders",
    grades: ["6-8", "9-12"],
    gradeList: "Grades 8–9",
    emoji: "📐",
    color: "from-bloom-sky to-blue-100",
    desc: "Early SAT practice that helps you identify strengths and prep for high school standardized tests.",
    topics: [
      "Reading Comprehension",
      "Writing & Grammar",
      "Math Foundations",
      "Problem Solving",
    ],
    tips: [
      "Great practice for future PSAT/SAT",
      "Focus on grammar rules",
      "Review fractions and ratios",
      "Don't stress — it's just for practice!",
    ],
    time: "2 hours 25 minutes",
    format: "Paper-Based",
  },
];

const GRADE_FILTERS = [
  { value: "all", label: "All Tests" },
  { value: "3-5", label: "3rd–5th" },
  { value: "6-8", label: "6th–8th" },
  { value: "9-12", label: "9th–12th" },
];

interface Props {
  gradeLevel: string;
}

export default function Tests({ gradeLevel }: Props) {
  const [filter, setFilter] = useState(gradeLevel);
  const [expanded, setExpanded] = useState<string | null>("njsla-ela");

  const filtered = NJ_TESTS.filter(
    (t) => filter === "all" || t.grades.includes(filter),
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-black mb-3">
          📝 <span className="text-gradient">NJ State Tests</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Prep for every New Jersey assessment — you&apos;ve got this! 🌟
        </p>
      </motion.div>

      {/* Grade filter */}
      <div className="flex justify-center mb-8">
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="bg-white/80 border border-border rounded-full p-1">
            {GRADE_FILTERS.map((f) => (
              <TabsTrigger
                key={f.value}
                value={f.value}
                data-ocid={`tests.${f.value.replace("-", "_")}.tab`}
                className="rounded-full text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {f.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {filtered.map((test, i) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            data-ocid={`tests.item.${i + 1}`}
          >
            <Card
              className={`bg-gradient-to-br ${test.color} border-border card-glow overflow-hidden cursor-pointer`}
              onClick={() => setExpanded(expanded === test.id ? null : test.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{test.emoji}</div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg font-black">{test.name}</span>
                        <Badge
                          variant="secondary"
                          className="bg-white/70 text-primary font-bold text-xs"
                        >
                          {test.gradeList}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground font-normal mt-0.5">
                        {test.full}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                    <div className="hidden sm:flex items-center gap-1">
                      <Clock size={12} />
                      {test.time}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>

              {expanded === test.id && (
                <CardContent className="pt-0">
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p className="text-sm text-muted-foreground mb-4">
                      {test.desc}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold mb-2">
                          <Target size={12} className="text-primary" /> Topics
                          Covered
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {test.topics.map((t) => (
                            <span
                              key={t}
                              className="text-xs bg-white/70 rounded-full px-2.5 py-1 font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold mb-2">
                          <CheckCircle2
                            size={12}
                            className="text-emerald-500"
                          />{" "}
                          Study Tips
                        </div>
                        <ul className="space-y-1">
                          {test.tips.map((tip) => (
                            <li
                              key={tip}
                              className="text-xs flex items-start gap-2"
                            >
                              <span className="text-emerald-500 shrink-0">
                                ✓
                              </span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 bg-white/50 rounded-xl p-3">
                      <BookOpen size={14} />
                      <span>
                        <strong>Format:</strong> {test.format}
                      </span>
                      <span className="mx-2">•</span>
                      <Clock size={14} />
                      <span>
                        <strong>Time:</strong> {test.time}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Link to="/flashcards">
                        <Button
                          data-ocid={`tests.flashcards_${i + 1}.primary_button`}
                          size="sm"
                          className="btn-primary text-white rounded-full border-0"
                        >
                          ✨ Study Flashcards
                        </Button>
                      </Link>
                      <Link to="/subjects">
                        <Button
                          data-ocid={`tests.subjects_${i + 1}.secondary_button`}
                          size="sm"
                          variant="outline"
                          className="rounded-full border-primary/30 text-primary"
                        >
                          📚 View Subjects
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          data-ocid="tests.empty_state"
          className="text-center py-16 text-muted-foreground"
        >
          <p className="text-lg font-semibold">
            No tests found for this grade level
          </p>
        </div>
      )}
    </div>
  );
}
