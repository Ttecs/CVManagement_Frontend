import React, { useState, useEffect } from "react";
import "./Jobs.scss";
import httpModule from "../../helpers/http.helper";
import { IJob } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import JobsGrid from "../../components/JobsComponets/JobsGrid";
//import CompaniesGrid from "../../components/CompanyComponents/CompaniesGrid";

function Jobs() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get("/Job/Get")
      .then((res) => {
        setJobs(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content jobs">
      <div className="heading">
        <h2>Jobs</h2>
        <Button variant="outlined" onClick={() => navigate("/jobs/add")}>
          {" "}
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : jobs.length === 0 ? (
        <h3>No Jobs Found</h3>
      ) : (
        <JobsGrid data={jobs} />
      )}
    </div>
  );
}

export default Jobs;
