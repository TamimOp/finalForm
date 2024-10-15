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
        const res = await fetch("/api/forms/get");
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
      <ul className="mt-4 flex flex-wrap gap-6">
        {filledForms.map((form) => (
          <li
            key={form.id}
            className="border-2 border-black w-[180px] h-[180px]"
          >
            <a href={`/dashboard/forms/${form.id}`}>{form.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilledFormsTab;