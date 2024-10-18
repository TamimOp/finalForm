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
                  <MenuItem value={30}>Checkboxes</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <div>
          <div>Option</div>
          <div>Add Option</div>
        </div>
        <hr />
        <div className="flex gap-3 justify-end">
          <button>
            <ContentCopyIcon />
          </button>
          <button>
            <DeleteOutlineIcon />
          </button>
          <FormControlLabel required control={<Switch />} label="Required" />
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab size="small" color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Box>
        </div>
      </div>
    </>
  );
}

export default QuestionBox;
