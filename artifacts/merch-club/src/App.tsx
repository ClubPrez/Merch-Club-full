import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Healthcare from "@/pages/healthcare";
import Construction from "@/pages/construction";
import Corporate from "@/pages/corporate";
import Events from "@/pages/events";
import Contact from "@/pages/contact";
import Industries from "@/pages/industries";
import CaseStudies from "@/pages/case-studies";
import CaseStudy from "@/pages/case-study";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/industries" component={Industries} />
      <Route path="/industries/healthcare" component={Healthcare} />
      <Route path="/healthcare" component={Healthcare} />
      <Route path="/industries/construction" component={Construction} />
      <Route path="/construction" component={Construction} />
      <Route path="/industries/corporate" component={Corporate} />
      <Route path="/corporate" component={Corporate} />
      <Route path="/industries/events" component={Events} />
      <Route path="/events" component={Events} />
      <Route path="/contact" component={Contact} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/case-studies/:slug" component={CaseStudy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
