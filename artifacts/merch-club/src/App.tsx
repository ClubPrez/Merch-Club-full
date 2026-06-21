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
import InstantQuote from "@/pages/instant-quote";
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

      <Route path="/instant-quote" component={InstantQuote} />
      <Route path="/instant-quote/"><Redirect to="/instant-quote" /></Route>

      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/privacy-policy/"><Redirect to="/privacy-policy" /></Route>
      <Route path="/terms" component={Terms} />
      <Route path="/terms/"><Redirect to="/terms" /></Route>
      <Route path="/accessibility" component={Accessibility} />
      <Route path="/accessibility/"><Redirect to="/accessibility" /></Route>

      {/* Legacy /home redirects */}
      <Route path="/home"><Redirect to="/" /></Route>
      <Route path="/home/"><Redirect to="/" /></Route>

      {/* Legacy WordPress product/category URLs — known redirects only; unknown slugs fall to 404 */}
      <Route path="/product/tackle-knit"><Redirect to="/services" /></Route>
      <Route path="/product/nfc-tap-tee"><Redirect to="/services" /></Route>
      <Route path="/product/sublimated-patches"><Redirect to="/services" /></Route>
      <Route path="/product/chromaflex-holographic"><Redirect to="/services" /></Route>
      <Route path="/product/chromaflex-beveled"><Redirect to="/services" /></Route>
      <Route path="/product/chromaflex-flat"><Redirect to="/services" /></Route>
      <Route path="/product/chromaflex"><Redirect to="/services" /></Route>
      <Route path="/product/applique"><Redirect to="/services" /></Route>
      <Route path="/product/seam-spray"><Redirect to="/services" /></Route>
      <Route path="/product/pms-color-match"><Redirect to="/services" /></Route>
      <Route path="/product/lextra-3d-4d"><Redirect to="/services" /></Route>
      <Route path="/product/nailheads-print-tshirt"><Redirect to="/services" /></Route>
      <Route path="/product/crystal-wash"><Redirect to="/services" /></Route>
      <Route path="/product/hoodie-liner"><Redirect to="/services" /></Route>
      <Route path="/product/applique-print"><Redirect to="/services" /></Route>
      <Route path="/product/full-color-gloss-print"><Redirect to="/services" /></Route>
      <Route path="/product/pvc-rubber-patch"><Redirect to="/services" /></Route>
      <Route path="/product/chroma-bling"><Redirect to="/services" /></Route>
      <Route path="/product/butterlux"><Redirect to="/services" /></Route>
      <Route path="/product/elasti-print"><Redirect to="/services" /></Route>
      <Route path="/product/full-color-faux-leather-patch"><Redirect to="/services" /></Route>
      <Route path="/product/lextra"><Redirect to="/services" /></Route>
      <Route path="/product/colorcrest"><Redirect to="/services" /></Route>
      <Route path="/product/apparel-laser-etching"><Redirect to="/services" /></Route>
      <Route path="/product/3d-embroidered-patches"><Redirect to="/services" /></Route>
      <Route path="/product/diamond-plate-print"><Redirect to="/services" /></Route>
      <Route path="/product/foil-print"><Redirect to="/services" /></Route>
      <Route path="/product/print-over-zippers"><Redirect to="/services" /></Route>
      <Route path="/product/private-label"><Redirect to="/services" /></Route>
      <Route path="/product/mono-gloss-print"><Redirect to="/services" /></Route>
      <Route path="/product/additional-colors"><Redirect to="/services" /></Route>
      <Route path="/product/peek-a-boo-pocket"><Redirect to="/services" /></Route>
      <Route path="/product/dailies-name-patches"><Redirect to="/services" /></Route>
      <Route path="/product/glitter-print"><Redirect to="/services" /></Route>
      <Route path="/product/chromaflex-textured"><Redirect to="/services" /></Route>
      <Route path="/product/woven-patches"><Redirect to="/services" /></Route>
      <Route path="/product/print-stitch-patches"><Redirect to="/services" /></Route>
      <Route path="/product/print-over-seams"><Redirect to="/services" /></Route>
      <Route path="/product/faux-suede"><Redirect to="/services" /></Route>
      <Route path="/product/inside-out-butterlux"><Redirect to="/services" /></Route>
      <Route path="/product/3dimensional-matte-print"><Redirect to="/services" /></Route>
      <Route path="/product/reflective-print"><Redirect to="/services" /></Route>
      <Route path="/product/glow-in-the-dark"><Redirect to="/services" /></Route>
      <Route path="/product/custom-cuffs"><Redirect to="/services" /></Route>
      <Route path="/product/3m-safety-reflective"><Redirect to="/services" /></Route>
      <Route path="/product/vintage-flock"><Redirect to="/services" /></Route>
      <Route path="/product/custom-drawcords-aglets"><Redirect to="/services" /></Route>
      <Route path="/product/spiral-dye"><Redirect to="/services" /></Route>
      <Route path="/product-category/custom-shirts"><Redirect to="/services" /></Route>
      <Route path="/product-category/emblem"><Redirect to="/services" /></Route>

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
