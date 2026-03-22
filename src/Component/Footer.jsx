import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-black/70 text-gray-300 h-90 ">
      <div className="max-w-fullscreem mx-auto px-16 py-12">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-11">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-wide">
              StudyHub<span className="text-emerald-400">Note</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-400">
              A modern learning platform for School, College,
              Coaching, University & Competitive Exam students.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-lg">
              {[
                "School Education",
                "College / University",
                // "Coaching & Exams",
                "Professional Courses",
                "Skill & IT Courses",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-lg">
              {[
                "Free Notes",
               // "Paid Notes",
                "Previous Papers",
                "Study Materials",
                // "Request Notes",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Contact Info
            </h3>

            <div className="space-y-3 text-lg text-gray-400">
              <div className="flex gap-3">
                <span>📍</span>
                <p>Prayagraj, UP 222165</p>
              </div>

              <div className="flex gap-3">
                <span>✉️</span>
                <p>+91-723......122</p>
              </div>

              <div className="flex gap-3">
                <span>📞</span>
                
                <p>aksky7km@example.com</p>
              </div>
            </div>

          </div>

        </div>







        {/* Social Icons */}
<div className="border-t border-white/10 py-2 h-5">
  <div className="flex justify-center gap-4">
    {[
      { icon:<FaFacebookF />, link: "https://www.facebook.com" },  
      { icon: <FaTwitter />, link: "https://www.x.com" },
      { icon: <FaLinkedin />, link: "https://www.linkedin.com" },
      { icon: <FaInstagram />, link: "https://www.instagram.com/aarivotech" }
    ].map((item, i) => (
      <a
        key={i}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 flex items-center justify-center
                   rounded-full bg-white/20 text-pink-500
                   hover:bg-emerald-400 hover:text-black
                   transition cursor-pointer"
      >
        {item.icon}
      </a>
    ))}
  </div>
</div>







    

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-4 text-center text-lg text-gray-500 h-6">
          © {new Date().getFullYear()} StudyHubNote. All Rights Reserved.
        </div>
        

      </div>
    </footer>
  );
}
