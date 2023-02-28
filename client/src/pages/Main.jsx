import axios from "axios";
import { useEffect, useState } from "react";
import { FcReading, FcSms, FcGraduationCap } from "react-icons/fc";
import BeatLoader from "react-spinners/BeatLoader";

import useFetch from "../hooks/useFetch";

function Main() {
  const [students, setStudents] = useState(0);
  const [lectures, setLectures] = useState(0);
  const [classrooms, setClassrooms] = useState(0);
  const { data, error, loading } = useFetch("/api/dashboard", "total");
  useEffect(() => {
    if (data != null) {
      setStudents(data.students);
      setLectures(data.lectures);
      setClassrooms(data.classrooms);
    }
  }, [data]);
  return (
    <>
      <h1 className="text-4xl text-green-800">DASHBOARD</h1>
      <p>Welcome USER!</p>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="stat shadow  rounded-lg bg-white hover:scale-105">
          <div className="stat-figure">
            <FcSms size={40} />
          </div>
          <div className="stat-title">TOTAL CLASSROOM</div>
          <div className="stat-value">{loading ? <BeatLoader color="#436147" /> : classrooms}</div>
          <div className="stat-desc">Total classroom registered in the system.</div>
        </div>
        <div className="stat shadow  rounded-lg bg-white hover:scale-105">
          <div className="stat-figure">
            <FcGraduationCap size={40} />
          </div>
          <div className="stat-title text-primary">TOTAL STUDENTS</div>
          <div className="stat-value ">{loading ? <BeatLoader color="#436147" /> : students}</div>
          <div className="stat-desc">Total students registered in the system.</div>
        </div>
        <div className="stat shadow  rounded-lg bg-white hover:scale-105">
          <div className="stat-figure">
            <FcReading size={40} />
          </div>
          <div className="stat-title">TOTAL LECTURES CONDUCTED</div>
          <div className="stat-value">{loading ? <BeatLoader color="#436147" /> : lectures}</div>
          <div className="stat-desc">Total lectures you have conducted.</div>
        </div>
      </div>
      <div className="flex bg-green-900 mt-4 w-2/4">kyu</div>
    </>
  );
}
export default Main;
