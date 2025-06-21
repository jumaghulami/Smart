"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ScheduleItem, Note } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Save, Trash2, Plus } from "lucide-react";

interface DailyRowProps {
  item: ScheduleItem;
}

export default function DailyRow({ item }: DailyRowProps) {
  const t = useTranslations("daily");

  const [input, setInput] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const storageKey = `notes-${item.id}`;

  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(notes));
  }, [notes, storageKey]);

  const handleAddNote = () => {
    if (!input.trim()) return;
    setNotes([
      {
        id: Date.now(),
        text: input,
        editing: false,
      },
      ...notes,
    ]);
    setInput("");
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleEditNote = (id: number) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, editing: !note.editing } : note
      )
    );
  };

  const handleNoteTextChange = (id: number, newText: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  return (
    <Card className="p-4 mb-4 transition-shadow shadow-sm hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <span className="text-sm text-muted-foreground">{item.time}</span>
      </div>

      <div className="flex gap-2 mb-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("placeholder")}
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
        />
        <Button onClick={handleAddNote} className="gap-1">
          <Plus className="w-4 h-4" />
          {t("add")}
        </Button>
      </div>

      {notes.length > 0 && (
        <div className="space-y-2">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex items-start justify-between gap-3 p-3 border rounded-lg bg-muted/50"
            >
              {note.editing ? (
                <Textarea
                  className="flex-1 text-sm"
                  value={note.text}
                  onChange={(e) =>
                    handleNoteTextChange(note.id, e.target.value)
                  }
                  autoFocus
                />
              ) : (
                <p className="flex-1 text-sm leading-relaxed">{note.text}</p>
              )}

              <div className="flex flex-col gap-2">
                <Button
                  variant={note.editing ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleEditNote(note.id)}
                  className="gap-1"
                >
                  {note.editing ? (
                    <>
                      <Save className="w-4 h-4" />
                      {t("save")}
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4" />
                      {t("edit")}
                    </>
                  )}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteNote(note.id)}
                  className="gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  {t("delete")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
