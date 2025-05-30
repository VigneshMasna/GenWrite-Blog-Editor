import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthGuard } from "@/components/auth-guard";
import { auth } from "@/lib/auth";

import LoginPage from "@/pages/login";
import BlogListPage from "@/pages/blog-list";
import BlogEditorPage from "@/pages/blog-editor";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      
      <Route path="/blogs">
        <AuthGuard>
          <BlogListPage />
        </AuthGuard>
      </Route>
      
      <Route path="/editor">
        <AuthGuard>
          <BlogEditorPage />
        </AuthGuard>
      </Route>
      
      <Route path="/">
        {auth.isAuthenticated() ? <Redirect to="/blogs" /> : <Redirect to="/login" />}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
