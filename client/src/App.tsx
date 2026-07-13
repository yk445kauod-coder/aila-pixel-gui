import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import ConfigSettings from "./pages/ConfigSettings";

/**
 * A.I.L.A Pixel Art GUI
 * 
 * Design Philosophy: Retro 16-bit pixel art with cyberpunk aesthetic
 * Colors: Black background, golden orange accents, white text
 * Theme: Dark mode (forced) with pixel-perfect rendering
 */

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/chat"} component={Chat} />
      <Route path={"/settings"} component={Settings} />
      <Route path={"/config"} component={ConfigSettings} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen bg-background text-foreground font-mono">
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
