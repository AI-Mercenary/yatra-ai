import { motion } from "framer-motion";
import { 
  Person, 
  Settings, 
  Security, 
  Notifications, 
  History, 
  CreditCard,
  Edit,
  Verified
} from "@mui/icons-material";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { updateProfile } from "firebase/auth";

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateProfile(user, { displayName });
      toast({ title: "Profile updated!", description: "Your display name has been saved." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: Person },
    { id: "security", label: "Security", icon: Security },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Notifications },
  ];
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full gradient-primary-bg flex items-center justify-center text-4xl text-primary-foreground shadow-xl border-4 border-background">
              {displayName.charAt(0) || user?.email?.charAt(0) || "?"}
            </div>
            <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-background border border-border shadow-lg hover:scale-110 transition-transform">
              <Edit fontSize="small" className="text-muted-foreground" />
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-2">
              {displayName || "User"} <Verified fontSize="small" className="text-blue-500" />
            </h1>
            <p className="text-muted-foreground">{user?.email}</p>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">Pro Intelligence</span>
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider">Verified Account</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="md:col-span-1 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <tab.icon fontSize="small" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="md:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card-solid rounded-2xl p-8 border border-border/50 shadow-sm"
            >
              {activeTab === "personal" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-foreground border-b border-border pb-4">Account Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Display Name</label>
                      <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="bg-muted/50 border-0" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Login Email</label>
                      <Input value={user?.email || ""} disabled className="bg-muted/50 border-0 opacity-60" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button onClick={handleUpdate} disabled={loading} className="gradient-primary-bg border-0 px-8">
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-foreground border-b border-border pb-4">Security Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div>
                        <p className="font-bold text-sm">Update Password</p>
                        <p className="text-xs text-muted-foreground">Change your security credentials</p>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div>
                        <p className="font-bold text-sm">Two-Factor Authentication</p>
                        <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab !== "personal" && activeTab !== "security" && (
                <div className="py-12 text-center opacity-40">
                  <Settings fontSize="large" className="mx-auto mb-2" />
                  <p className="text-sm">Advanced {activeTab} settings coming soon in v2.0</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
