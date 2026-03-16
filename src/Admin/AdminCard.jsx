import { useParams, useNavigate } from "react-router-dom";

const cardData = {
  school: [
    { title: "Create Board/Class", path: "/admin/school/create-board" },
    { title: "Create content", path: "/admin/createcontent" },
    { title: "Manage Subjects", path: "/admin/school/subjects" },
  ],
  university: [
    { title: "Create University", path: "/admin/university/create" },
    { title: "Create content", path: "/admin/university/course" },
    { title: "Manage Course", path: "/admin/university/subjects" },
  ],
  it: [
    { title: "Create Category", path: "/admin/it/create-category" },
    { title: "Create content ", path: "/admin/it/create-contents" },
    { title: "Manage Topics", path: "/admin/it/created-topic-List" },
  ],
};

const AdminCards = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {type} Management
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData[type]?.map((card, i) => (
          <div
            key={i}
            onClick={() => navigate(card.path)}
            className="cursor-pointer bg-white/60 rounded-xl shadow-md p-6
                       hover:shadow-xl hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCards;
