import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookHeart, Plus, Edit3 } from "lucide-react";

interface JournalEntry {
  id: string;
  text: string;
  date: string;
  time: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      text: "Had a great morning workout! Feeling energized and ready for the day. The sun was shining and it made everything feel more positive.",
      date: "Today",
      time: "9:30 AM"
    },
    {
      id: "2", 
      text: "Grateful for my friend's support today. Sometimes it's the small gestures that mean the most.",
      date: "Yesterday",
      time: "7:15 PM"
    },
    {
      id: "3",
      text: "Tried a new healthy recipe for dinner. It was delicious! Cooking can be so therapeutic.",
      date: "Yesterday",
      time: "6:45 PM"
    }
  ]);

  const [newEntry, setNewEntry] = useState("");
  const [isWriting, setIsWriting] = useState(false);

  const addEntry = () => {
    if (newEntry.trim()) {
      const now = new Date();
      const entry: JournalEntry = {
        id: Date.now().toString(),
        text: newEntry.trim(),
        date: "Today",
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setEntries([entry, ...entries]);
      setNewEntry("");
      setIsWriting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-4 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Journal</h1>
          <p className="text-muted-foreground">Capture your thoughts and feelings</p>
        </div>

        {/* Add New Entry Button */}
        {!isWriting && (
          <Button
            onClick={() => setIsWriting(true)}
            className="w-full mb-6 h-16 bg-primary hover:bg-primary/90 shadow-soft"
          >
            <Plus className="h-5 w-5 mr-2" />
            Write New Entry
          </Button>
        )}

        {/* New Entry Form */}
        {isWriting && (
          <Card className="mb-6 bg-card shadow-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Edit3 className="h-5 w-5 text-primary" />
                New Entry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What's on your mind today?"
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                className="min-h-[120px] resize-none"
                autoFocus
              />
              <div className="flex gap-2">
                <Button onClick={addEntry} className="flex-1">
                  Save Entry
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsWriting(false);
                    setNewEntry("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Journal Entries */}
        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="bg-card shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BookHeart className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{entry.date}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{entry.time}</span>
                </div>
                <p className="text-foreground leading-relaxed">{entry.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {entries.length === 0 && !isWriting && (
          <div className="text-center py-12">
            <BookHeart className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg mb-2">No entries yet</p>
            <p className="text-muted-foreground text-sm">Start writing to capture your thoughts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;