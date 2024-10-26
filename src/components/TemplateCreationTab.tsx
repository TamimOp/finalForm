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
        const data = await res.json();
        if (!data.message) setFilledTemplates(data);
      } catch (error) {
        console.error("Error fetching filled forms:", error);
      }
    };
    fetchFilledTemplates();
  }, []);

  return (
    <div>
      <ul className="flex flex-wrap gap-6">
        {filledTemplates &&
          filledTemplates?.map((form) => (
            <li
              key={form.id}
              className="border-2 border-blue-500 w-[180px] h-[220px] p-4 items-center text-center rounded-sm"
            >
              <a
                href={`/dashboard/forms/${form.id}/edit`}
                className="text-blue-600"
              >
                {form.title}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TemplateCreationTab;
