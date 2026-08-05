import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import StudentTable from "../components/StudentTable";
import StudentModal from "../components/StudentModal";
import AddStudentModal from "../components/AddStudentModal";
import EditStudentModal from "../components/EditStudentModal";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";


import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
} from "../services/studentService";

import "../styles/Students.css";
import "../styles/Modal.css";



function Students() {



  const [searchTerm, setSearchTerm] = useState("");

  const [selectedBranch, setSelectedBranch] = useState("All");

  const [selectedSemester, setSelectedSemester] = useState("All");

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  const [students, setStudents] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [studentToDelete, setStudentToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedBranch, selectedSemester]);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

const handleDeleteStudent = (student) => {

  setStudentToDelete(student);

  setShowDeleteModal(true);

};

const confirmDelete = async (id) => {
  try {
    await deleteStudent(id);

    await fetchStudents();

    setCurrentPage(1);

    setShowDeleteModal(false);

    setStudentToDelete(null);

    setSelectedStudent(null);
  } catch (error) {
    console.error(error);
  }
};

const editStudent = (student) => {

  setEditingStudent(student);

  setSelectedStudent(null);

  setShowEditModal(true);

};

const handleUpdateStudent = async (student) => {
  try {
    await updateStudent(student);

    await fetchStudents();

    setShowEditModal(false);
  } catch (error) {
    console.error(error);
  }
};

  const handleAddStudent = async (student) => {
    try {
      await addStudent(student);

      await fetchStudents();

      setCurrentPage(1);

      setShowAddModal(false);
    } catch (error) {
      console.error(error);
    }
  };

const filteredStudents = students.filter((student) => {

    const matchesSearch =
        student.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
        student.id.toString().includes(searchTerm);

    const matchesBranch =
        selectedBranch === "All" ||
        student.branch === selectedBranch;

    const matchesSemester =
        selectedSemester === "All" ||
        student.semester.toString() === selectedSemester;

    return (
        matchesSearch &&
        matchesBranch &&
        matchesSemester
    );

});

const indexOfLastStudent = currentPage * studentsPerPage;

const indexOfFirstStudent =
  indexOfLastStudent - studentsPerPage;

const currentStudents = filteredStudents.slice(
  indexOfFirstStudent,
  indexOfLastStudent
);

const totalPages = Math.max(
    1,
    Math.ceil(
        filteredStudents.length /
        studentsPerPage
    )
);

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="dashboard-card">

          <div>

            <h2>Total Students</h2>

            <h1>{students.length}</h1>

          </div>

          <button
            className="add-btn"
            onClick={() => setShowAddModal(true)}
          >
            + Add Student
          </button>

        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <FilterBar
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          selectedSemester={selectedSemester}
          setSelectedSemester={setSelectedSemester}
        />

        <StudentTable
          students={currentStudents}
          searchTerm={searchTerm}
          selectedBranch={selectedBranch}
          selectedSemester={selectedSemester}
          setSelectedStudent={setSelectedStudent}
          onEdit={editStudent}
          onDelete={handleDeleteStudent}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />

        <StudentModal
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
            onDelete={handleDeleteStudent}
            onEdit={editStudent}
        />

        {showAddModal && (
          <AddStudentModal
              onClose={() => setShowAddModal(false)}
              addStudent={handleAddStudent}
              students={students}
          />
        )}
    {
    showEditModal && (

    <EditStudentModal

    student={editingStudent}

    onClose={() => setShowEditModal(false)}

    updateStudent={handleUpdateStudent}

    />

    )
    }

    {
    showDeleteModal && (

    <DeleteModal

    student={studentToDelete}

    onCancel={() => setShowDeleteModal(false)}

    onConfirm={confirmDelete}

    />

    )
    }

      </div>
    </>
  );
}

export default Students;