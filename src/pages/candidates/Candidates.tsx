import React, { useState, useEffect } from "react";
import "./Candidate.scss";
import httpModule from "../../helpers/http.helper";
import { ICandidate } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

import CandidateGrid from "../../components/CandidateComponents/CandidateGrid";
//import CompaniesGrid from "../../components/CompanyComponents/CompaniesGrid";

function Candidate() {
  const [candaidate, setCandidate] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get("/Candidate/Get")
      .then((res) => {
        setCandidate(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content candidates">
      <div className="heading">
        <h2>Candidates</h2>
        <Button variant="outlined" onClick={() => navigate("/candidates/add")}>
          {" "}
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : candaidate.length === 0 ? (
        <h3>No candidates Found</h3>
      ) : (
        <CandidateGrid data={candaidate} />
      )}
    </div>
  );
}

export default Candidate;
