import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
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
import Services from "@/pages/services";
import Industries from "@/pages/industries";
import CaseStudies from "@/pages/case-studies";
import CaseStudy from "@/pages/case-study";
import CaseStudyOnestaff from "@/pages/case-study-onestaff";
import CaseStudyOnestaffEvents from "@/pages/case-study-onestaff-events";
import CaseStudyBakerConstruction from "@/pages/case-study-baker-construction";
import CaseStudyAccessBank from "@/pages/case-study-access-bank";
import CaseStudyJayMoore from "@/pages/case-study-jay-moore";
import PrivacyPolicy from "@/pages/privacy-policy";
import Terms from "@/pages/terms";
import Accessibility from "@/pages/accessibility";
import SizeBreakdown from "@/pages/size-breakdown";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

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
      <Route path="/services" component={Services} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/case-studies/nurse-gifting" component={CaseStudyOnestaff} />
      <Route path="/case-studies/onestaff-medical" component={CaseStudyOnestaff} />
      <Route path="/case-studies/events" component={CaseStudyOnestaffEvents} />
      <Route path="/case-studies/onestaff-events" component={CaseStudyOnestaffEvents} />
      <Route path="/case-studies/onestaff-travcon" component={CaseStudyOnestaffEvents} />
      <Route path="/case-studies/travcon" component={CaseStudyOnestaffEvents} />
      <Route path="/case-studies/construction" component={CaseStudyBakerConstruction} />
      <Route path="/case-studies/baker-group" component={CaseStudyBakerConstruction} />
      <Route path="/case-studies/access-bank" component={CaseStudyAccessBank} />
      <Route path="/case-studies/accessbank" component={CaseStudyAccessBank} />
      <Route path="/case-studies/accessbank-corporate-gifting" component={CaseStudyAccessBank} />
      <Route path="/case-studies/jay-moore-landscaping" component={CaseStudyJayMoore} />
      <Route path="/case-studies/jay-moore" component={CaseStudyJayMoore} />
      <Route path="/case-studies/:slug" component={CaseStudy} />

      <Route path="/tools/size-breakdown" component={SizeBreakdown} />
      <Route path="/tools/size-breakdown/"><Redirect to="/tools/size-breakdown" /></Route>

      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/privacy-policy/"><Redirect to="/privacy-policy" /></Route>
      <Route path="/terms" component={Terms} />
      <Route path="/terms/"><Redirect to="/terms" /></Route>
      <Route path="/accessibility" component={Accessibility} />
      <Route path="/accessibility/"><Redirect to="/accessibility" /></Route>

      {/* Legacy merchclub.com URL redirects */}
      <Route path="/shop"><Redirect to="/case-studies" /></Route>
      <Route path="/shop/"><Redirect to="/case-studies" /></Route>
      <Route path="/my-account"><Redirect to="/contact" /></Route>
      <Route path="/my-account/"><Redirect to="/contact" /></Route>
      <Route path="/latest-catalogs"><Redirect to="/services" /></Route>
      <Route path="/latest-catalogs/"><Redirect to="/services" /></Route>
      <Route path="/gallery"><Redirect to="/case-studies" /></Route>
      <Route path="/gallery/"><Redirect to="/case-studies" /></Route>
      <Route path="/apparel-decoration"><Redirect to="/services" /></Route>
      <Route path="/apparel-decoration/"><Redirect to="/services" /></Route>
      <Route path="/merch-101"><Redirect to="/blog" /></Route>
      <Route path="/merch-101/"><Redirect to="/blog" /></Route>
      <Route path="/checkout"><Redirect to="/contact" /></Route>
      <Route path="/checkout/"><Redirect to="/contact" /></Route>
      <Route path="/cart"><Redirect to="/contact" /></Route>
      <Route path="/cart/"><Redirect to="/contact" /></Route>
      <Route path="/dress-shirt-size-calculator"><Redirect to="/services" /></Route>
      <Route path="/dress-shirt-size-calculator/"><Redirect to="/services" /></Route>

      {/* Trailing-slash variants of current routes */}
      <Route path="/contact/"><Redirect to="/contact" /></Route>
      <Route path="/about/"><Redirect to="/about" /></Route>
      <Route path="/blog/"><Redirect to="/blog" /></Route>
      <Route path="/services/"><Redirect to="/services" /></Route>
      <Route path="/industries/"><Redirect to="/industries" /></Route>
      <Route path="/case-studies/"><Redirect to="/case-studies" /></Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
