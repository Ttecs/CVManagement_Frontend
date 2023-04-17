import React from "react";
import "./Candidate.scss";
import { ICreateCandidateDto, IJob } from "../../types/global.typing";
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

function AddCandidate() {
  const [candidate, setCandidate] = React.useState<ICreateCandidateDto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    jobId: "",
  });

  const [jobs, setJobs] = React.useState<IJob[]>([]);
  const [pdfFile, setPdfFile] = React.useState<File | null>(null);

  const redirect = useNavigate();

  React.useEffect(() => {
    httpModule
      .get("/Job/Get")
      .then((res) => {
        setJobs(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (
      !candidate.firstName ||
      !candidate.lastName ||
      !candidate.email ||
      !candidate.phone ||
      !candidate.coverLetter ||
      !candidate.jobId ||
      !pdfFile
    ) {
      alert("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("firstName", candidate.firstName);
    formData.append("lastName", candidate.lastName);
    formData.append("email", candidate.email);
    formData.append("phone", candidate.phone);
    formData.append("coverLetter", candidate.coverLetter);
    formData.append("jobId", candidate.jobId);
    formData.append("pdfFile", pdfFile);
    httpModule
      .post("/Candidate/Create", formData)
      .then((res) => {
        redirect("/candidates");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClickBackBtn = () => {
    redirect("/candidates");
  };

  return (
    <div className="content">
      <div className="add-candidates">
        <h2>Add New Candidate</h2>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Job</InputLabel>
          <Select
            value={candidate.jobId}
            label="Job"
            onChange={(e) =>
              setCandidate({ ...candidate, jobId: e.target.value })
            }
          >
            {jobs.map((level) => {
              return (
                <MenuItem key={level.id} value={level.id}>
                  {level.title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          autoComplete="off"
          label="First Name"
          variant="outlined"
          value={candidate.firstName}
          onChange={(e) =>
            setCandidate({ ...candidate, firstName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Last Name"
          variant="outlined"
          value={candidate.lastName}
          onChange={(e) =>
            setCandidate({ ...candidate, lastName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Email"
          variant="outlined"
          value={candidate.email}
          onChange={(e) =>
            setCandidate({ ...candidate, email: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Phone"
          variant="outlined"
          value={candidate.phone}
          onChange={(e) =>
            setCandidate({ ...candidate, phone: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Cover Letter"
          variant="outlined"
          value={candidate.coverLetter}
          onChange={(e) =>
            setCandidate({ ...candidate, coverLetter: e.target.value })
          }
        />

        <input type="file" onChange={(e) => setPdfFile(e.target.files![0])} />

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

export default AddCandidate;
