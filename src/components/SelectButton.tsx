import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function SelectButton({ share, setShare }: any) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Share</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={`${share}`}
          label="Share"
          onChange={(e: any) => setShare(Number(e.target.value))}
        >
          <MenuItem value={1}>Restricted</MenuItem>
          <MenuItem value={2}>Public</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
