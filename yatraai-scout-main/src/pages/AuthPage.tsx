import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/integrations/firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import { Email as Mail, Lock, Person as User, ArrowForward as ArrowRight, Visibility as Eye, VisibilityOff as EyeOff } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AuthPage = ({ mode }: { mode: "login" | "signup" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) {
          await updateProfile(userCredential.user, { displayName });
        }
        toast({ title: "Account created!", description: "Welcome to YatraAI Scout Pro." });
        navigate("/dashboard");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Logged in!", description: "Ready to explore." });
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error(error);
      toast({ title: "Auth Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero-bg p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary-foreground mb-2">
            {mode === "login" ? "Welcome Back" : "Join YatraAI"}
          </h1>
          <p className="text-primary-foreground/70 text-sm">
            {mode === "login" ? "Sign in to continue your journey" : "Start your intelligent travel experience"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="relative">
              <User fontSize="small" className="absolute left-3 top-3 text-primary-foreground/50" />
              <Input
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail fontSize="small" className="absolute left-3 top-3 text-primary-foreground/50" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
              required
            />
          </div>

          <div className="relative">
            <Lock fontSize="small" className="absolute left-3 top-3 text-primary-foreground/50" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-primary-foreground/50 hover:text-primary-foreground"
            >
              {showPassword ? <EyeOff fontSize="small" /> : <Eye fontSize="small" />}
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full gradient-primary-bg text-primary-foreground border-0 hover:opacity-90 transition-opacity"
          >
            {loading ? "Loading..." : mode === "login" ? "Sign In" : "Create Account"}
            <ArrowRight fontSize="small" className="ml-2" />
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-primary-foreground/60">
          {mode === "login" ? "Don't have an account? " : "Already have an account? " }
          <Link
            to={mode === "login" ? "/signup" : "/login"}
            className="text-primary-foreground font-medium hover:underline"
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
