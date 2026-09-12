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
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const studentsPerPage = 5;

  useEffect(() => {
    fetchStudents();
  }, [currentPage, searchTerm, selectedBranch, selectedSemester]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedBranch, selectedSemester]);

  const fetchStudents = async () => {
    try {
      const params = {
        page: currentPage - 1,
        size: studentsPerPage,
        search: searchTerm || null,
        branch: selectedBranch !== "All" ? selectedBranch : null,
        semester: selectedSemester !== "All" ? selectedSemester : null,
      };
      
      const data = await getStudents(params);
      setStudents(data.content);
      setTotalPages(data.totalPages || 1);
      setTotalElements(data.totalElements || 0);
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
      throw error;
    }
  };



  return (
    <>
      <Navbar />

      <div className="container">

        <div className="dashboard-card">

          <div>

            <h2>Total Students</h2>

            <h1>{totalElements}</h1>

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
          students={students}
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