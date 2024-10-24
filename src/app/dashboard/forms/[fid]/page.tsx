"use client";
import DynamicForm from "@/components/DynamicForm";
import { TextField } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Answer {
  fid: number;
  uid: number;
  eid: number;
  selected1?: number;
  selected2?: number;
  selected3?: number;
  selected4?: number;
  text1?: string;
  text2?: string;
  text3?: string;
  text4?: string;
}

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

function Forms() {
  const params = useParams();
  const fid = params.fid;
  const [formData, setFormData] = useState<TemplateData | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch(`/api/forms/${fid}`);
        const data = await res.json();

        if (data && data.data) {
          const sortedElements = data.data.elements.sort(
            (a: Element, b: Element) => a.index - b.index
          );
          data.data.elements = sortedElements;
          setFormData(data.data);
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, [fid]);

  const handleAnswerSubmit = (id: number, answer: string) => {};

  return (
    <div className="bg-slate-100">
      {formData ? (
        <>
          <div className="container mx-auto px-4 py-8 flex flex-col gap-3 justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
              <TextField
                value={formData.form.title}
                onChange={(e) => e.target.value}
                required
                label="Template Title"
                variant="filled"
                className="w-[700px]"
              />

              <TextField
                value={formData.form.description}
                onChange={(e) => e.target.value}
                label="Description"
                variant="filled"
                size="small"
                className="w-[700px]"
              />
            </div>
            <div className="container item-center w-[700px]">
              <section className="flex flex-col bg-slate-200 p-4 rounded-lg mb-4">
                <DynamicForm elements={formData.elements} />
              </section>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}

export default Forms;
