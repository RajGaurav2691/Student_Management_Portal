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
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
    // Clear api error on edit
    if (apiError) setApiError("");
  };

  const validate = () => {
    const temp = {};

    if (!student.name.trim()) {
      temp.name = "Student Name is required.";
    }

    if (!student.rollNo.trim()) {
      temp.rollNo = "Roll Number is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!student.email.trim()) {
      temp.email = "Email is required.";
    } else if (!emailRegex.test(student.email)) {
      temp.email = "Invalid Email.";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    
    setIsSubmitting(true);
    setApiError("");

    try {
      // addStudent throws if API fails
      await addStudent({
        rollNo: student.rollNo,
        name: student.name,
        email: student.email,
        branch: student.branch,
        semester: Number(student.semester),
      });
      // onClose is now handled by Students.jsx upon success!
      // But we call it here just in case Students.jsx is changed to not call it.
      // Wait, the existing code didn't need onClose() here because Students.jsx calls setShowAddModal(false).
      // But we'll leave it as a fallback, or rely on Students.jsx. 
      // Actually Students.jsx handles closing, but we will call it if we need to.
    } catch (err) {
      console.error("API Error in modal:", err);
      // Try to extract the validation error message from backend
      if (err.response && err.response.data && err.response.data.message) {
         setApiError(err.response.data.message + " - Please check the fields.");
         if (err.response.data.data && typeof err.response.data.data === 'object') {
             setErrors(err.response.data.data);
         }
      } else {
         setApiError("Failed to add student. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ textAlign: "left", width: "450px" }}>

        <h2 style={{ marginBottom: "5px" }}>Add Student</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "0", marginBottom: "20px" }}>
          Enter the student's details below
        </p>

        {apiError && (
          <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px", borderRadius: "6px", marginBottom: "15px", fontSize: "14px" }}>
            {apiError}
          </div>
        )}

        <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151" }}>Student Name</label>
        <input
          name="name"
          placeholder="Enter student name"
          value={student.name}
          onChange={handleChange}
          disabled={isSubmitting}
          style={{ marginTop: "5px" }}
        />
        <small className="error" style={{ height: "15px" }}>{errors.name}</small>

        <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginTop: "5px" }}>Roll Number</label>
        <input
          name="rollNo"
          placeholder="Enter roll number"
          value={student.rollNo}
          onChange={handleChange}
          disabled={isSubmitting}
          style={{ marginTop: "5px" }}
        />
        <small className="error" style={{ height: "15px" }}>{errors.rollNo}</small>

        <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginTop: "5px" }}>Email</label>
        <input
          name="email"
          placeholder="Enter email address"
          value={student.email}
          onChange={handleChange}
          disabled={isSubmitting}
          style={{ marginTop: "5px" }}
        />
        <small className="error" style={{ height: "15px" }}>{errors.email}</small>

        <div style={{ display: "flex", gap: "15px", marginTop: "5px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151" }}>Branch</label>
            <select
              name="branch"
              value={student.branch}
              onChange={handleChange}
              disabled={isSubmitting}
              style={{ marginTop: "5px" }}
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
              <option value="ME">ME</option>
              <option value="CE">CE</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151" }}>Semester</label>
            <select
              name="semester"
              value={student.semester}
              onChange={handleChange}
              disabled={isSubmitting}
              style={{ marginTop: "5px" }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>
        </div>
        <small className="error" style={{ height: "15px" }}>{errors.branch || errors.semester}</small>

        <div className="modal-buttons" style={{ marginTop: "15px" }}>
          <button 
            onClick={onClose} 
            disabled={isSubmitting}
            style={{ background: "#6b7280", color: "white" }}
          >
            Cancel
          </button>

          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            style={{ background: "#2563eb", color: "white", opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? "Saving..." : "Save Student"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddStudentModal;