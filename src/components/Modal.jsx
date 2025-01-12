// eslint-disable-next-line
import React from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onclose, onSave, studentData, setStudentData }) => {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-md">
        <h2 className="text-xl mb-4">
          {studentData.id ? "Edit Data" : "Tambah Data"} Mahasiswa
        </h2>

        {/* Form Start */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Nama</label>
            <input
              type="text"
              name="nama"
              value={studentData.nama || ""}
              onChange={handleInputChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">NIM</label>
            <input
              type="text"
              name="nim"
              value={studentData.nim || ""}
              onChange={handleInputChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label className="block mb-1">Umur</label>
            <input
              type="number"
              name="umur"
              value={studentData.umur || ""}
              onChange={handleInputChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Alamat</label>
            <textarea
              name="alamat"
              value={studentData.alamat || ""}
              onChange={handleInputChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Progdi</label>
            <input
              type="text"
              name="progdi_id"
              value={studentData.progdi_id || ""}
              onChange={handleInputChange}
              className="w-full border px-2 py-1"
              required
            />
          </div> */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onclose}
            >
              Cancel
            </button>
          </div>
        </form>
        {/* Form End */}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onclose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  studentData: PropTypes.shape({
    id: PropTypes.number,
    nama: PropTypes.string,
    nim: PropTypes.string,
    umur: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    alamat: PropTypes.string,
    progdi_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  setStudentData: PropTypes.func.isRequired,
};

export default Modal;
