"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

type Element = {
  id: number;
  type: number;
  index: number;
  fid: number;
  question: string;
  required: boolean;
  fieldCount: number;
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

function Edit({
  index,
  handleDelete,
  handleUpdate,
  provided,
}: {
  index: number;
  handleDelete: (index: number) => void;
  handleUpdate: (item: any) => void;
  provided: any;
}) {
  const params = useParams();
  const fid = params.fid;
  const [formData, setFormData] = useState<TemplateData | null>(null);
  const [fields, setFields] = useState([{ id: 1 }]);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch(`/api/forms/${fid}`);
        const data = await res.json();

        if (data && data.data) {
          setFormData(data.data);
          setTitle(data.data.form.title);
          setDescription(data.data.form.description);
          setElements(data.data.elements);
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, [fid]);

  const addField = () => {
    if (fields.length < 4) {
      setFields([...fields, { id: fields.length + 1 }]);
    }
  };

  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };
  const handleTextChange = (id: number, value: string) => {
    switch (id) {
      case 1:
        setText1(value);
        break;
      case 2:
        setText2(value);
        break;
      case 3:
        setText3(value);
        break;
      case 4:
        setText4(value);
        break;
    }
  };

  return (
    <div className="bg-slate-100">
      {formData ? (
        <>
          <form className="container mx-auto px-4 py-8 flex flex-col gap-3 justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                label="Template Title"
                variant="filled"
                className="w-[700px]"
              />

              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label="Description"
                variant="filled"
                size="small"
                className="w-[700px]"
              />
            </div>
            <div className="container item-center w-[700px]">
              <section className="flex flex-col bg-slate-200 p-4 rounded-lg mb-4">
                {elements.length > 0 ? (
                  elements.map((element: Element) => (
                    <React.Fragment key={element.id}>
                      <div className="flex flex-row justify-between mb-4">
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
                            onChange={(e) => {
                              setElements((prevState) => {
                                const newQues = [...prevState];
                                newQues.forEach((obj: Element) => {
                                  if (obj.index === element.index) {
                                    obj.question = e.target.value;
                                  }
                                });
                                return newQues;
                              });
                            }}
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
                      <div>
                        {fields.map((field) => (
                          <div
                            key={field.id}
                            className="flex items-center gap-2 mb-6"
                          >
                            {element.type === 1 && (
                              <TextField
                                id="standard-basic"
                                label="Short Answer"
                                variant="standard"
                                className="w-[50%]"
                              />
                            )}
                            {element.type === 2 && (
                              <TextField
                                id="standard-basic"
                                label="Paragraph"
                                variant="standard"
                                multiline
                                rows={2}
                                className="w-[70%]"
                              />
                            )}
                            {element.type === 3 && (
                              <TextField
                                id="standard-basic"
                                label="Integer"
                                type="number"
                                variant="standard"
                              />
                            )}
                            {element.type === 4 && (
                              <>
                                <Checkbox {...label} className="mt-4" />
                                <TextField
                                  id="standard-basic"
                                  label={`Option ${field.id}`}
                                  variant="standard"
                                  onChange={(e) =>
                                    handleTextChange(field.id, e.target.value)
                                  }
                                  className="w-[40%]"
                                />
                              </>
                            )}
                            {field.id !== 1 && (
                              <ClearIcon
                                onClick={() => removeField(field.id)}
                              />
                            )}
                          </div>
                        ))}
                        {fields.length < 4 && (
                          <>
                            <div
                              className="flex justify-start mb-8 cursor-pointer w-fit"
                              onClick={addField}
                            >
                              <AddIcon />
                              <p>Add Option</p>
                              <span className="border-black border-b-2" />
                            </div>
                          </>
                        )}
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <p className="text-gray-500">No elements found.</p>
                )}
              </section>
            </div>
            <button className="bg-blue-500 rounded-lg px-2 py-1">Update</button>
          </form>
        </>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}

export default Edit;
