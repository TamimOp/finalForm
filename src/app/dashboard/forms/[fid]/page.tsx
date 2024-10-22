"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

type Element = {
  id: number;
  type: number;
  index: number;
  fid: number;
  question: string;
  required: boolean;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
};

type Form = {
  id: number;
  uid: number;
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

type TemplateData = {
  elements: Element[];
  form: Form;
};

function Forms() {
  const params = useParams();
  const fid = params.fid;
  const [formData, setFormData] = useState<TemplateData | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch(`/api/forms/${fid}`);
        const data = await res.json();

        if (data && data.data) {
          setFormData(data.data);
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, [fid]);

  return (
    <div className="bg-slate-100">
      {formData ? (
        <>
          <form className="container mx-auto px-4 py-8 flex flex-col gap-3 justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
              <TextField
                value={formData.form.title}
                onChange={(e) => e.target.value}
                required
                label="Template Title"
                variant="filled"
                className="w-[700px]"
              />

              <TextField
                value={formData.form.description}
                onChange={(e) => e.target.value}
                label="Description"
                variant="filled"
                size="small"
                className="w-[700px]"
              />
            </div>
            <div className="container item-center w-[700px]">
              <section className="flex flex-col bg-slate-200 p-4 rounded-lg mb-4">
                {formData.elements.length > 0 ? (
                  formData.elements.map((element) => (
                    <>
                      <div className="flex flex-row justify-between mb-8">
                        <Box
                          key={element.id}
                          sx={{
                            "& > :not(style)": { width: 500, maxWidth: "100%" },
                          }}
                        >
                          <TextField
                            id="standard-basic"
                            label="Question"
                            variant="standard"
                            value={element.question}
                            onChange={(e) => e.target.value}
                          />
                        </Box>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Type
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={`${element.type}`}
                              label="Type"
                            >
                              <MenuItem value={1}>Short answer</MenuItem>
                              <MenuItem value={2}>Paragraph</MenuItem>
                              <MenuItem value={3}>Integers</MenuItem>
                              <MenuItem value={4}>Checkboxes</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                    </>
                  ))
                ) : (
                  <p className="text-gray-500">No elements found.</p>
                )}
              </section>
            </div>
          </form>
        </>
      ) : (
        <p className="text-gray-500">No templates found.</p>
      )}
    </div>
  );
}

export default Forms;
