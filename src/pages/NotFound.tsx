import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 border border-destructive/30 mb-8">
            <AlertTriangle className="w-10 h-10 text-destructive animate-pulse" />
          </div>
          
          <h1 className="font-display text-6xl text-destructive glow-text mb-4">404</h1>
          
          <p className="font-display text-xl text-foreground tracking-wider mb-2">
            ГРЕШКА В НАВИГАЦИЯТА
          </p>
          
          <p className="text-muted-foreground mb-8">
            Заявеният сектор не съществува в бордовите системи. 
            Проверете координатите и опитайте отново.
          </p>
          
          <Button asChild variant="hero" size="lg">
            <Link to="/">
              <Home className="w-5 h-5" />
              ОБРАТНО КЪМ КОМАНДНИЯ ЦЕНТЪР
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
