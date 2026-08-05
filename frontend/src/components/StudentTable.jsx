import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function StudentTable({
  students,
  setSelectedStudent,
  onEdit,
  onDelete,
}) {
  if (students.length === 0) {
    return (
      <div className="no-data">
        <h3>No Students Found</h3>
      </div>
    );
  }

  return (
    <table className="student-table">

      <thead>

        <tr>
          <th>ID</th>
          <th>Roll No</th>
          <th>Name</th>
          <th>Branch</th>
          <th>Semester</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>

      </thead>

      <tbody>

        {students.map((student) => (

          <tr key={student.id}>

            <td>{student.id}</td>

            <td>{student.rollNo}</td>

            <td>{student.name}</td>

            <td>{student.branch}</td>

            <td>{student.semester}</td>

            <td>{student.email}</td>

            <td>

              <button
                className="view-btn"
                onClick={() => setSelectedStudent(student)}
              >
                <FaEye />
              </button>

              <button
                className="edit-btn"
                onClick={() => onEdit(student)}
              >
                <FaEdit />
              </button>

              <button
                className="delete-btn"
                onClick={() => onDelete(student)}
              >
                <FaTrash />
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default StudentTable;