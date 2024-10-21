"use client";

import useDebounce from "@/app/hooks/useDeounce";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function QuestionBox({
  index,
  handleDelete,
  handleUpdate,
}: {
  index: number;
  handleDelete: (index: number) => void;
  handleUpdate: (item: any) => void;
}) {
  const [question, setQuestion] = useState("");
  const debouncedQuestion = useDebounce(question);
  const [type, setType] = useState(1);
  const [isRequired, setIsRequired] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");

  useEffect(() => {
    handleUpdate({
      index: currentIndex,
      question: debouncedQuestion,
      text1,
      text2,
      text3,
      text4,
      type,
      required: isRequired,
    });
  }, [
    currentIndex,
    debouncedQuestion,
    type,
    text1,
    text2,
    text3,
    text4,
    isRequired,
  ]);

  const handleChange = (event: SelectChangeEvent) => {
    setType(Number(event.target.value));
  };

  return (
    <>
      <section className="flex flex-col bg-slate-200 p-4 rounded-lg mb-4">
        <div className="flex flex-row justify-between">
          <div>
            <Box sx={{ "& > :not(style)": { width: 500, maxWidth: "100%" } }}>
              <TextField
                id="standard-basic"
                label="Question"
                variant="standard"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Box>
          </div>
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={`${type}`}
                  label="Type"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Short answer</MenuItem>
                  <MenuItem value={2}>Paragraph</MenuItem>
                  <MenuItem value={3}>Integers</MenuItem>
                  <MenuItem value={4}>Checkboxes</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <div>
          <div>
            {type === 1 && (
              <TextField
                id="standard-basic"
                label="Short Answer"
                variant="standard"
              />
            )}
            {type === 2 && (
              <TextField
                id="standard-basic"
                label="Paragraph"
                variant="standard"
                multiline
                rows={4}
              />
            )}
            {type === 3 && (
              <TextField
                id="standard-basic"
                label="Integer"
                type="number"
                variant="standard"
              />
            )}
            {type === 4 && (
              <>
                <Checkbox {...label} className="mt-3" />
                <TextField
                  id="standard-basic"
                  label="option"
                  variant="standard"
                  onChange={(e: any) => setText1(e.target.value)}
                  className="text-center"
                />
              </>
            )}
          </div>
        </div>
        <hr />
        <div className="flex gap-3 justify-end">
          <button>
            <ContentCopyIcon />
          </button>
          <button onClick={() => handleDelete(index)}>
            <DeleteOutlineIcon />
          </button>
          <span className="border border-gray-400 mr-2 ml-2" />
          <FormControlLabel
            required={isRequired}
            control={
              <Switch onChange={(e) => setIsRequired(e.target.checked)} />
            }
            label="Required"
          />
        </div>
      </section>
    </>
  );
}

export default function QuestionBoxContainer({ setElements }: any) {
  const [sections, setSections] = React.useState<number[]>([1]);

  const addSection = () => {
    setSections((prev) => [...prev, prev.length + 1]);
  };

  const deleteSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdate = (item: any) => {
    setElements((prev: any) => {
      const newElements = prev.filter((o: any) => o.index !== item.index);
      newElements.push(item);
      return newElements;
    });
  };

  return (
    <>
      {sections.map((_, index) => (
        <QuestionBox
          key={index}
          index={index}
          handleDelete={deleteSection}
          handleUpdate={handleUpdate}
        />
      ))}

      <div className="flex-col pr-2">
        <Box
          sx={{ "& > :not(style)": { m: 1 } }}
          className="flex gap-3 justify-end"
        >
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            onClick={addSection}
          >
            <AddIcon />
          </Fab>
        </Box>
      </div>
    </>
  );
}
