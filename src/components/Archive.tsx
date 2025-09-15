// in development 
// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { fetchEntriesFromDb } from "@/api/journalAPI";
// import { useTheme } from "@/theme/useTheme";

// interface JournalEntry {
//   id: string;
//   text: string;
//   time: string;
// }

// const Archive = () => {
//   const theme = useTheme();
//   const [entriesByDate, setEntriesByDate] = useState<Record<string, JournalEntry[]>>({});
//   const [selectedDate, setSelectedDate] = useState<string>("");

//   useEffect(() => {
//     const fetchEntries = async () => {
//       const data = await fetchEntriesFromDb();
//       if (data) {
//         const grouped: Record<string, JournalEntry[]> = {};
//         data.forEach((entry: JournalEntry) => {
//           const date = new Date(entry.time).toLocaleDateString();
//           if (!grouped[date]) grouped[date] = [];
//           grouped[date].push(entry);
//         });
//         setEntriesByDate(grouped);
//         // Default to most recent date
//         const dates = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
//         setSelectedDate(dates[0] || "");
//       }
//     };
//     fetchEntries();
//   }, []);

//   const dates = Object.keys(entriesByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

//   return (
//     <div className={theme.mainContainer}>
//       <div className={theme.innerContainer}>
//         <div className="text-center mb-8 pt-8">
//           <h1 className={theme.sectionHeader}>Archive</h1>
//           <p className={theme.sectionSubHeader}>View your journal entries from previous days</p>
//         </div>
//         <div className="mb-6 flex flex-wrap gap-2 justify-center">
//           {dates.map((date) => (
//             <button
//               key={date}
//               className={`px-4 py-2 rounded ${selectedDate === date ? "bg-primary text-white" : "bg-muted text-foreground"}`}
//               onClick={() => setSelectedDate(date)}
//             >
//               {date}
//             </button>
//           ))}
//         </div>
//         <div>
//           {selectedDate && entriesByDate[selectedDate] ? (
//             <div className="space-y-4">
//               {entriesByDate[selectedDate].map((entry) => (
//                 <Card key={entry.id} className={`${theme.cardBase} ${theme.cardSoft}`}>
//                   <CardContent className={theme.cardContentBase}>
//                     <p className="text-foreground leading-relaxed">{entry.text}</p>
//                     <span className="text-xs text-muted-foreground float-right">
//                       {new Date(entry.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                     </span>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           ) : (
//             <p className="text-muted-foreground text-center">No entries for this date.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Archive;
