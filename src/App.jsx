import { Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Layout from "./Component/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// UI pages
import useOnlineStatus from "./hooks/useOnlineStatus";
import OfflineShow from "./Component/pages/OfflineShow"
import SchoolEducationUI from "./Component/pages/SchoolEducation";
import UniversityEducationUI from "./Component/pages/UniversityEducationUI";
import StudyResourcesUI from "./Component/pages/StudyResourcesUI";
import ITCourse from "./Component/pages/ITCourse";
import SubjectNewPage from "./Component/pages/SchoolCreatePage";
import UniverasitySubjectContent from "./Component/pages/UniverasitySubjectContent";
import Signup from "./Component/pages/SignUp";
import Login from "./Component/pages/Login";
// user profile and setting
import UserProfile  from "./Component/pages/UserProfile";
import  UserSetting from "./Component/pages/UserSetting";
// Admin pages
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/Dashboard";

import Users from "./Admin/Users";
import AdminLogin from "./Admin/AdminLogin";
// Route guards
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
// school routes
import CreateBoard from "./Admin/CreateBoard";
import SchoolManageSubject from "./Admin/SchoolManageSubject";
import SchoolContents from "./Admin/SchoolContents";
// university routes
import CreateUniversity from "./Admin/CreateUniversity";
import Universitycontent from "./Admin/UniversityContent";
import UniversityManageSubjects from "./Admin/UniversityManageSubjects";
// IT routes 
import CreateTopic from "./Admin/CreateTopic";
import CreateITCategory from "./Admin/CreateITCategory";
import TopicList from "./Admin/TopicList";
// Admin card 
import AdminCards from "./Admin/AdminCard";
import AdminDeletePanel from "./Admin/AdminDeletePanel";
// ================= NEWS ADMIN =================
import AdminManageNews from "./Admin/AdminManageNews";
import AdminAddNews from "./Admin/AdminAddNews";
import UserNews from "./Component/pages/UserNews";
export default function App() {


     const isOnline = useOnlineStatus();

  if (!isOnline) {
    return <OfflineShow />; // 🔥 internet nahi → ye page
  }
  return (
    <>
    <Routes>

      {/* ================= USER ROUTES ================= */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="school" element={<SchoolEducationUI />} />
           <Route path="UserNews" element={<UserNews />}/>
        <Route path="subjects/:board/:cls" element={<SubjectNewPage />} />
        <Route path="college" element={<UniversityEducationUI />} />
        <Route
          path="university/:university/:courseType/:department/:semester"
          element={<UniverasitySubjectContent />}
        />
        <Route path="itcourse" element={<ITCourse />} />
        <Route path="resources" element={<StudyResourcesUI />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/userSettings" element={<UserSetting />} />
      </Route>
    
      <Route path="/Ad/login" element={<AdminLogin />} />

      {/* ================= ADMIN ROUTES (FULLY PROTECTED) ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          </ProtectedRoute>
        }
      >
           {/* ================= card ================= */}
        <Route path="/admin/:type" element={<AdminCards />} />  
        <Route index element={<Dashboard />} />
       
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
         {/* ================= SCHOOL EDUCATION ================= */}
  <Route path="school/create-board" element={<CreateBoard />} />
  <Route path="createcontent" element={<SchoolContents />} />
  <Route path="school/subjects" element={<SchoolManageSubject />} />

  {/* ================= UNIVERSITY ================= */}
  <Route path="university/create" element={<CreateUniversity />} />
  <Route path="university/course" element={<Universitycontent />} />
  <Route path="university/subjects" element={<UniversityManageSubjects />} />

  {/* ================= IT COURSE / CMS ================= */}
  <Route path="it/create-category" element={<CreateITCategory />} />
  <Route path="it/created-topic-List" element={<TopicList />} />
          <Route path="it/create-contents" element={<CreateTopic />} />
          <Route path="it/edit-topic/:id" element={<CreateTopic />} />
            <Route path="delete" element={<AdminDeletePanel />} />
 <Route path="news" element={<AdminManageNews />} />
  <Route path="news/add" element={<AdminAddNews />} />
  <Route path="news/edit/:id" element={<AdminAddNews />} />

      </Route>
  

    </Routes>
     <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      </>
    
  );
}
