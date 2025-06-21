import DailyRow from "@/components/DailyRow";
import { ScheduleItem } from "@/lib/types";

const schedule: ScheduleItem[] = [
  { id: 1, title: "JavaScript", time: "07:00 - 08:00" },
  { id: 2, title: "React", time: "08:00 - 09:00" },
  { id: 3, title: "Next.js", time: "09:00 - 10:00" },
  { id: 4, title: "TypeScript", time: "10:00 - 11:00" },
];

export default function Home() {
  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="max-w-3xl p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">تقسیم اوقات روزانه ({today})</h1>
      {schedule.map((item) => (
        <DailyRow key={item.id} item={item} />
      ))}
    </main>
  );
}
