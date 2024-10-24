import { Tab, Tabs } from "@mui/material";
import BasicModal from "./BasicModal";

function TabForm({ form }: any) {
  return (
    <div>
      <Tabs value={0} centered>
        <Tab label="Questions" />
        <BasicModal form={form} />
      </Tabs>
    </div>
  );
}

export default TabForm;
