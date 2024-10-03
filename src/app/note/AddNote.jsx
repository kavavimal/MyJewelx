"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function AddNote() {
  const [noteDetail, setNoteDetail] = useState("");
  const router = useRouter();
  const saveNote = async () => {
    const addNoteResponse = await fetch("/api/note", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({details: noteDetail})
    });
    router.refresh();
  };

  return (
    <div>
      <form method="post" onSubmit={saveNote}>
        <label>Note Detail</label>
        <input
          type="text"
          name="details"
          value={noteDetail}
          onChange={(e) => setNoteDetail(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddNote;
