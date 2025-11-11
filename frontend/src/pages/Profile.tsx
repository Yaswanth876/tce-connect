import { Calendar, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const registeredEvents = [
  {
    title: "AI Sprint Workshop",
    date: "Jun 2-13, 2025",
  },
  {
    title: "Field Visit - AR/VR",
    date: "Jun 13-14, 2025",
  },
  {
    title: "Connexions - IoT Workshop",
    date: "May 9, 2025",
  },
];

const myClubs = [
  { name: "AI Consortium", icon: "🤖" },
  { name: "App Development Club", icon: "📱" },
];

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background page-transition">
      <Navbar />
      <div className="flex-1 pb-20 lg:pb-0">
        {/* Header with TCE gradient and animation */}
        <header className="bg-gradient-to-r from-primary via-primary-dark to-primary text-primary-foreground p-6 lg:p-8 animate-fade-in">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent/80 mx-auto flex items-center justify-center text-4xl shadow-lg animate-scale-in">
              👨‍🎓
            </div>
            <div className="animate-slide-up">
              <h1 className="text-xl font-bold">Rajesh Kumar</h1>
              <p className="text-sm opacity-90">B.E. Computer Science & Engineering</p>
              <p className="text-xs opacity-75 mt-1">III Year | Roll No: 21CS045 | TCE Madurai</p>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 space-y-6">
          {/* My Registered Events */}
          <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-lg font-semibold mb-3 gradient-text">📅 My Registered Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {registeredEvents.map((event, index) => (
                <Card key={index} className="p-4 hover:shadow-card-hover transition-all duration-200 animate-scale-in group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{event.title}</h3>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-accent" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full hover:bg-primary hover:text-primary-foreground transition-all">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* My Clubs */}
          <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-lg font-semibold mb-3 gradient-text">🎭 My Clubs</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {myClubs.map((club, index) => (
                <Card key={index} className="p-4 hover:shadow-card-hover transition-all duration-200 cursor-pointer animate-scale-in hover:scale-105 group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="text-3xl group-hover:scale-110 transition-transform">{club.icon}</div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{club.name}</h3>
                    <Button variant="ghost" size="sm" className="w-full hover:bg-primary/10 transition-all">
                      Open
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Logout */}
          <Button
            variant="destructive"
            className="w-full lg:max-w-xs transition-all duration-200 hover:scale-105 shadow-lg"
            onClick={() => {
              // simple client-side logout
              localStorage.removeItem('tce_isAuthenticated');
              localStorage.removeItem('tce_user_email');
              window.location.href = '/';
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <BottomNav />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
