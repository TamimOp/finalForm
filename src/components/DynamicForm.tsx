"use client";

import { Button, Checkbox, TextField } from "@mui/material";
import { useState } from "react";

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

interface DynamicFormProps {
  elements: Element[];
}

const DynamicForm = ({ elements }: DynamicFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<any[]>(
    elements.map((e: Element) => ({
      fid: e.fid,
      eid: e.id,
    }))
  );

  const handleChange = (
    elementIndex: number,
    fieldIndex: number,
    newValue: string | number | boolean
  ) => {
    const updatedData = [...formData];
    const targetField = updatedData[elementIndex];

    switch (fieldIndex) {
      case 0:
        if (typeof newValue === "boolean") {
          targetField.selected1 = newValue ? 1 : 0;
        } else if (typeof newValue === "number") {
          targetField.selected1 = newValue;
        } else {
          targetField.text1 = newValue as string;
        }
        break;
      case 1:
        if (typeof newValue === "boolean") {
          targetField.selected2 = newValue ? 1 : 0;
        } else if (typeof newValue === "number") {
          targetField.selected2 = newValue;
        } else {
          targetField.text2 = newValue as string;
        }
        break;
      case 2:
        if (typeof newValue === "boolean") {
          targetField.selected3 = newValue ? 1 : 0;
        } else if (typeof newValue === "number") {
          targetField.selected3 = newValue;
        } else {
          targetField.text3 = newValue as string;
        }
        break;
      case 3:
        if (typeof newValue === "boolean") {
          targetField.selected4 = newValue ? 1 : 0;
        } else if (typeof newValue === "number") {
          targetField.selected4 = newValue;
        } else {
          targetField.text4 = newValue as string;
        }
        break;
      default:
        break;
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/forms/submit-answer", {
        method: "POST",
        body: JSON.stringify({
          answers: formData,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
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
    <form onSubmit={handleSubmit}>
      {elements.map((element, elementIndex) => (
        <div className="mb-4" key={element.id}>
          <h2 className="text-lg font-bold flex gap-1">
            <p>{element.index + 1}.</p> <p>{element.question}</p>
          </h2>
          {Array.from({ length: element.fieldCount }).map((_, fieldIndex) => (
            <div key={fieldIndex}>
              {element.type === 1 && (
                <TextField
                  id={`short-answer-${elementIndex}-${fieldIndex}`}
                  label="Short Answer"
                  variant="standard"
                  className="w-[50%]"
                  value={
                    formData[elementIndex]?.[`text${fieldIndex + 1}`] || ""
                  }
                  onChange={(e) =>
                    handleChange(elementIndex, fieldIndex, e.target.value)
                  }
                />
              )}
              {element.type === 2 && (
                <TextField
                  id={`paragraph-${elementIndex}-${fieldIndex}`}
                  label="Paragraph"
                  variant="standard"
                  multiline
                  rows={2}
                  className="w-[70%]"
                  value={
                    formData[elementIndex]?.[`text${fieldIndex + 1}`] || ""
                  }
                  onChange={(e) =>
                    handleChange(elementIndex, fieldIndex, e.target.value)
                  }
                />
              )}
              {element.type === 3 && (
                <TextField
                  id={`integer-${elementIndex}-${fieldIndex}`}
                  label="Integer"
                  type="number"
                  variant="standard"
                  value={
                    formData[elementIndex]?.[`text${fieldIndex + 1}`] || ""
                  }
                  onChange={(e) =>
                    handleChange(elementIndex, fieldIndex, e.target.value)
                  }
                />
              )}
              {element.type === 4 && (
                <>
                  <Checkbox
                    className="mt-4"
                    onChange={(e) =>
                      handleChange(elementIndex, fieldIndex, e.target.checked)
                    }
                  />
                  <TextField
                    id={`option-${element.id}-${fieldIndex}`}
                    label={`Option ${element.id}`}
                    variant="standard"
                    value={
                      formData[elementIndex]?.[`text${fieldIndex + 1}`] || ""
                    }
                    onChange={(e) =>
                      handleChange(elementIndex, fieldIndex, e.target.value)
                    }
                    className="w-[40%]"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default DynamicForm;
