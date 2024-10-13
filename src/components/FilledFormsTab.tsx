// src/app/dashboard/FilledFormsTab.tsx
import { useEffect, useState } from "react";

type FilledForm = {
  id: number;
  title: string;
};

const FilledFormsTab = () => {
  const [filledForms, setFilledForms] = useState<FilledForm[]>([]);

  useEffect(() => {
    const fetchFilledForms = async () => {
      try {
        const res = await fetch("/api/forms");
        const data: FilledForm[] = await res.json(); // Ensure data matches the FilledForm[] type
        setFilledForms(data);
      } catch (error) {
        console.error("Error fetching filled forms:", error);
      }
    };
    fetchFilledForms();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Filled Forms</h2>
      <ul className="mt-4">
        {filledForms.map((form) => (
          <li key={form.id}>
            <a href={`/dashboard/form/${form.id}`}>{form.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilledFormsTab;
