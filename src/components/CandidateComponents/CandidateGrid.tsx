import React from "react";
import "./CandidateGrid.scss";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ICandidate } from "../../types/global.typing";
import { baseUrl } from "../../constants/url.constants";
import { PictureAsPdf } from "@mui/icons-material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First Name", width: 120 },
  { field: "lastName", headerName: "Last Name", width: 120 },
  { field: "email", headerName: "Email", width: 120 },
  { field: "phone", headerName: "Phone", width: 120 },
  { field: "coverLetter", headerName: "Cover Letter", width: 400 },
  {
    field: "resumeurl",
    headerName: "Download",
    width: 150,
    renderCell: (params) => (
      <a
        href={`${baseUrl}/Candidate/download/${params.row.resumeURL}`}
        download
      >
        <PictureAsPdf />
      </a>
    ),
  },
];

interface ICandidateGridProps {
  data: ICandidate[];
}

const CandidateGrid = ({ data }: ICandidateGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="candidate-grid">
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

export default CandidateGrid;
