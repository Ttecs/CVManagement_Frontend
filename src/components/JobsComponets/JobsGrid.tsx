import React from "react";
import "./JobsGrid.scss";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IJob } from "../../types/global.typing";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Title", width: 500 },
  { field: "level", headerName: "Level", width: 150 },
  { field: "companyName", headerName: "Company Name", width: 150 },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    width: 200,
    renderCell: (params) => {
      //time from now
      const date = new Date(params.value);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const diffDays = Math.floor(diff / (1000 * 3600 * 24));
      const diffHours = Math.floor(diff / (1000 * 3600));
      const diffMinutes = Math.floor(diff / (1000 * 60));
      const diffSeconds = Math.floor(diff / 1000);
      if (diffDays > 0) {
        return `${diffDays} days ago`;
      } else if (diffHours > 0) {
        return `${diffHours} hours ago`;
      } else if (diffMinutes > 0) {
        return `${diffMinutes} minutes ago`;
      } else if (diffSeconds > 0) {
        return `${diffSeconds} seconds ago`;
      } else {
        return "Just now";
      }
    },
  },
];

interface IJobsGridProps {
  data: IJob[];
}

const JobsGrid = ({ data }: IJobsGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="jobs-grid">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => {
          return row.id;
        }}
        rowHeight={50}
      />
    </Box>
  );
};

export default JobsGrid;
