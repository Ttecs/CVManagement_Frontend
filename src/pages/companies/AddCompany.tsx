import React from "react";
import "./Companies.scss";
import { ICreateCompanyDto } from "../../types/global.typing";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.helper";

function AddCompany() {
  const [comapny, setCompany] = React.useState<ICreateCompanyDto>({
    name: "",
    size: "",
  });

  const redirect = useNavigate();

  const handleClickSaveBtn = () => {
    if (comapny.name === "" || comapny.size === "") {
      alert("Please fill all the fields");
      return;
    }
    httpModule
      .post("/Company/Create", comapny)
      .then((res) => {
        redirect("/companies");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClickBackBtn = () => {
    redirect("/companies");
  };

  return (
    <div className="content">
      <div className="add-company">
        <h2>Add New Company</h2>
        <TextField
          autoComplete="off"
          label="Company Name"
          variant="outlined"
          name="name"
          value={comapny.name}
          onChange={(e) => setCompany({ ...comapny, name: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Company Size</InputLabel>
          <Select
            value={comapny.size}
            label="Company size"
            onChange={(e) => setCompany({ ...comapny, size: e.target.value })}
          >
            <MenuItem value="small">small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
          </Select>
        </FormControl>
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddCompany;
