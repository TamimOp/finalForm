"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Answer {
  fid: number;
  uid: number;
  eid: number;
  selected1?: number;
  selected2?: number;
  selected3?: number;
  selected4?: number;
  text1?: string;
  text2?: string;
  text3?: string;
  text4?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [responses, setResponses] = useState<any>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const params = useParams();
  const fid = params.fid;
  console.log(responses);
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch(`/api/forms/${fid}/get`);
        const data = await res.json();

        setResponses(data.groupedAnswersByUid);
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };

    fetchResponses();
  }, [fid]);

  return (
    <>
      <div className="m-10">
        <h1>Responses</h1>
      </div>

      <div className="flex justify-center items-center">
        <Box sx={{ bgcolor: "background.paper", width: 1200 }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Individual" {...a11yProps(0)} />
              <Tab label="Summury" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ul>
              {responses &&
                Object.keys(responses).map((key) =>
                  responses[key].map((response: Answer) => {
                    return (
                      <li
                        className="bg-slate-200 p-4 rounded-sm m-2"
                        key={response.uid}
                      >
                        <h1>USER {response.uid}</h1>
                        Answer {response.eid}: {response.text1}
                      </li>
                    );
                  })
                )}
            </ul>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Summury
          </TabPanel>
        </Box>
      </div>
    </>
  );
}
