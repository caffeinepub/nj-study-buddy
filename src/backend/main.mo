import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Principal "mo:core/Principal";

actor {
  type Subject = {
    name : Text;
    gradeLevel : Text;
    testCategory : ?Text;
  };

  module Subject {
    public func compare(subject1 : Subject, subject2 : Subject) : Order.Order {
      switch (Text.compare(subject1.name, subject2.name)) {
        case (#equal) { Text.compare(subject1.gradeLevel, subject2.gradeLevel) };
        case (order) { order };
      };
    };
  };

  type Flashcard = {
    id : Nat;
    front : Text;
    back : Text;
    subject : Text;
    gradeLevel : Text;
    testCategory : ?Text;
  };

  module Flashcard {
    public func compareBySubject(flashcard1 : Flashcard, flashcard2 : Flashcard) : Order.Order {
      Text.compare(flashcard1.subject, flashcard2.subject);
    };
  };

  type QuizQuestion = {
    id : Nat;
    question : Text;
    choices : [Text];
    correctAnswer : Nat;
    subject : Text;
    gradeLevel : Text;
    testCategory : ?Text;
  };

  module QuizQuestion {
    public func compareBySubject(quizQuestion1 : QuizQuestion, quizQuestion2 : QuizQuestion) : Order.Order {
      Text.compare(quizQuestion1.subject, quizQuestion2.subject);
    };
  };

  type UserProgress = {
    reviewedFlashcards : [Nat];
    quizScores : [(Text, Nat)];
    dailyStudyStreak : Nat;
    totalStudyTime : Nat;
    lastStudyDate : Int;
  };

  module UserProgress {
    public func compareByStreak(userProgress1 : UserProgress, userProgress2 : UserProgress) : Order.Order {
      Nat.compare(userProgress1.dailyStudyStreak, userProgress2.dailyStudyStreak);
    };
  };

  let subjects = Map.empty<Text, Subject>();
  let flashcards = Map.empty<Nat, Flashcard>();
  let quizQuestions = Map.empty<Nat, QuizQuestion>();
  let userProgress = Map.empty<Principal, UserProgress>();

  var nextFlashcardId = 1;
  var nextQuizQuestionId = 1;

  public shared ({ caller }) func addSubject(name : Text, gradeLevel : Text, testCategory : ?Text) : async () {
    let subject : Subject = {
      name;
      gradeLevel;
      testCategory;
    };
    subjects.add(name, subject);
  };

  public query ({ caller }) func getAllSubjects() : async [Subject] {
    subjects.values().toArray().sort();
  };

  public shared ({ caller }) func addFlashcard(front : Text, back : Text, subject : Text, gradeLevel : Text, testCategory : ?Text) : async () {
    let flashcard : Flashcard = {
      id = nextFlashcardId;
      front;
      back;
      subject;
      gradeLevel;
      testCategory;
    };
    flashcards.add(nextFlashcardId, flashcard);
    nextFlashcardId += 1;
  };

  public query ({ caller }) func getFlashcardsBySubject(subject : Text) : async [Flashcard] {
    flashcards.values().toArray().filter(func(f) { f.subject == subject }).sort(Flashcard.compareBySubject);
  };

  public shared ({ caller }) func addQuizQuestion(question : Text, choices : [Text], correctAnswer : Nat, subject : Text, gradeLevel : Text, testCategory : ?Text) : async () {
    let quizQuestion : QuizQuestion = {
      id = nextQuizQuestionId;
      question;
      choices;
      correctAnswer;
      subject;
      gradeLevel;
      testCategory;
    };
    quizQuestions.add(nextQuizQuestionId, quizQuestion);
    nextQuizQuestionId += 1;
  };

  public query ({ caller }) func getQuizQuestionsBySubject(subject : Text) : async [QuizQuestion] {
    quizQuestions.values().toArray().filter(func(q) { q.subject == subject }).sort(QuizQuestion.compareBySubject);
  };

  public shared ({ caller }) func updateUserProgress(reviewedFlashcards : [Nat], quizScores : [(Text, Nat)], studyTime : Nat) : async () {
    let currentTime = Time.now();
    let currentStreak = switch (userProgress.get(caller)) {
      case (?progress) {
        if (currentTime - progress.lastStudyDate < 86400000000000) {
          progress.dailyStudyStreak + 1;
        } else {
          1;
        };
      };
      case (null) { 1 };
    };

    let updatedProgress : UserProgress = {
      reviewedFlashcards;
      quizScores;
      dailyStudyStreak = currentStreak;
      totalStudyTime = switch (userProgress.get(caller)) {
        case (?progress) { progress.totalStudyTime + studyTime };
        case (null) { studyTime };
      };
      lastStudyDate = currentTime;
    };

    userProgress.add(caller, updatedProgress);
  };

  public query ({ caller }) func getUserProgress(user : Principal) : async UserProgress {
    switch (userProgress.get(user)) {
      case (?progress) { progress };
      case (null) { Runtime.trap("User progress not found") };
    };
  };

  public shared ({ caller }) func seedData() : async () {
    await addSubject("Math", "4", ?"NJSLA Math");
    await addSubject("ELA", "4", ?"NJSLA ELA");
    await addSubject("Science", "4", null);
    await addSubject("Social Studies", "4", null);
    await addSubject("NJ History", "4", ?"NJ History Test");

    await addFlashcard("What is 2 + 2?", "4", "Math", "4", ?"NJSLA Math");
    await addFlashcard("Define noun", "A person, place, or thing", "ELA", "4", ?"NJSLA ELA");
    await addFlashcard("What is photosynthesis?", "Process by which plants make food", "Science", "4", null);
    await addFlashcard("Who was the first governor of NJ?", "Philip Carteret", "NJ History", "4", ?"NJ History Test");

    await addQuizQuestion(
      "What is the capital of NJ?",
      ["Trenton", "Newark", "Camden", "Paterson"],
      0,
      "Social Studies",
      "4",
      ?"NJ History Test"
    );
  };
};
