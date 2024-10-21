import { IconButton, Tooltip } from "@mui/material";
import FolderOpenSharpIcon from "@mui/icons-material/FolderOpenSharp";
import StorageSharpIcon from "@mui/icons-material/StorageSharp";
import FilledFormsTab from "./FilledFormsTab";

export default function RecentForm() {
  return (
    <div className="max-w-6xl mx-auto bg-main">
      <div className="flex justify-between mt-4">
        <div className="text-lg font-bold">Recent forms</div>
        <div className="flex">
          <Tooltip title="Table View">
            <IconButton>
              <StorageSharpIcon className="text-black text-sm" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Folder View">
            <IconButton>
              <FolderOpenSharpIcon className="text-black text-sm" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* File view layout without logic */}
      <div className="p-4">
        {/* Example card structure for files */}
        <FilledFormsTab />
      </div>
    </div>
  );
}
