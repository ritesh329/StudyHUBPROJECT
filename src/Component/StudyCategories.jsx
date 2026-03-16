import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "School Education",
    desc: "Class 6–12 • All Subjects",
    icon: "🏫",
    path: "/school",
  },
  {
    title: "College / University",
    desc: "UG & PG • All Departments",
    icon: "🎓",
    path: "/college",
  },
  {
    title: "Skill & IT Courses",
    desc: "Coding • Web • AI • ML",
    icon: "💻",
    path: "/itcourse",
  },
    {
    title: "Study Resources",
    desc: "Formula • PDFs • Books",
    icon: "📄",
    path: "/resources",
  },
  // in case in devalopment in new future add more categories in web update this file
 // {
//     title: "Diploma / Polytechnic",
//     desc: "Technical Branches",
//     icon: "🛠️",
//     path: "/diploma",
//   },
  //   {
//     title: "Professional Courses",
//     desc: "CA • CS • Law • MBA",
//     icon: "💼",
//     path: "/professional-courses",
//   },
  //   {
//     title: "Coaching & Competitive",
//     desc: "JEE • NEET • SSC • UPSC",
//     icon: "📚",
//     path: "/coaching",
//   },
  // {
  //   title: "Notes Request",
  //   desc: "Ask • Upload • Community",
  //   icon: "🤝",
  //   path: "/request-notes",
  // },
];

export default function StudyCategories() {
  const navigate = useNavigate();

  return (
    <section className=" py-14 px-4 bg-cover ">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate(cat.path)}
              className="bg-white/70  p-6 rounded-xl shadow cursor-pointer hover:shadow-lg"
            >
              <div className="text-4xl">{cat.icon}</div>
              <h3 className="mt-2 font-semibold">{cat.title}</h3>
              <p className="text-sm text-gray-700">{cat.desc}</p>
              <span className="text-blue-700 mt-2 inline-block">
                Explore →
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
