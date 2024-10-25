import { Tab, Tabs } from "@mui/material";
import BasicModal from "./BasicModal";
import { useRouter } from "next/navigation";

function TabForm({ form }: any) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/dashboard/forms/${form.id}/edit/response`);
  };
  return (
    <div>
      <Tabs value={0} centered>
        <Tab label="Questions" />
        <BasicModal form={form} />
        <Tab label="Responses" onClick={handleClick} />
      </Tabs>
    </div>
  );
}

export default TabForm;
