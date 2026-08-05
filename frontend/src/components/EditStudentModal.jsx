import { useEffect, useState } from "react";

function EditStudentModal({ student, onClose, updateStudent }) {
  const [editedStudent, setEditedStudent] = useState({
    id: "",
    rollNo: "",
    name: "",
    branch: "CSE",
    semester: 1,
    email: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setEditedStudent(student);
    }
  }, [student]);

  const handleChange = (e) => {
    setEditedStudent({
      ...editedStudent,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const temp = {};

    if (!editedStudent.rollNo.trim()) {
      temp.rollNo = "Roll Number is required.";
    }

    if (!editedStudent.name.trim()) {
      temp.name = "Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(editedStudent.email)) {
      temp.email = "Invalid Email.";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    await updateStudent({
      ...editedStudent,
      id: Number(editedStudent.id),
      semester: Number(editedStudent.semester),
    });
  };

  if (!student) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>Edit Student</h2>

        <input
          type="number"
          name="id"
          value={editedStudent.id}
          disabled
        />

        <input
          name="rollNo"
          placeholder="Roll Number"
          value={editedStudent.rollNo}
          onChange={handleChange}
        />
        <small className="error">{errors.rollNo}</small>

        <input
          name="name"
          placeholder="Student Name"
          value={editedStudent.name}
          onChange={handleChange}
        />
        <small className="error">{errors.name}</small>

        <input
          name="email"
          placeholder="Email"
          value={editedStudent.email}
          onChange={handleChange}
        />
        <small className="error">{errors.email}</small>

        <select
          name="branch"
          value={editedStudent.branch}
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
          value={editedStudent.semester}
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
            Update
          </button>

          <button onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditStudentModal;