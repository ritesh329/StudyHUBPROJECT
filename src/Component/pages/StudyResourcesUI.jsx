import { useState } from "react";// ✅ SAME IMAGE IMPORT

export default function StudyResourcesUI() {
  const [resourceType, setResourceType] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [subject, setSubject] = useState("");

  const subjects = {
    6: ["Maths", "Science", "English"],
    7: ["Maths", "Science", "English"],
    8: ["Maths", "Science", "English"],
    9: ["Maths", "Physics", "Chemistry"],
    10: ["Maths", "Physics", "Chemistry"],
    11: ["Maths", "Physics", "Chemistry"],
    12: ["Maths", "Physics", "Chemistry"],
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" >
         {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

         {/* Content */}
        <div className="relative z-10 px-4 py-12"></div>

        <h1 className="text-4xl font-bold text-center mb-10 text-gray-100">
        Study Resources
      </h1>

      <div className="max-w-xl mx-auto bg-white/95 backdrop-blur p-6 rounded-2xl shadow space-y-6">

        {/* Resource Type */}
        <select
          value={resourceType}
          onChange={(e) => {
            setResourceType(e.target.value);
            setClassLevel("");
            setSubject("");
          }}
          className="w-full border px-4 py-3 rounded-lg"
        >
          <option value="">Select Resource</option>
          <option value="Book">Books</option>
          <option value="PDF">PDF</option>
          <option value="Formula">Formula</option>
        </select>

        {/* Class */}
        <select
          value={classLevel}
          disabled={!resourceType}
          onChange={(e) => {
            setClassLevel(e.target.value);
            setSubject("");
          }}
          className={`w-full border px-4 py-3 rounded-lg
            ${!resourceType ? "bg-gray-100 cursor-not-allowed" : ""}`}
        >
          <option value="">Select Class</option>
          {[6, 7, 8, 9, 10, 11, 12].map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
            </option>
          ))}
        </select>

        {/* Subject */}
        <select
          value={subject}
          disabled={!classLevel}
          onChange={(e) => setSubject(e.target.value)}
          className={`w-full border px-4 py-3 rounded-lg
            ${!classLevel ? "bg-gray-100 cursor-not-allowed" : ""}`}
        >
          <option value="">Select Subject</option>
          {classLevel &&
            subjects[classLevel]?.map((sub) => (
              <option key={sub}>{sub}</option>
            ))}
        </select>

        {/* Download */}
        <button
          disabled={!subject}
          onClick={() => alert("Downloading...")}
          className={`w-full py-3 rounded-lg font-semibold transition
            ${
              subject
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Download {resourceType || "Resource"}
        </button>

      </div>
    </div>
  );
}
