//eslint-disable-next-line
import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser, resetStatus } from "../redux/slice/authSlice";
import Swal from "sweetalert2"; // Import SweetAlert2

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan keluar dari panel admin.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutUser()).then(() => {
          dispatch(resetStatus());
          navigate("/login");
          Swal.fire("Berhasil!", "Anda telah logout.", "success"); // Success message
        });
      } else {
        Swal.fire("Dibatalkan", "Anda masih berada di panel admin.", "info"); // Cancelled message
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-black p-2 ">
        <div className="flex items-center mx-auto justify-between w-2/3">
          <p className="text-white text-sm font-bold">BGM Indonesia</p>
          <button
            className="bg-black text-white px-4 py-2 rounded text-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
      <div className="w-screen h-[400px] bg-hero-pattern bg-cover bg-center bg-no-repeat"></div>
      <div className="flex flex-1">
        {/* <aside className="w-64 bg-indigo-800 text-white">
          <h1 className="text-2xl font-bold text-center mt-10">Admin Panel</h1>
          <div className="p-4 ml-4">
            <nav className="mt-4">
              <ul>
                <li className="py-2 px-4 text-white hover:bg-indigo-700 text-lg">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="py-2 px-4 text-white hover:bg-indigo-700 text-lg">
                  <Link to="/mahasiswa">Mahasiswa</Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside> */}
        <div className="flex-1 flex flex-col p-10">{children}</div>
      </div>
      <footer className="bg-black text-white p-2 text-center text-sm">
        &copy; @ 2024 BGM Indonesia
      </footer>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
