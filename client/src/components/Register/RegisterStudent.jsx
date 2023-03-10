import React, { useContext, useState } from "react";
import { Formik } from "formik";
import axios from "axios";

//Icons
import { HiIdentification } from "react-icons/hi";
import { FaEnvelope } from "react-icons/fa";
import { BsFillShieldLockFill, BsShieldFillExclamation } from "react-icons/bs";

// Schema
import { registerStudentSchema } from "../../schemas/RegisterSchema";

// Components
import CustomInput from "../Shared/CustomInput";
import CustomInputGroup from "../Shared/CustomInputGroup";
import spinner from "../../assets/spinner.gif";

// Hooks
import useCreate from "../../hooks/useCreate";
import Button from "../Shared/Button";

function RegisterStudent() {
  const { setSuccess } = useCreate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (state, action) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/v1/users",
        { ...state, type: "student" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        setTimeout(() => {
          setSuccess(true);
          setLoading(false);
          action.resetForm();
        }, 1500);
      }
    } catch (e) {
      setLoading(false);
      if (e.response.data["msg"] === "Student no. already taken.") {
        action.setFieldError("studentNumber", "Student no. already exists.");
      } else if (e.response.data["msg"] === "Email already taken.") {
        action.setFieldError("emailAddress", "Email already exists.");
      } else if (e.response.data["msg"] === "Student number & Email already taken.") {
        action.setFieldError("studentNumber", "Student no. already exists.");
        action.setFieldError("emailAddress", "Email already exists.");
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          middleInitial: "",
          lastName: "",
          studentNumber: "",
          emailAddress: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerStudentSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form action="" className="mt-10 " onSubmit={props.handleSubmit}>
            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <CustomInput
                page="register"
                label="First name"
                name="firstName"
                type="text"
                placeholder="First name"
              />
              <CustomInput
                page="register"
                label="Middle Initial"
                name="middleInitial"
                type="text"
                placeholder="Middle Initial"
                maxLength={1}
              />
              <CustomInput
                page="register"
                label="Last name"
                name="lastName"
                type="text"
                placeholder="Last name"
              />
            </div>

            {/* Student ID, Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CustomInputGroup
                page="register"
                label="Student Number"
                name="studentNumber"
                type="number"
                placeholder="Student no."
                onWheel={(e) => e.target.blur()}
                icon={<HiIdentification />}
              />

              <CustomInputGroup
                page="register"
                label="Email"
                name="emailAddress"
                type="email"
                placeholder="Email"
                icon={<FaEnvelope />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CustomInputGroup
                page="register"
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                icon={<BsFillShieldLockFill />}
              />

              <CustomInputGroup
                page="register"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Password"
                icon={<BsShieldFillExclamation />}
              />
            </div>

            <Button
              styles={`btn-primary w-full mt-4 ${
                loading ? "disabled:opacity-75 disabled:btn-primary" : ""
              }`}
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <>
                  <img src={spinner} alt="" className="w-5 h-5 mr-2" />
                  <p>CREATING ACCOUNT ...</p>
                </>
              ) : (
                "CREATE ACCOUNT"
              )}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default RegisterStudent;
