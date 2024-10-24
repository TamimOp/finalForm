"use client";
import { TextField } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import QuestionBoxContainer from "@/components/ConfigureQuesPaper/QuestionBoxContainer";
import Button from "@mui/material/Button";
import TabForm from "@/components/Tabs";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

type Element = {
  id: number;
  type: number;
  index: number;
  fid: number;
  question: string;
  required: boolean;
  fieldCount: number;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
};

type Form = {
  id: number;
  uid: number;
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

type TemplateData = {
  elements: Element[];
  form: Form;
};

function Edit({
  index,
  handleDelete,
  handleUpdate,
  provided,
}: {
  index: number;
  handleDelete: (index: number) => void;
  handleUpdate: (item: any) => void;
  provided: any;
}) {
  const params = useParams();
  const fid = params.fid;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [elements, setElements] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      setFetchLoading(true);

      try {
        const res = await fetch(`/api/forms/${fid}`);
        const data = await res.json();

        if (data && data.data) {
          setTitle(data.data.form.title);
          setDescription(data.data.form.description);

          const sortedElements = data.data.elements.sort(
            (a: Element, b: Element) => a.index - b.index
          );

          setElements(sortedElements);
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchTemplates();
  }, [fid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/forms/update", {
        method: "POST",
        body: JSON.stringify({
          fid,
          title: title === "" ? "Untitled" : title,
          description,
          elements,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Failed to create template");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="bg-slate-100">
      <form className="container mx-auto px-4 py-8 flex flex-col gap-3 justify-center items-center ">
        <TabForm />
        <div className="flex flex-col gap-3 justify-center items-center">
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={fetchLoading}
            label="Template Title"
            variant="filled"
            className="w-[700px]"
          />

          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={fetchLoading}
            label="Description"
            variant="filled"
            size="small"
            className="w-[700px]"
          />
        </div>
        <div className="container item-center w-[700px]">
          {!fetchLoading && (
            <QuestionBoxContainer
              setElements={setElements}
              elements={elements}
            />
          )}
        </div>
        {error && <p className="text-red-500 mb-4 items-start">{error}</p>}
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={fetchLoading}
          className="items-start"
        >
          {updateLoading ? "Updating..." : "Update Template"}
        </Button>
      </form>
    </div>
  );
}

export default Edit;
