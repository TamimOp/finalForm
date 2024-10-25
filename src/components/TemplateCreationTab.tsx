import { useEffect, useState } from "react";

type FilledTemplate = {
  id: number;
  title: string;
};

const TemplateCreationTab = () => {
  const [filledTemplates, setFilledTemplates] = useState<FilledTemplate[]>([]);

  useEffect(() => {
    const fetchFilledTemplates = async () => {
      try {
        const res = await fetch("/api/forms/get");
        const data: FilledTemplate[] = await res.json();
        setFilledTemplates(data);
      } catch (error) {
        console.error("Error fetching filled forms:", error);
      }
    };
    fetchFilledTemplates();
  }, []);

  return (
    <div>
      <ul className="mt-4 flex flex-wrap gap-6">
        {filledTemplates.map((form) => (
          <li key={form.id} className="w-[160px] h-[180px]">
            <a href={`/dashboard/forms/${form.id}/edit`}>{form.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateCreationTab;
