// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function SchoolEducationUI() {
//   const [boards, setBoards] = useState([]);
//   const [classes, setClasses] = useState([]);

//   const [board, setBoard] = useState("");
//   const [cls, setCls] = useState("");

//   const navigate = useNavigate();

//   /* =========================
//      FETCH BOARDS ON LOAD
//   ========================= */
//   useEffect(() => {
//     const fetchBoards = async () => {
//       try {
//         const res = await axios.get("https://studyhubapi-e2lb.onrender.com/api/boards/boards");
//         setBoards(res.data.data);
//       } catch (error) {
//         console.error("Failed to load boards");
//       }
//     };

//     fetchBoards();
//   }, []);

//   /* =========================
//      FETCH CLASSES ON BOARD CHANGE
//   ========================= */
//   useEffect(() => {
//     if (!board) return;

//     const fetchClasses = async () => {
//       try {
//         const res = await axios.get(
//           `https://studyhubapi-e2lb.onrender.com/api/boards/boards/${board}/classes`
//         );
//         setClasses(res.data.data);
//       } catch (error) {
//         console.error("Failed to load classes");
//       }
//     };

//     fetchClasses();
//   }, [board]);

//   /* =========================
//      HANDLE EXPLORE
//   ========================= */
//   const handleExplore = () => {
//     if (board && cls) {
//       navigate(`/subjects/${board}/${cls}`);
//     } else {
//       alert("Please select both board and class");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-cover bg-center bg-no-repeat relative">

//       {/* Content */}
//       <div className="relative z-10 px-4 py-12">
//         <h1 className="text-4xl font-bold text-center mb-10 text-white">
//           School Education
//         </h1>

//         {/* Selection Card */}
//         <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6">
          
//           {/* Board */}
//           <div>
//             <label className="block font-semibold mb-2">
//               Select Board
//             </label>
//             <select
//               value={board}
//               onChange={(e) => {
//                 setBoard(e.target.value);
//                 setCls("");
//                 setClasses([]);
//               }}
//               className="w-full border rounded-lg px-4 py-3 focus:outline-indigo-500"
//             >
//               <option value="">-- Select Board --</option>
//               {boards.map((b) => (
//                 <option key={b._id} value={b._id}>
//                   {b.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Class */}
//           <div>
//             <label className="block font-semibold mb-2">
//               Select Class
//             </label>
//             <select
//               value={cls}
//               onChange={(e) => setCls(e.target.value)}
//               disabled={!board}
//               className="w-full border rounded-lg px-4 py-3 focus:outline-indigo-500"
//             >
//               <option value="">-- Select Class --</option>
//               {classes.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.className}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Explore Button */}
//           <button
//             onClick={handleExplore}
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg
//             hover:bg-indigo-700 transition font-semibold"
//           >
//             Explore
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomDropdown from "../CustomDropdown"; // path adjust kar lena

export default function SchoolEducationUI() {
  const [boards, setBoards] = useState([]);
  const [classes, setClasses] = useState([]);

  const [board, setBoard] = useState("");
  const [cls, setCls] = useState("");

  // 🔥 loading states
  const [boardLoading, setBoardLoading] = useState(false);
  const [classLoading, setClassLoading] = useState(false);

  const navigate = useNavigate();

  /* =========================
     FETCH BOARDS ON LOAD
  ========================= */
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setBoardLoading(true);

        const res = await axios.get(
          "https://studyhubapi-e2lb.onrender.com/api/boards/boards"
        );

        setBoards(res?.data?.data || []);
      } catch (error) {
        console.error("Failed to load boards");
      } finally {
        setBoardLoading(false);
      }
    };

    fetchBoards();
  }, []);

  /* =========================
     FETCH CLASSES ON BOARD CHANGE
  ========================= */
  useEffect(() => {
    if (!board) return;

    const fetchClasses = async () => {
      try {
        setClassLoading(true);

        const res = await axios.get(
          `https://studyhubapi-e2lb.onrender.com/api/boards/boards/${board}/classes`
        );

        setClasses(res?.data?.data || []);
      } catch (error) {
        console.error("Failed to load classes");
      } finally {
        setClassLoading(false);
      }
    };

    fetchClasses();
  }, [board]);

  /* =========================
     HANDLE EXPLORE
  ========================= */
  const handleExplore = () => {
    if (board && cls) {
      navigate(`/subjects/${board}/${cls}`);
    } else {
      alert("Please select both board and class");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative">
      <div className="relative z-10 px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-10 text-white">
          School Education
        </h1>

        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6">
          
          {/* ✅ Board Dropdown */}
          <div>
            <label className="block font-semibold mb-2">
              Select Board
            </label>

            <CustomDropdown
              loading={boardLoading}
              options={boards}
              value={board}
              onChange={(e) => {
                setBoard(e.target.value);
                setCls("");
                setClasses([]);
              }}
              labelKey="name"
              valueKey="_id"
              placeholder="-- Select Board --"
            />
          </div>

          {/* ✅ Class Dropdown */}
          <div>
            <label className="block font-semibold mb-2">
              Select Class
            </label>

            <CustomDropdown
              loading={classLoading}
              options={classes}
              value={cls}
              onChange={(e) => setCls(e.target.value)}
              labelKey="className"
              valueKey="_id"
              placeholder="-- Select Class --"
              disabled={!board}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleExplore}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}