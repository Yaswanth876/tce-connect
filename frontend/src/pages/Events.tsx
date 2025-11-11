import { useState } from "react";
import { Search, Calendar, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/EventCard";
import { BottomNav } from "@/components/BottomNav";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

const filters = ["All", "Technical", "Cultural", "Sports"];

const allEvents = [
  // Featured Upcoming Events
  {
    id: "1",
    title: "AI Sprint - AI Consortium",
    date: "Jun 2-13, 2025",
    venue: "CSE Department",
    department: "AI Consortium",
    type: "technical" as const,
  },
  {
    id: "2",
    title: "Field Visit - AR/VR Club",
    date: "Jun 13-14, 2025",
    venue: "Industry Location",
    department: "AR/VR Club",
    type: "technical" as const,
  },
  {
    id: "3",
    title: "Connexions - IoT Workshop",
    date: "May 9, 2025",
    venue: "IoT Lab",
    department: "IoT Club",
    type: "technical" as const,
  },
  {
    id: "4",
    title: "Inauguration of AI Consortium - Gen AI in Action",
    date: "Apr 2, 2025",
    venue: "Main Auditorium",
    department: "AI Consortium",
    type: "technical" as const,
  },
  // More Technical Events
  {
    id: "5",
    title: "CodeFest - Programming Competition",
    date: "Nov 7, 2025",
    venue: "CSE Lab",
    department: "Algo Geeks Club",
    type: "technical" as const,
  },
  {
    id: "6",
    title: "HackFest - 24 Hour Hackathon",
    date: "Nov 7, 2025",
    venue: "Innovation Center",
    department: "App Development Club",
    type: "technical" as const,
  },
  {
    id: "7",
    title: "App Mentor - Mobile Dev Workshop",
    date: "Nov 7, 2025",
    venue: "IT Department",
    department: "App Development Club",
    type: "technical" as const,
  },
  {
    id: "8",
    title: "Sensor Hunts - IoT Challenge",
    date: "Nov 7, 2025",
    venue: "ECE Lab",
    department: "IoT Club",
    type: "technical" as const,
  },
  {
    id: "9",
    title: "AI Week - Machine Learning Workshop",
    date: "Nov 7, 2025",
    venue: "AI Lab",
    department: "AI Consortium",
    type: "technical" as const,
  },
  {
    id: "10",
    title: "Crime Scene - Cyber Security Event",
    date: "Nov 7, 2025",
    venue: "CSE Department",
    department: "Algo Geeks Club",
    type: "technical" as const,
  },
  {
    id: "11",
    title: "CRAFT THE CORE - Logo Design Contest",
    date: "Nov 7, 2025",
    venue: "Design Studio",
    department: "All About Art",
    type: "cultural" as const,
  },
  // Cultural Events
  {
    id: "12",
    title: "TCE Cultural Fest 2025",
    date: "Apr 10, 2025",
    venue: "Main Ground",
    department: "Cultural Society",
    type: "cultural" as const,
  },
  {
    id: "13",
    title: "Dance Competition - AFD",
    date: "Feb 28, 2025",
    venue: "Student Activity Center",
    department: "Anything for Dance",
    type: "cultural" as const,
  },
  {
    id: "14",
    title: "Music Fest - Andhadhi",
    date: "Mar 5, 2025",
    venue: "Auditorium",
    department: "Andhadhi Music Club",
    type: "cultural" as const,
  },
  {
    id: "15",
    title: "Book Reading Session",
    date: "Mar 15, 2025",
    venue: "TCE Library",
    department: "Book Readers Club",
    type: "cultural" as const,
  },
  {
    id: "16",
    title: "Film Screening - Cinemates",
    date: "Mar 20, 2025",
    venue: "Mini Auditorium",
    department: "Cinemates",
    type: "cultural" as const,
  },
  {
    id: "17",
    title: "Fashion Show - Always on Trend",
    date: "Apr 5, 2025",
    venue: "Main Stage",
    department: "Always on Trend",
    type: "cultural" as const,
  },
  {
    id: "18",
    title: "Literary Fest - Anglophile Lounge",
    date: "Apr 15, 2025",
    venue: "English Department",
    department: "Anglophile Lounge",
    type: "cultural" as const,
  },
  // Sports Events
  {
    id: "19",
    title: "Inter-College Sports Meet",
    date: "Mar 20, 2025",
    venue: "TCE Sports Complex",
    department: "Sports Committee",
    type: "sports" as const,
  },
  {
    id: "20",
    title: "Cricket Tournament",
    date: "Feb 15, 2025",
    venue: "Cricket Ground",
    department: "Sports Committee",
    type: "sports" as const,
  },
  {
    id: "21",
    title: "Basketball Championship",
    date: "Mar 1, 2025",
    venue: "Basketball Court",
    department: "Sports Committee",
    type: "sports" as const,
  },
  {
    id: "22",
    title: "Athletic Meet 2025",
    date: "Apr 25, 2025",
    venue: "Athletic Track",
    department: "Sports Committee",
    type: "sports" as const,
  },
];

const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = allEvents.filter((event) => {
    const matchesFilter =
      selectedFilter === "All" ||
      event.type.toLowerCase() === selectedFilter.toLowerCase();
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background page-transition">
      <Navbar />
      <div className="flex-1 pb-20 lg:pb-0">
        {/* Header with consistent theme */}
        <header className="bg-white border-b border-border p-4 lg:p-6 sticky top-0 z-10 animate-fade-in shadow-md">
          <div className="max-w-5xl mx-auto space-y-3">
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2 animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-primary">TCE</span> Events
          </h1>

          {/* Search Bar with animation */}
          <div className="relative animate-slide-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events or clubs"
              className="pl-10 bg-background border-border focus:border-primary transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Chips with hover effects */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            {filters.map((filter) => (
              <Button
                key={filter}
                size="sm"
                variant="outline"
                className={cn(
                  "rounded-full whitespace-nowrap transition-all duration-300 hover:shadow-lg",
                  selectedFilter === filter
                    ? "border-2 !border-primary text-primary font-bold !bg-white hover:!bg-white hover:!text-primary hover:scale-105"
                    : "bg-white border border-border text-foreground hover:bg-primary/10 hover:text-primary hover:scale-105"
                )}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
          </div>
        </header>

        {/* Events List with staggered animations */}
        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((event, index) => (
                <div 
                  key={index} 
                  className="animate-slide-up opacity-0"
                  style={{ 
                    animationDelay: `${index * 0.08}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <EventCard {...event} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground animate-fade-in">
              <SearchX className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg">No events found</p>
              <p className="text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
      <Footer />
    </div>
  );
};

export default Events;
