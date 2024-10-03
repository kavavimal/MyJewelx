"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { removeNoteAction } from "../actions/note";

export default function RemoveNote({note}) {
  const router = useRouter();
  const removeIt = () => {
    removeNoteAction(note.id);
    router.refresh();
  };
  return <button onClick={removeIt}>Remove</button>;
}
