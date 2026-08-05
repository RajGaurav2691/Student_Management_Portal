import { useState } from "react";

function AddStudentModal({ onClose, addStudent, students }) {
  const [student, setStudent] = useState({
    id: "",
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

    if (!student.id) {
      temp.id = "Student ID is required.";
    } else if (
      students.some((s) => String(s.id) === String(student.id))
    ) {
      temp.id = "Student ID already exists.";
    }

    if (!student.rollNo.trim()) {
      temp.rollNo = "Roll Number is required.";
    }

    if (!student.name.trim()) {
      temp.name = "Name is required.";
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

    await addStudent({
      ...student,
      id: Number(student.id),
      semester: Number(student.semester),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>Add Student</h2>

        <input
          type="number"
          name="id"
          placeholder="Student ID"
          value={student.id}
          onChange={handleChange}
        />
        <small className="error">{errors.id}</small>

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