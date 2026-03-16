import { useEffect, useState } from "react";


const slides = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  },
  {
    type: "video",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className=" from-indigo-900 via-purple-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Learn Smarter, <br />
            <span className="text-yellow-400">Study Better</span>
          </h1>
          <p className="mt-4 text-gray-300 text-base md:text-lg">
            Access free notes, paid courses, video tutorials and master your
            skills with ease.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
              Get Started
            </button>
            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition">
              Watch Demo
            </button>
          </div>
        </div>

        {/* RIGHT SLIDER */}
        <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl shadow-2xl">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="min-w-full h-full">
                {slide.type === "image" ? (
                  <img
                    src={slide.src}
                    alt="study"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={slide.src}
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

