import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function QuestionBox() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <>
      <div className="flex flex-col bg-slate-200 p-4 rounded-lg">
        <div className="flex flex-row justify-between">
          <div>
            <Box
              component="form"
              sx={{ "& > :not(style)": { width: 500, maxWidth: "100%" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Question"
                variant="standard"
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
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Short answer</MenuItem>
                  <MenuItem value={20}>Paragraph</MenuItem>
                  <MenuItem value={30}>Integers</MenuItem>
                  <MenuItem value={40}>Checkboxes</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <div>
          <div>
            <TextField
              id="standard-basic"
              label="short answer text"
              variant="standard"
            />
          </div>
          <div>
            <Checkbox {...label} className="mt-3" />
            <TextField
              id="standard-basic"
              label="option"
              variant="standard"
              className="text-center"
            />
          </div>
        </div>
        <hr />
        <div className="flex gap-3 justify-end">
          <button>
            <ContentCopyIcon />
          </button>
          <button>
            <DeleteOutlineIcon />
          </button>
          <span className="border border-gray-400 mr-2 ml-2" />
          <FormControlLabel required control={<Switch />} label="Required" />
        </div>
      </div>
      <div className="flex-col pr-2">
        <Box
          sx={{ "& > :not(style)": { m: 1 } }}
          className="flex gap-3 justify-end"
        >
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
      </div>
    </>
  );
}

export default QuestionBox;
