import prisma from "@/lib/prisma";
import AddNote from "./AddNote";
import RemoveNote from "./RemoveNote";
export const revalidate = 0;
const getNotes = () => {
  return prisma.notes.findMany();
}
export default async function NotePage() {
  const notes = await getNotes();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Notes
      <AddNote />
      {notes && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <li key={note.id}>{note.details} <RemoveNote note={note} /></li>
          ))}
        </>
      ) : (
        "No notes found"
      )}
    </main>
  );
}
