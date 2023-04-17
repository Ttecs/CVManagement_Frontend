import React from "react";
import "./Jobs.scss";
import { ICompany, ICreateJobDto } from "../../types/global.typing";
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

const levels: string[] = [
  "intern",
  "junior",
  "midlevel",
  "senior",
  "TeamLead",
  "Cto",
];

function AddJob() {
  const [job, setJob] = React.useState<ICreateJobDto>({
    companyId: "",
    level: "",
    title: "",
  });

  console.log(job);
  const [companies, setCompanies] = React.useState<ICompany[]>([]);

  const redirect = useNavigate();

  React.useEffect(() => {
    httpModule
      .get("/Company/Get")
      .then((res) => {
        setCompanies(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (job.companyId === "" || job.level === "" || job.title === "") {
      alert("Please fill all the fields");
      return;
    }
    httpModule
      .post("/Job/Create", job)
      .then((res) => {
        redirect("/jobs");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClickBackBtn = () => {
    redirect("/jobs");
  };

  return (
    <div className="content">
      <div className="add-jobs">
        <h2>Add New Job</h2>
        <TextField
          autoComplete="off"
          label="Job Title"
          variant="outlined"
          name="name"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Job Level</InputLabel>
          <Select
            value={job.level}
            label="Job Level"
            onChange={(e) => setJob({ ...job, level: e.target.value })}
          >
            {levels.map((level) => {
              return (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Company</InputLabel>
          <Select
            value={job.companyId}
            label="Company"
            onChange={(e) => setJob({ ...job, companyId: e.target.value })}
          >
            {companies.map((level) => {
              return (
                <MenuItem key={level.id} value={level.id}>
                  {level.name}
                </MenuItem>
              );
            })}
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

export default AddJob;
