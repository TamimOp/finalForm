import React from "react";
import { Tab, Tabs } from "@mui/material";

function TabForm() {
  return (
    <div>
      <Tabs value={0} centered>
        <Tab label="Questions" />
        <Tab label="Response" />
        <Tab label="Setting" />
      </Tabs>
    </div>
  );
}

export default TabForm;
