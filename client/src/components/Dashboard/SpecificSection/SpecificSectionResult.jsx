import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import useAuth from "../../../hooks/useAuth";
import useSpecificSection from "../../../hooks/useSpecificSection";
import SpecificSectionSubjectItem from "./SpecificSectionSubjectItem";

function SpecificSectionResult() {
  const { auth } = useAuth();
  const { section, dispatch } = useSpecificSection();
  const subjects = section.subjects;
  console.log(subjects);

  return (
    <>
      <div id="subject-container" className="flex-1 mt-2 rounded-t-lg">
        <div className="bg-green-800 p-2 rounded-t-lg">
          <button className=" btn btn-sm text-black mr-4">ALL</button>
          <button className="text-white">HANDLED</button>
        </div>
        <div className="grid grid-cols-4 p-2 gap-4">
          {subjects === undefined
            ? null
            : subjects.map((subject) => (
                <SpecificSectionSubjectItem
                  key={subject.id}
                  name={subject.subject_name}
                  professor={subject.handled_by}
                  schedule={subject.schedule}
                  isProfessor={auth.id === subject.handler_id}
                  onVisit={() => dispatch({ type: "SET_SUBJECT", payload: { ...subject } })}
                  onDelete={() =>
                    dispatch({ type: "SET_SUBJECT_NAME", payload: subject.subject_name })
                  }
                  onEdit={() => dispatch({ type: "SET_EDIT_SUBJECT", payload: { ...subject } })}
                />
              ))}
        </div>
      </div>
    </>
  );
}

export default SpecificSectionResult;
