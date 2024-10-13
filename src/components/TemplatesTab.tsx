import { useEffect, useState } from "react";

type Template = {
  id: number;
  title: string;
  description: string;
};

const TemplatesTab = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch("/api/templates");
        const data: Template[] = await res.json();
        setTemplates(data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">My Templates</h2>
      <ul className="mt-4">
        {templates.map((template) => (
          <li key={template.id}>
            <a href={`/dashboard/template/${template.id}`}>
              {template.title} - {template.description}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplatesTab;
