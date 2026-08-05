function StudentModal({ student, onClose, onDelete, onEdit }) {
  if (!student) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>Student Details</h2>

        <hr />

        <p><b>Student ID:</b> {student.id}</p>
        <p><b>Roll Number:</b> {student.rollNo}</p>
        <p><b>Name:</b> {student.name}</p>
        <p><b>Email:</b> {student.email}</p>
        <p><b>Branch:</b> {student.branch}</p>
        <p><b>Semester:</b> {student.semester}</p>

        <div className="modal-buttons">

          <button onClick={() => onEdit(student)}>
            Edit
          </button>

          <button onClick={() => onDelete(student)}>
            Delete
          </button>

          <button onClick={onClose}>
            Close
          </button>

        </div>

      </div>
    </div>
  );
}

export default StudentModal;