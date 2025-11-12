import { useState, useEffect } from "react";
import { Calendar, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("tce_token");
    if (!token) return;
    setIsLoading(true);
    
    // Fetch user profile
    fetch("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      })
      .catch(() => {
        toast.error("Failed to load profile", {
          description: "Please try refreshing the page.",
        });
      });
    
    // Fetch registered events
    fetch("http://localhost:5000/api/users/me/events", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setRegisteredEvents(data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load events", {
          description: "Please try refreshing the page.",
        });
        setIsLoading(false);
      });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("tce_token");
    
    try {
      const response = await fetch("http://localhost:5000/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.error || "Update failed");
      }
      
      setUser(data);
      toast.success("Profile updated successfully!", {
        description: "Your changes have been saved.",
      });
      setIsLoading(false);
    } catch (err: any) {
      toast.error("Failed to update profile", {
        description: err.message || "Please try again.",
      });
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!user) return <div className="p-8 text-center">Not logged in</div>;

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
              <h1 className="text-xl font-bold">{user.name}</h1>
              <p className="text-sm opacity-90">B.E. Computer Science & Engineering</p>
              <p className="text-xs opacity-75 mt-1">III Year | Roll No: 21CS045 | TCE Madurai</p>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 space-y-6">
          {/* Profile Form */}
          <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Card className="shadow-2xl border-primary/10">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Profile</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label htmlFor="name">Name</label>
                    <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </div>
            </Card>
          </section>

          {/* Registered Events */}
          <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                My Registered Events
              </h2>
              {registeredEvents.length > 0 ? (
                <div className="space-y-3">
                  {registeredEvents.map((event) => (
                    <div
                      key={event._id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:border-primary"
                      onClick={() => navigate(`/events/${event._id}`)}
                    >
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      {event.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {event.description.substring(0, 100)}...
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  You haven't registered for any events yet.
                </p>
              )}
            </Card>
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
