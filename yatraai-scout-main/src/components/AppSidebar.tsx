import { useLocation, Link } from "react-router-dom";
import {
  Map, CameraAlt as Camera, SmartToy as Brain, AccountBalanceWallet as Wallet, People as Users, Cloud, Home, Logout as LogOut, WbSunny as Sun, DarkMode as Moon, ChevronLeft, ChevronRight,
  Hotel, Person,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage, LANGUAGES } from "@/contexts/LanguageContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { title: t("dashboard"), path: "/dashboard", icon: Home },
    { title: t("landmark_id"), path: "/dashboard/landmark", icon: Camera },
    { title: t("map_explorer"), path: "/dashboard/map", icon: Map },
    { title: t("weather"), path: "/dashboard/weather", icon: Cloud },
    { title: t("scout_ai"), path: "/dashboard/scout", icon: Brain },
    { title: t("budget"), path: "/dashboard/budget", icon: Wallet },
    { title: t("travel_buddy"), path: "/dashboard/buddy", icon: Users },
    { title: t("hotel_bookings"), path: "/dashboard/hotels", icon: Hotel },
    { title: t("my_profile"), path: "/dashboard/profile", icon: Person },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg font-display font-bold text-sidebar-primary whitespace-nowrap"
            >
              YatraAI Scout
            </motion.span>
          )}
        </AnimatePresence>
        {collapsed && <Brain fontSize="small" className="text-sidebar-primary mx-auto" />}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon fontSize="small" className="shrink-0" />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-2 border-t border-sidebar-border space-y-1">
        {/* Language Switcher */}
        {!collapsed && (
          <div className="px-3 py-2">
            <label className="text-[10px] font-bold text-sidebar-foreground/50 uppercase tracking-widest block mb-1.5">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="w-full text-xs bg-sidebar-accent/40 border border-sidebar-border rounded-lg px-2 py-1.5 text-sidebar-foreground focus:outline-none focus:ring-1 focus:ring-sidebar-primary cursor-pointer"
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.native}</option>
              ))}
            </select>
          </div>
        )}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent w-full transition-colors"
        >
          {theme === "dark" ? <Sun fontSize="small" className="shrink-0" /> : <Moon fontSize="small" className="shrink-0" />}
          {!collapsed && <span>{theme === "dark" ? t("light_mode") : t("dark_mode")}</span>}
        </button>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent w-full transition-colors"
        >
          <LogOut fontSize="small" className="shrink-0" />
          {!collapsed && <span>{t("sign_out")}</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        {collapsed ? <ChevronRight fontSize="small" /> : <ChevronLeft fontSize="small" />}
      </button>
    </motion.aside>
  );
};

export default AppSidebar;
