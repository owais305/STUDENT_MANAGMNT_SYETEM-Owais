import React, { useEffect, useState } from "react";
import style from "../../style/auth/Signup.module.css"; 
import { MdSecurity } from "react-icons/md";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../apis/api.js";
import cookies from "js-cookie";

function Signup() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Role Selection
  const handleRole = (selectedRole) => {
    setFormData({
      ...formData,
      role: selectedRole,
    });

    setError("");
  };

  // Submit Form
  const formHandle = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      return setError("Please select a role");
    }

    try {
      const data = await signupUser(formData);

      console.log(data);

      setError("");
      alert("Signup Successful");

      // Navigate according to role
      if (data?.data?.role === "admin") {
        navigate("/admin-dashboard");
      } else if (data?.data?.role === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/student-dashboard");
      }

      // Reset Form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.log(error.message);
      setError(error.message || "Signup failed");
    }
  };

  // Check Token
  useEffect(() => {
    const token = cookies.get("token");
    const role = cookies.get("role");

    if (token) {
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    }
  }, [navigate]);

  return (
    <div className={style.container}>
      <div className={style.inrContainer}>
        <div className={style.heading}>
          <h1>Create Account</h1>
        </div>

        <form className={style.form} onSubmit={formHandle}>
          {error && <p className={style.error}>{error}</p>}

          {/* Profile Pic */}
          <div className={style.profilePic}>
            <MdOutlineAddAPhoto
              className={style.pick}
              fontSize={"20px"}
            />
          </div>

          {/* First Name */}
          <div className={style.name}>
            <p>First Name</p>
            <input
              className={style.signupInputs}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              type="text"
              placeholder="Raj"
            />
          </div>

          {/* Last Name */}
          <div className={style.name}>
            <p>Last Name</p>
            <input
              className={style.signupInputs}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              type="text"
              placeholder="Kumar"
            />
          </div>

          {/* Email */}
          <div className={style.secondDivs}>
            <p>Email Address</p>
            <input
              className={style.signupInputs1}
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="raj@gmail.com"
            />
          </div>

          {/* Phone */}
          <div className={style.secondDivs}>
            <p>Phone Number</p>
            <input
              className={style.signupInputs1}
              type="tel"
              minLength={10}
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
            />
          </div>

          {/* Password */}
          <div className={style.secondDivs}>
            <p>Password</p>

            <input
              className={style.signupInputs1}
              minLength={8}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              type={show ? "text" : "password"}
              placeholder="Min. 8 Characters"
            />

            <button
              type="button"
              className={style.showPassword}
              onClick={() => setShow(!show)}
            >
              {show ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Role Selection */}
          <div className={style.roleDiv}>
            <p>Choose Your Role</p>

            <div className={style.roleDivInr}>
              {/* Student */}
              <div
                className={`${style.roleBoxes} ${
                  formData.role === "student"
                    ? style.activeRole
                    : ""
                }`}
                onClick={() => handleRole("student")}
              >
                <PiStudent fontSize={"35px"} />
                <p>Student</p>
                <p>Study Courses</p>
              </div>

              {/* Teacher */}
              <div
                className={`${style.roleBoxes} ${
                  formData.role === "teacher"
                    ? style.activeRole
                    : ""
                }`}
                onClick={() => handleRole("teacher")}
              >
                <LiaChalkboardTeacherSolid fontSize={"35px"} />
                <p>Teacher</p>
                <p>Create Course</p>
              </div>

              {/* Admin */}
              <div
                className={`${style.roleBoxes} ${
                  formData.role === "admin"
                    ? style.activeRole
                    : ""
                }`}
                onClick={() => handleRole("admin")}
              >
                <MdSecurity fontSize={"35px"} />
                <p>Admin</p>
                <p>Full Access</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className={style.signupBtn}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;