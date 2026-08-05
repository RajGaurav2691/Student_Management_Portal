function DeleteModal({
  student,
  onCancel,
  onConfirm,
}) {
  if (!student) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-modal">

        <h2>Delete Student</h2>

        <p>
          Are you sure you want to delete
        </p>

        <h3>{student.name} ?</h3>

        <div className="delete-buttons">

          <button
            className="cancel-delete"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-delete"
            onClick={() => onConfirm(student.id)}
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteModal;