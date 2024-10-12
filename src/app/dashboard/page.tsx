"use client";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/templates", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        authorId: 1, // Assuming authorId for now
        formId: 1, // Assuming formId for now
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      // Handle successful creation
    } else {
      // Handle errors
    }
  };

  return (
    <div>
      <UserButton />
      <h1>Create Template</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Create Template</button>
      </form>
    </div>
  );
}
