import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Pastikan 'useSelector' diimpor dari 'react-redux'
import { registerUser } from "../../redux/slice/authSlice"; // Impor action register
import Swal from "sweetalert2"; // Impor SweetAlert2
import { useNavigate } from "react-router-dom"; // Impor useNavigate

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inisialisasi navigate
  const { status } = useSelector((state) => state.auth); // Mengambil status dari redux
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        Swal.fire("Berhasil!", "Pendaftaran berhasil!", "success"); // Menampilkan notifikasi berhasil
        // Redirect ke halaman login setelah berhasil
        navigate("/login");
      })
      .catch((err) => {
        Swal.fire("Gagal!", err || "Terjadi kesalahan", "error"); // Menampilkan notifikasi gagal
      });
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Form Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Masukan Nama Anda"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Masukan Email Anda"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Masukan Password Anda"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={status === "loading"} // Disable tombol ketika loading
          >
            {status === "loading" ? "Mendaftar..." : "Daftar"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Sudah Punya Akun Bro?{" "}
          <a href="/login" className="text-indigo-500 hover:underline">
            Masuk Disini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
