import React, { useState, useEffect } from "react";
import "./Companies.scss";
import httpModule from "../../helpers/http.helper";
import { ICompany } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import CompaniesGrid from "../../components/CompanyComponents/CompaniesGrid";

function Companies() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get("/Company/Get")
      .then((res) => {
        setCompanies(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content companies">
      <div className="heading">
        <h2>Companies</h2>
        <Button variant="outlined" onClick={() => navigate("/companies/add")}>
          {" "}
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : companies.length === 0 ? (
        <h3>No Companies Found</h3>
      ) : (
        <CompaniesGrid data={companies} />
      )}
    </div>
  );
}

export default Companies;
