import { useState } from "react";

function AddStudentModal({ onClose, addStudent }) {
  const [student, setStudent] = useState({
    rollNo: "",
    name: "",
    branch: "CSE",
    semester: 1,
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const temp = {};

    if (!student.rollNo.trim()) {
      temp.rollNo = "Roll Number is required.";
    }

    if (!student.name.trim()) {
      temp.name = "Student Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(student.email)) {
      temp.email = "Invalid Email.";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await addStudent({
        rollNo: student.rollNo,
        name: student.name,
        email: student.email,
        branch: student.branch,
        semester: Number(student.semester),
      });

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add student.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Add Student</h2>

        <input
          name="rollNo"
          placeholder="Roll Number"
          value={student.rollNo}
          onChange={handleChange}
        />
        <small className="error">{errors.rollNo}</small>

        <input
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleChange}
        />
        <small className="error">{errors.name}</small>

        <input
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
        />
        <small className="error">{errors.email}</small>

        <select
          name="branch"
          value={student.branch}
          onChange={handleChange}
        >
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="IT">IT</option>
          <option value="ME">ME</option>
          <option value="CE">CE</option>
        </select>

        <select
          name="semester"
          value={student.semester}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>

        <div className="modal-buttons">
          <button onClick={handleSubmit}>
            Save
          </button>

          <button onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddStudentModal;