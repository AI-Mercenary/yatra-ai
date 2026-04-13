import { motion } from "framer-motion";
import { Hotel as HotelIcon, Search, Tune, Sort } from "@mui/icons-material";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HotelCard from "@/components/HotelCard";

const HARDCODED_HOTELS = [
  // Luxury
  { city: "Agra", name: "The Oberoi Amarvilas", rating: 5, price: 45000, category: "luxury", location: "Near Taj Mahal", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400", description: "Uninterrupted views of the Taj Mahal. Pure Mughal luxury." },
  { city: "Jaipur", name: "Rambagh Palace", rating: 5, price: 38000, category: "luxury", location: "Bhawani Singh Road", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400", description: "Royal hospitality in a sprawling palace setting." },
  { city: "Delhi", name: "The Leela Palace", rating: 5, price: 28000, category: "luxury", location: "Chanakyapuri", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400", description: "Modern luxury meets traditional motifs." },
  { city: "Mumbai", name: "The Taj Mahal Palace", rating: 5, price: 22500, category: "luxury", location: "Colaba", image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e84?w=400", description: "India's first luxury hotel, a landmark in itself." },
  // Mid Range
  { city: "Agra", name: "ITC Mughal", rating: 4, price: 12000, category: "mid", location: "Taj Ganj", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400", description: "A luxury collection hotel inspired by Mughal architecture." },
  { city: "Jaipur", name: "Shahpura House", rating: 4, price: 8500, category: "mid", location: "Bani Park", image: "https://images.unsplash.com/photo-1551882547-ff43c33fefee?w=400", description: "Experience Rajput hospitality in a heritage boutique hotel." },
  { city: "Delhi", name: "The Claridges", rating: 4, price: 14000, category: "mid", location: "Aurangzeb Road", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400", description: "Classic elegance since 1952 in the heart of Lutyens' Delhi." },
  // Budget
  { city: "Agra", name: "Hotel Taj Resort", rating: 3, price: 3500, category: "budget", location: "Fatehabad Road", image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=400", description: "Comfortable and affordable stay just 500m from the Taj." },
  { city: "Jaipur", name: "Pearl Palace Heritage", rating: 3, price: 4200, category: "budget", location: "Ajmer Road", image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=400", description: "Award-winning heritage guesthouse with artistic decor." },
  { city: "Delhi", name: "Bloomrooms @ Link Road", rating: 3, price: 4800, category: "budget", location: "Jangpura", image: "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=400", description: "Clean, bright, and modern stays with excellent connectivity." }
];

const HotelBookingPage = () => {
  const [search, setSearch] = useState("");
  const [maxBudget, setMaxBudget] = useState(50000);

  const filteredHotels = HARDCODED_HOTELS.filter(h => 
    (h.city.toLowerCase().includes(search.toLowerCase()) || 
     h.name.toLowerCase().includes(search.toLowerCase())) &&
    h.price <= maxBudget
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-3">
          <HotelIcon fontSize="large" className="text-primary" /> Heritage Stays & Bookings
        </h1>
        <p className="text-muted-foreground mb-8">Discover and book handpicked heritage hotels across India</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card-solid p-6 rounded-2xl border border-border/50 sticky top-24">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Tune fontSize="small" /> Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Search Location/Hotel</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="e.g. Agra" 
                      value={search} 
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 h-10 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Budget (per night)</label>
                    <span className="text-xs font-bold text-primary">₹{maxBudget.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="3000" 
                    max="50000" 
                    step="1000" 
                    value={maxBudget} 
                    onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-2 uppercase tracking-tighter">
                    <span>Economy</span>
                    <span>Luxury</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Categories</label>
                  <div className="space-y-2">
                    {["Boutique", "Palace", "Resort", "Heritage"].map(cat => (
                      <label key={cat} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-border text-primary focus:ring-primary" />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-muted-foreground">Showing {filteredHotels.length} luxury stays</p>
              <Button variant="ghost" size="sm" className="text-xs gap-2">
                <Sort fontSize="inherit" /> Sort by: Recommended
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel, i) => (
                  <HotelCard key={i} {...hotel} price={hotel.price.toLocaleString()} />
                ))
              ) : (
                <div className="glass-card-solid rounded-2xl p-12 text-center opacity-60">
                  <HotelIcon fontSize="large" className="mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium">No Hotels Found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your budget or search term.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HotelBookingPage;
