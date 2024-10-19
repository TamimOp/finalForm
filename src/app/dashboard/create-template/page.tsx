"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Update to 'next/navigation'
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import TabForm from "@/components/Tabs";
import QuestionBoxContainer from "@/components/ConfigureQuesPaper/QuestionBoxContainer";

const CreateTemplate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter(); // Using 'next/navigation' version

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/forms/create", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/dashboard/forms/${data.id}`);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Failed to create template");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TabForm />

      <div className="bg-slate-100">
        <form className="container mx-auto px-4 py-8 flex flex-col gap-3 justify-center items-center ">
          <div className="flex flex-col gap-3 justify-center items-center">
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
              label="Template Title"
              variant="filled"
              className="w-[700px]"
            />

            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              label="Description"
              variant="filled"
              size="small"
              className="w-[700px]"
            />
          </div>
          <div className="container item-center w-[700px]">
            <QuestionBoxContainer />
          </div>
          {error && <p className="text-red-500 mb-4 items-start">{error}</p>}
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            className="items-start"
          >
            {loading ? "Creating..." : "Create Template"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateTemplate;
