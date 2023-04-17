import React from "react";
import "./CompaniesGrid.scss";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ICompany } from "../../types/global.typing";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 100 },
  { field: "size", headerName: "Size", width: 100 },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    width: 200,
    renderCell: (params) => {
      return new Date(params.value).toLocaleDateString();
    },
  },
];

interface ICompaniesGridProps {
  data: ICompany[];
}

const CompaniesGrid = ({ data }: ICompaniesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="companies-grid">
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

export default CompaniesGrid;
