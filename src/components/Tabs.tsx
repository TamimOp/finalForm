import React from "react";
import { Tab, Tabs } from "@mui/material";
import BasicModal from "./BasicModal";

function TabForm() {
  return (
    <div>
      <Tabs value={0} centered>
        <Tab label="Questions" />
        <BasicModal />
      </Tabs>
    </div>
  );
}

export default TabForm;
