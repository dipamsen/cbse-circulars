import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/Navbar";

import moment from "moment";

const API_URL = ["localhost", "127.0.0.1", ""].includes(
  window.location.hostname
)
  ? "http://localhost:1035"
  : "https://cbse-circulars-fp-api.vercel.app";
const API = axios.create({ baseURL: API_URL });

interface ExamCircular {
  name: string;
  date?: moment.Moment;
  html: string;
}

function App() {
  const [examCircularExpanded, setExamCircularExpanded] =
    useState<boolean>(false);
  const [examCirculars, setExamCirculars] = useState<ExamCircular[]>([]);
  useEffect(() => {
    async function getCirculars() {
      const {
        data,
      }: { data: { name: string; date?: string; html: string }[] } =
        await API.get("/exam-circulars");
      setExamCirculars(
        data.map((x) => ({
          date: moment(x.date?.split("/").reverse().join("-")),
          name: x.name,
          html: x.html,
        }))
      );
    }
    getCirculars();
  }, []);
  return (
    <div>
      <NavBar />
      <div style={{ width: "90%", margin: "auto", maxWidth: 800 }}>
        <h1>Examination Circulars</h1>
        {examCirculars
          .slice(0, examCircularExpanded ? examCirculars.length : 5)
          .map((cir) => (
            <div className="list-group">
              <div className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1" style={{ width: "90%" }}>
                    {cir.name}
                  </h5>
                  <small>{cir.date?.fromNow()}</small>
                </div>
                <p>{cir.date?.format("Do MMM YYYY")}</p>
                <p
                  className="mb-1"
                  dangerouslySetInnerHTML={{
                    __html: cir.html,
                  }}
                ></p>
              </div>
            </div>
          ))}
        <div
          onClick={(e) => {
            e.preventDefault();
            setExamCircularExpanded(!examCircularExpanded);
          }}
          className="text-end d-block small link-primary cursor-pointer text-decoration-underline"
        >
          Show {examCircularExpanded ? "Less" : "More"}...
        </div>
      </div>
    </div>
  );
}

export default App;
