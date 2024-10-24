import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectButton() {
  const [share, setShare] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setShare(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Share</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={share}
          label="Share"
          onChange={handleChange}
        >
          <MenuItem value={1}>Restricted</MenuItem>
          <MenuItem value={2}>Public</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
