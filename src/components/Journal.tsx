import {
  fetchEntriesFromDb,
  addEntryToDb,
  deleteEntryFromDb,
  updateEntryInDb,
} from "@/api/journalAPI";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookHeart, Plus, Edit3, TrashIcon, PencilIcon } from "lucide-react";
import { useTheme } from "@/theme/useTheme";

interface JournalEntry {
  id: string;
  text: string;
  time: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState("");
  const [isWriting, setIsWriting] = useState(false);

  // Fetch journal entries on mount
  useEffect(() => {
    const fetchEntries = async () => {
      const data = await fetchEntriesFromDb();
      if (data) setEntries(data);
    };
    fetchEntries();
  }, []);

  // Add new entry
  const handleAddEntry = async () => {
    if (newEntry.trim()) {
      const now = new Date();
      const entry = {
        text: newEntry.trim(),
        time: now.toISOString(),
      };
      await addEntryToDb(entry);
      const data = await fetchEntriesFromDb();
      if (data) setEntries(data);
      setNewEntry("");
      setIsWriting(false);
    }
  };

  // Delete entry
  const handleDeleteEntry = async (entryId: string) => {
    await deleteEntryFromDb(entryId);
    const data = await fetchEntriesFromDb();
    if (data) setEntries(data);
  };

  // Edit entry (for simplicity, just pre-fill the new entry form)
  const handleEditEntry = (entry: JournalEntry) => {
    setNewEntry(entry.text);
    setIsWriting(true);
    handleDeleteEntry(entry.id); // Remove old entry, will be replaced on save
  };

  // ...existing code...
  const theme = useTheme();
  return (
    <div className={theme.mainContainer}>
      <div className={theme.innerContainer}>
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className={theme.sectionHeader}>Journal</h1>
          <p className={`${theme.sectionSubHeader} pb-3`}>
            Capture your thoughts and feelings
          </p>
          {/* Add New Entry Button */}
          {!isWriting && (
            <Button
              onClick={() => setIsWriting(true)}
              className={`w-full mb-6 h-16 ${theme.buttonPrimary}`}
              aria-label="Write New Entry"
            >
              <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
              Write New Entry
            </Button>
          )}

          {/* New Entry Form */}
          {isWriting && (
            <Card className={`${theme.cardBase} ${theme.cardAccent} mb-6`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Edit3 className="h-5 w-5 text-primary" aria-hidden="true" />
                  New Entry
                </CardTitle>
              </CardHeader>
              <CardContent className={theme.cardContentBase + " space-y-4"}>
                <Textarea
                  placeholder="What's on your mind today?"
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  className="min-h-[120px] resize-none"
                  autoFocus
                  aria-label="Journal entry text"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddEntry}
                    className={`flex-1 ${theme.buttonPrimary}`}
                    aria-label="Save Entry"
                  >
                    Save Entry
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsWriting(false);
                      setNewEntry("");
                    }}
                    className={`flex-1 ${theme.buttonOutline}`}
                    aria-label="Cancel Entry"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Journal Entries */}
        <div className="space-y-4 flex-1" aria-label="Journal Entries">
          {entries.map((entry) => (
            <Card
              key={entry.id}
              className={`${theme.cardBase} ${theme.cardSoft}`}
            >
              <CardContent className={theme.cardContentBase}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BookHeart
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-primary">
                      {new Date(entry.time).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(entry.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEntry(entry.id)}
                      aria-label={`Delete entry`}
                    >
                      <TrashIcon
                        className="h-4 w-4 text-muted-foreground hover:text-destructive"
                        aria-hidden="true"
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditEntry(entry)}
                      aria-label={`Edit entry`}
                    >
                      <PencilIcon
                        className="h-4 w-4 text-muted-foreground hover:text-primary"
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                </div>
                <p className="text-foreground leading-relaxed">{entry.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {entries.length === 0 && !isWriting && (
          <div className="text-center py-12" aria-label="No entries yet">
            <BookHeart
              className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50"
              aria-hidden="true"
            />
            <p className="text-muted-foreground text-lg mb-2">No entries yet</p>
            <p className="text-muted-foreground text-sm">
              Start writing to capture your thoughts
            </p>
          </div>
        )}
      </div>
    </div>
  );
  // ...existing code...
};

export default Journal;
