import PropTypes from "prop-types";
import Button from "../components/Button";

const Table = ({ students, onEditClick, onDeleteClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">NIM</th>
            <th className="border px-4 py-2">Umur</th>
            <th className="border px-4 py-2">Alamat</th>
            <th className="border px-4 py-2">Progdi</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="border px-4 py-2 text-center">
                  {student.id || "-"}
                </td>
                <td className="border px-4 py-2 text-center">
                  {student.nama || "-"}
                </td>
                <td className="border px-4 py-2 text-center">
                  {student.nim || "-"}
                </td>
                <td className="border px-4 py-2 text-center">
                  {student.umur || "-"}
                </td>
                <td className="border px-4 py-2 text-center">
                  {student.alamat || "-"}
                </td>
                <td className="border px-4 py-2 text-center">
                  {String(student.progdi.nama) || "-"}
                </td>
                <td className="border px-4 py-2 text-center flex justify-center gap-2">
                  <Button
                    style="text-white bg-yellow-500"
                    text="Edit"
                    onClick={() => onEditClick(student)}
                  />
                  <Button
                    style="text-white bg-red-500"
                    text="Delete"
                    onClick={() => onDeleteClick(student.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="text-center py-4 text-gray-500 font-semibold"
              >
                Tidak ada data mahasiswa.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nama: PropTypes.string.isRequired,
      nim: PropTypes.string.isRequired,
      umur: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      alamat: PropTypes.string,
      progdi_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default Table;
