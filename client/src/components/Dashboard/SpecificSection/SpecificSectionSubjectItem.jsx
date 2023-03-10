import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { MdDelete, MdEdit, MdOutlineKeyboardArrowRight } from "react-icons/md";

function SpecificSectionSubjectItem({
  name,
  professor,
  schedule,
  onDelete,
  onEdit,
  onVisit,
  isProfessor,
}) {
  return (
    <div id="subject" className="card card-compact w-full  shadow-xl text-white">
      <div className="card-body flex">
        <h2 className="card-title">{name}</h2>
        <p>Professor: {professor}</p>
        <p>
          Schedule: {schedule.start} TO {schedule.end} {schedule.day}
        </p>
        <div className="card-actions justify-end">
          <Link
            onClick={onVisit}
            to={`/dashboard/sections/${name}/test`}
            className="btn btn-white btn-square btn-xs"
          >
            <MdOutlineKeyboardArrowRight size={16} />
          </Link>
          {isProfessor ? (
            <>
              <a onClick={onEdit} href="#edit_subject" className="btn btn-white btn-square btn-xs">
                <MdEdit size={16} />
              </a>
              <a
                onClick={onDelete}
                href="#delete_subject"
                className="btn btn-white btn-square btn-xs"
              >
                <MdDelete size={16} />
              </a>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

SpecificSectionSubjectItem.propTypes = {
  name: PropTypes.string.isRequired,
  professor: PropTypes.string.isRequired,
  schedule: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onVisit: PropTypes.func.isRequired,
  isProfessor: PropTypes.bool.isRequired,
};

export default SpecificSectionSubjectItem;
