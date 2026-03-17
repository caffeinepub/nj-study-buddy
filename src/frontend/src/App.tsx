import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Flashcards from "./pages/Flashcards";
import ProgressPage from "./pages/Progress";
import Subjects from "./pages/Subjects";
import Tests from "./pages/Tests";

const rootRoute = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

const AppWrapper = ({ page }: { page: string }) => {
  const [gradeLevel, setGradeLevel] = useState("3-5");

  return (
    <Layout gradeLevel={gradeLevel} onGradeChange={setGradeLevel}>
      {page === "/" && <Dashboard gradeLevel={gradeLevel} />}
      {page === "/subjects" && <Subjects gradeLevel={gradeLevel} />}
      {page === "/tests" && <Tests gradeLevel={gradeLevel} />}
      {page === "/flashcards" && <Flashcards gradeLevel={gradeLevel} />}
      {page === "/progress" && <ProgressPage />}
    </Layout>
  );
};

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <AppWrapper page="/" />,
});

const subjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subjects",
  component: () => <AppWrapper page="/subjects" />,
});

const testsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tests",
  component: () => <AppWrapper page="/tests" />,
});

const flashcardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/flashcards",
  component: () => <AppWrapper page="/flashcards" />,
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/progress",
  component: () => <AppWrapper page="/progress" />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  subjectsRoute,
  testsRoute,
  flashcardsRoute,
  progressRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
