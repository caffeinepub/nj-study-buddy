import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Shuffle,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface FlashcardData {
  id: number;
  front: string;
  back: string;
  subject: string;
  grade: string;
  hint?: string;
}

const ALL_FLASHCARDS: FlashcardData[] = [
  // Math - 3-5
  {
    id: 1,
    front: "What is 7 × 8?",
    back: "56\n\n🌟 Remember: 7 × 8 = 56. You can think of it as 7 × 8 = (7 × 10) − 14 = 56!",
    subject: "Math",
    grade: "3-5",
    hint: "Think of 7 × 4 doubled!",
  },
  {
    id: 2,
    front: "What is a fraction?",
    back: "A fraction represents part of a whole.\n\nExample: 1/4 means 1 part out of 4 equal parts 🍕",
    subject: "Math",
    grade: "3-5",
  },
  {
    id: 3,
    front: "What is the perimeter of a rectangle with length 5 and width 3?",
    back: "16 units!\n\nPerimeter = 2 × (length + width)\n= 2 × (5 + 3) = 2 × 8 = 16 📐",
    subject: "Math",
    grade: "3-5",
  },
  {
    id: 4,
    front: "What is 3/4 as a decimal?",
    back: "0.75\n\n3 ÷ 4 = 0.75\n\nTip: 3/4 means 75 cents out of a dollar! 💰",
    subject: "Math",
    grade: "3-5",
  },
  {
    id: 5,
    front: "What is the area of a square with side 6?",
    back: "36 square units!\n\nArea = side × side = 6 × 6 = 36 ⬜",
    subject: "Math",
    grade: "3-5",
  },
  // Math - 6-8
  {
    id: 6,
    front: "What is the formula for the area of a triangle?",
    back: "Area = (base × height) ÷ 2\n\nOr A = ½bh\n\nExample: base=8, height=5 → Area = 20 △",
    subject: "Math",
    grade: "6-8",
  },
  {
    id: 7,
    front: "Solve: 2x + 6 = 14",
    back: "x = 4\n\nStep 1: 2x = 14 − 6 = 8\nStep 2: x = 8 ÷ 2 = 4 ✅",
    subject: "Math",
    grade: "6-8",
  },
  {
    id: 8,
    front: "What is the Pythagorean Theorem?",
    back: "a² + b² = c²\n\nFor a right triangle with legs a and b, and hypotenuse c.\n\nExample: 3² + 4² = 9 + 16 = 25 = 5² 📐",
    subject: "Math",
    grade: "6-8",
  },
  // ELA - 3-5
  {
    id: 9,
    front: "What is a simile?",
    back: "A comparison using 'like' or 'as'\n\nExamples:\n• 'Fast as lightning ⚡'\n• 'Her smile was like sunshine 🌞'",
    subject: "ELA",
    grade: "3-5",
  },
  {
    id: 10,
    front: "What is the main idea of a passage?",
    back: "The main idea is what the passage is MOSTLY about!\n\n🔑 Tip: It's not just one detail — it's the BIG message the author wants to share.",
    subject: "ELA",
    grade: "3-5",
  },
  {
    id: 11,
    front: "What is a metaphor?",
    back: "A comparison WITHOUT using 'like' or 'as'\n\nExamples:\n• 'Life is a journey 🗺️'\n• 'The classroom was a zoo! 🦁'",
    subject: "ELA",
    grade: "6-8",
  },
  {
    id: 12,
    front: "What is textual evidence?",
    back: "Textual evidence is specific words, phrases, or sentences FROM THE TEXT that support your answer!\n\n📖 Always quote the text and explain it!",
    subject: "ELA",
    grade: "3-5",
  },
  // NJ History
  {
    id: 13,
    front: "What is the capital of New Jersey?",
    back: "Trenton! 🏛️\n\nTrenton has been NJ's capital since 1790. It's located on the Delaware River and has a population of about 90,000 people.",
    subject: "NJ History",
    grade: "3-5",
  },
  {
    id: 14,
    front: "What is New Jersey's state bird?",
    back: "The Eastern Goldfinch! 🐦💛\n\nAlso called the American Goldfinch. It was named NJ's state bird in 1935. Known for its bright yellow plumage!",
    subject: "NJ History",
    grade: "3-5",
  },
  {
    id: 15,
    front: "What is New Jersey's nickname?",
    back: "The Garden State! 🌸🌿\n\nNJ was called the Garden State because of its rich farmland, orchards, and gardens. The nickname dates back to the 1870s!",
    subject: "NJ History",
    grade: "3-5",
  },
  {
    id: 16,
    front: "What famous inventor was born in New Jersey?",
    back: "Thomas Edison! 💡\n\nEdison lived and worked in Menlo Park, NJ — where he invented the phonograph and improved the lightbulb. NJ is home to his famous laboratory!",
    subject: "NJ History",
    grade: "3-5",
  },
  {
    id: 17,
    front: "What are the three branches of NJ state government?",
    back: "Legislative (makes laws) 📜\nExecutive (Governor — carries out laws) 👩‍💼\nJudicial (courts — interprets laws) ⚖️\n\nJust like the federal government!",
    subject: "NJ History",
    grade: "6-8",
  },
  {
    id: 18,
    front: "Name 3 famous NJ landmarks",
    back: "🗽 Liberty State Park (view of Statue of Liberty)\n🏖️ Cape May (Historic beach town)\n🏀 Prudential Center (home of NJ Devils)\n🌊 Seaside Heights Boardwalk\n🏫 Princeton University",
    subject: "NJ History",
    grade: "3-5",
  },
  // Science
  {
    id: 19,
    front: "What is photosynthesis?",
    back: "Photosynthesis is how plants make their own food! 🌱\n\nUsing: sunlight + water + carbon dioxide\nThey produce: glucose (sugar) + oxygen\n\nFormula: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
    subject: "Science",
    grade: "3-5",
  },
  {
    id: 20,
    front: "What are the 3 states of matter?",
    back: "Solid 🧊 — definite shape and volume\nLiquid 💧 — definite volume, no fixed shape\nGas 💨 — no fixed shape or volume\n\nBonus: Plasma is the 4th state! ⚡",
    subject: "Science",
    grade: "3-5",
  },
  {
    id: 21,
    front: "What is the water cycle?",
    back: "The continuous movement of water! 💧\n\n1. Evaporation ☀️ — water becomes vapor\n2. Condensation 🌫️ — vapor becomes clouds\n3. Precipitation 🌧️ — rain, snow, sleet\n4. Collection — water returns to oceans/lakes",
    subject: "Science",
    grade: "3-5",
  },
  {
    id: 22,
    front: "What is Newton's First Law of Motion?",
    back: "An object at rest stays at rest, and an object in motion stays in motion — UNLESS acted on by an external force! 🚀\n\nAlso called the Law of Inertia!",
    subject: "Science",
    grade: "6-8",
  },
];

const SUBJECTS = ["All", "Math", "ELA", "NJ History", "Science"];
const GRADES = ["All", "K-2", "3-5", "6-8", "9-12"];

interface Props {
  gradeLevel: string;
}

export default function Flashcards({ gradeLevel }: Props) {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState(gradeLevel);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState<number[]>([]);
  const [needsReview, setNeedsReview] = useState<number[]>([]);

  const filtered = ALL_FLASHCARDS.filter((c) => {
    const subjectMatch =
      selectedSubject === "All" || c.subject === selectedSubject;
    const gradeMatch = selectedGrade === "All" || c.grade === selectedGrade;
    return subjectMatch && gradeMatch;
  });

  const current = filtered[currentIndex];
  const progress =
    filtered.length > 0 ? ((currentIndex + 1) / filtered.length) * 100 : 0;

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  function handleNext() {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filtered.length);
    }, 150);
  }

  function handlePrev() {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    }, 150);
  }

  function handleShuffle() {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * filtered.length));
  }

  function handleReset() {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMastered([]);
    setNeedsReview([]);
  }

  function markMastered() {
    if (current && !mastered.includes(current.id)) {
      setMastered((prev) => [...prev, current.id]);
    }
    handleNext();
  }

  function markReview() {
    if (current && !needsReview.includes(current.id)) {
      setNeedsReview((prev) => [...prev, current.id]);
    }
    handleNext();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-black mb-3">
          ✨ <span className="text-gradient">Flashcards</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Tap the card to flip it and see the answer! 🌸
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <Select
          value={selectedSubject}
          onValueChange={(v) => {
            setSelectedSubject(v);
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
        >
          <SelectTrigger
            data-ocid="flashcards.subject.select"
            className="w-36 rounded-full bg-white/80 border-border font-semibold text-sm"
          >
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            {SUBJECTS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedGrade}
          onValueChange={(v) => {
            setSelectedGrade(v);
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
        >
          <SelectTrigger
            data-ocid="flashcards.grade.select"
            className="w-32 rounded-full bg-white/80 border-border font-semibold text-sm"
          >
            <SelectValue placeholder="Grade" />
          </SelectTrigger>
          <SelectContent>
            {GRADES.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Badge className="bg-emerald-100 text-emerald-600 font-bold">
          ✅ {mastered.length} Mastered
        </Badge>
        <Badge className="bg-orange-100 text-orange-500 font-bold">
          🔄 {needsReview.length} Review
        </Badge>
        <Badge className="bg-primary/10 text-primary font-bold">
          📚 {filtered.length} Cards
        </Badge>
      </div>

      {/* Progress */}
      {filtered.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-1">
            <span>
              Card {currentIndex + 1} of {filtered.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress
            value={progress}
            className="h-2 rounded-full [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-secondary"
          />
        </div>
      )}

      {/* Flashcard */}
      {current ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <button
            type="button"
            data-ocid="flashcards.canvas_target"
            className="flip-card w-full cursor-pointer select-none"
            style={{ height: "320px" }}
            onClick={handleFlip}
            onKeyDown={(e) => e.key === "Enter" && handleFlip()}
          >
            <div
              className={`flip-card-inner w-full h-full relative ${isFlipped ? "flipped" : ""}`}
            >
              {/* Front */}
              <div className="flip-card-front absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl border border-border card-glow-purple flex flex-col items-center justify-center p-8 text-center">
                <Badge className="mb-4 bg-primary text-white font-bold">
                  {current.subject}
                </Badge>
                <p className="text-2xl font-black text-foreground leading-tight">
                  {current.front}
                </p>
                {current.hint && (
                  <p className="mt-4 text-sm text-muted-foreground italic">
                    💡 Hint: {current.hint}
                  </p>
                )}
                <p className="mt-6 text-xs text-muted-foreground">
                  Tap to reveal answer ✨
                </p>
              </div>

              {/* Back */}
              <div className="flip-card-back absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-3xl border border-border card-glow flex flex-col items-center justify-center p-8 text-center">
                <Badge className="mb-4 btn-pink text-white font-bold border-0">
                  Answer! 🌟
                </Badge>
                <p className="text-lg font-bold text-foreground whitespace-pre-line leading-relaxed">
                  {current.back}
                </p>
              </div>
            </div>
          </button>

          {/* Action buttons */}
          {isFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-center mt-4"
            >
              <Button
                data-ocid="flashcards.review.secondary_button"
                onClick={markReview}
                variant="outline"
                className="rounded-full border-orange-300 text-orange-500 hover:bg-orange-50"
              >
                <XCircle size={16} className="mr-1" /> Needs Review
              </Button>
              <Button
                data-ocid="flashcards.mastered.primary_button"
                onClick={markMastered}
                className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white border-0"
              >
                <CheckCircle2 size={16} className="mr-1" /> Got It! ✅
              </Button>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <div data-ocid="flashcards.empty_state" className="text-center py-16">
          <p className="text-2xl mb-3">🌸</p>
          <p className="text-lg font-bold text-muted-foreground">
            No flashcards for this filter
          </p>
          <p className="text-sm text-muted-foreground">
            Try selecting "All" to see all cards!
          </p>
        </div>
      )}

      {/* Navigation */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-center gap-3">
          <Button
            data-ocid="flashcards.prev.pagination_prev"
            onClick={handlePrev}
            variant="outline"
            size="icon"
            className="rounded-full border-border hover:bg-muted"
          >
            <ChevronLeft size={20} />
          </Button>

          <Button
            data-ocid="flashcards.shuffle.secondary_button"
            onClick={handleShuffle}
            variant="outline"
            className="rounded-full border-border hover:bg-muted"
          >
            <Shuffle size={16} className="mr-1" /> Shuffle
          </Button>

          <Button
            data-ocid="flashcards.reset.secondary_button"
            onClick={handleReset}
            variant="outline"
            className="rounded-full border-border hover:bg-muted"
          >
            <RotateCcw size={16} className="mr-1" /> Reset
          </Button>

          <Button
            data-ocid="flashcards.next.pagination_next"
            onClick={handleNext}
            variant="outline"
            size="icon"
            className="rounded-full border-border hover:bg-muted"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}
