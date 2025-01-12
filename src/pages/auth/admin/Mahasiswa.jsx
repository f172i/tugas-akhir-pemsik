import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../../../redux/slice/studentSlice";

const Mahasiswa = () => {
  const dispatch = useDispatch();
  const {
    data: mahasiswa,
    status,
    error,
  } = useSelector((state) => state.students);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentData, setStudentData] = useState({
    progdi_id: "",
    nim: "",
    nama: "",
    alamat: "",
    umur: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const saveStudent = async () => {
    if (!studentData.nama || !studentData.nim) {
      Swal.fire("Oops!", "Nama dan NIM harus diisi.", "error");
      return;
    }

    try {
      if (isEdit) {
        await dispatch(
          updateStudent({ id: studentData.id, changes: studentData })
        ).unwrap();
        Swal.fire(
          "Berhasil!",
          "Data mahasiswa berhasil diperbarui.",
          "success"
        );
      } else {
        await dispatch(addStudent(studentData)).unwrap();
        Swal.fire(
          "Berhasil!",
          "Data mahasiswa berhasil ditambahkan.",
          "success"
        );
      }
      setIsModalOpen(false);
      setStudentData({
        progdi_id: "",
        nim: "",
        nama: "",
        alamat: "",
        umur: "",
      });
    } catch (err) {
      Swal.fire("Error", err.message || "Terjadi kesalahan.", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Bro Hapus ga?",
      text: "Kalo udah dihapus gabisa dibalikin bro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "yoi, bro hapus aja",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteStudent(id)).unwrap();
          Swal.fire("Mantap bro!", "Data mahasiswa telah dihapus", "success");
        } catch (err) {
          Swal.fire(
            "Error",
            err.message || "Gagal menghapus data mahasiswa",
            "error"
          );
        }
      }
    });
  };

  const handleAddClick = () => {
    setStudentData({ progdi_id: "", nim: "", nama: "", alamat: "", umur: "" });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (student) => {
    setStudentData(student);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex justify-between p-2">
        <h1 className="text-xl font-semibold">Daftar User</h1>
        <Button
          style="bg-green-500 text-white text-sm"
          text="Tambah"
          onClick={handleAddClick}
        />
      </div>
      <main className="flex-grow mt-4">
        <Table
          students={mahasiswa}
          onEditClick={handleEditClick}
          onDeleteClick={handleDelete}
        />
      </main>
      <Modal
        isOpen={isModalOpen}
        onclose={() => setIsModalOpen(false)}
        onSave={saveStudent}
        studentData={studentData}
        setStudentData={setStudentData}
      />
    </>
  );
};

export default Mahasiswa;
