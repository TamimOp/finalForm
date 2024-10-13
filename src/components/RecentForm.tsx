import { IconButton, Tooltip } from "@mui/material";
import FolderOpenSharpIcon from "@mui/icons-material/FolderOpenSharp";
import StorageSharpIcon from "@mui/icons-material/StorageSharp";

export default function RecentForm() {
  return (
    <div className="max-w-6xl mx-auto bg-main">
      <div className="flex justify-between mt-4">
        <div className="text-lg font-medium">Recent forms</div>
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
      <div className="grid grid-cols-5 gap-4 mt-8">
        {/* Example card structure for files */}
        <div className="p-4 border rounded">Document 1</div>
        <div className="p-4 border rounded">Document 2</div>
        <div className="p-4 border rounded">Document 3</div>
      </div>
    </div>
  );
}
