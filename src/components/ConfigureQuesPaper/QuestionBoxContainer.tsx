"use client";

import useDebounce from "@/app/hooks/useDeounce";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
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
import { useEffect, useState } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function QuestionBox({
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
  const [question, setQuestion] = useState("");
  const debouncedQuestion = useDebounce(question);
  const [type, setType] = useState(1);
  const [isRequired, setIsRequired] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [fields, setFields] = useState([{ id: 1 }]);
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
      fieldCount: fields.length,
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
    setFields([{ id: 1 }]);
  };

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
    <section className="flex flex-col bg-slate-200 p-4 rounded-lg mb-4">
      <div
        {...provided.dragHandleProps}
        className="cursor-grab flex items-center justify-center rounded-t-lg"
      >
        <span className="mb-2">☰</span>
      </div>
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
          {fields.map((field) => (
            <div key={field.id} className="flex items-center gap-2 mt-2">
              {type === 1 && (
                <TextField
                  id="standard-basic"
                  label="Short Answer"
                  variant="standard"
                  className="w-[50%]"
                />
              )}
              {type === 2 && (
                <TextField
                  id="standard-basic"
                  label="Paragraph"
                  variant="standard"
                  multiline
                  rows={2}
                  className="w-[70%]"
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
                  <Checkbox {...label} className="mt-4" />
                  <TextField
                    id="standard-basic"
                    label={`Option ${field.id}`}
                    variant="standard"
                    onChange={(e) => handleTextChange(field.id, e.target.value)}
                    className="w-[40%]"
                  />
                </>
              )}
              {field.id !== 1 && (
                <ClearIcon onClick={() => removeField(field.id)} />
              )}
            </div>
          ))}
          {fields.length < 4 && (
            <div
              className="flex justify-start mt-4 cursor-pointer w-fit"
              onClick={addField}
            >
              <AddIcon />
              <p>Add Option</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <button>
          <ContentCopyIcon />
        </button>
        <button onClick={() => handleDelete(index)}>
          <DeleteOutlineIcon />
        </button>
        <span className="border border-gray-400 mr-2 ml-2" />
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => setIsRequired(e.target.checked)}
              checked={isRequired}
            />
          }
          label="Required"
        />
      </div>
    </section>
  );
}

export default function QuestionBoxContainer({ setElements }: any) {
  const [sections, setSections] = useState<number[]>([1]);

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

  const handleDelete = (index: number) => {
    setElements((prev: any) => prev.filter((o: any) => o.index !== index));
    deleteSection(index);
  };

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    const reorderedSections = Array.from(sections);
    const [moved] = reorderedSections.splice(source.index, 1);
    reorderedSections.splice(destination.index, 0, moved);

    setElements((prev: any) => {
      const newElements = prev.map((o: any, i: number) => {
        o.index = reorderedSections[i];
        return o;
      });
      return newElements;
    });

    setSections(reorderedSections);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {sections.map((section, index) => (
                <Draggable
                  key={`section-${section}`}
                  draggableId={`section-${section}`}
                  index={index}
                >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <QuestionBox
                        index={index}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                        provided={provided}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="flex justify-end">
        <Fab size="small" color="primary" aria-label="add" onClick={addSection}>
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}
