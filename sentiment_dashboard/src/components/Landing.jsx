import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const Landing = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      document.querySelectorAll("div").forEach((div) => {
        if (
          div.innerText?.toLowerCase().includes("built with spline") ||
          div.innerHTML?.toLowerCase().includes("spline") ||
          div?.style?.zIndex === "2147483647"
        ) {
          div.style.display = "none";
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen w-full text-white overflow-hidden px-4 md:px-10 lg:px-20 py-20"
      style={{ backgroundColor: "#0f0f1f" }}>
      {/* 💠 Background Glow Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 opacity-15 blur-3xl rounded-full z-0 animate-float"></div>
      <div className="absolute top-1/3 left-[-4rem] w-64 h-64 bg-blue-500 opacity-15 blur-3xl rounded-full z-0 animate-float"></div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500 opacity-10 blur-[100px] rounded-full z-0"></div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-[1400px] mx-auto relative z-10">
        {/* 👈 Text Section */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-white subtle-neon">
            Unlock Feedback<br />with Real-Time Sentiment Analytics
          </h1>
          <p className="text-white text-lg mb-8">
            Explore department insights, trends, and sentiment distributions in one powerful dashboard.
          </p>
          <a
            href="#dashboard"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300"
          >
            Dive into Dashboard
          </a>
        </motion.div>

        {/* 👉 Spline Object with Overlay */}
        <motion.div
          className="w-full md:w-1/2 h-[800px] flex justify-center items-start md:items-center pt-20 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#0f0f1f] z-10 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-500 border-opacity-50"></div>
            </div>
          )}
          <div className="w-full h-full">
            <Spline
              scene="https://prod.spline.design/BYZCnSjuvoh1I3gm/scene.splinecode"
              onLoad={() => setIsLoaded(true)}
            />
          </div>

          {/* Rectangle to Cover Logo */}
          {isLoaded && (
            <div
              className="absolute bottom-3 right-3 w-48 h-12 bg-[#0f0f1f] z-[9999] rounded-md"
              style={{ backgroundColor: "#0f0f1f" }}
            ></div>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        .subtle-neon {
          text-shadow:
            0 0 2px #00f0ff,
            0 0 4px #00f0ff;
        }
      `}</style>
    </section>
  );
};

export default Landing;
