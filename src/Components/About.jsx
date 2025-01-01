import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  const team = [
    { 
      name: "Shoti", 
      role: "Front/Back-end", 
      img: "/Images/Shoti.jpg",
      contribution: "Developed the main navigation system and backend APIs.",
      fbLink: "https://www.facebook.com/john.justin.r.lorenzo"  
    },
    { 
      name: "Rohann", 
      role: "Front/Back-end", 
      img: "/Images/Rohann.jpg",
      contribution: "Created responsive UI components and implemented database models.",
      fbLink: "https://www.facebook.com/MarcGiant1"
    },
    { 
      name: "Mikko", 
      role: "Front/Back-end", 
      img: "/Images/Mikko.jpg",
      contribution: "Designed and coded the interactive animations and state management.",
      fbLink: "https://www.facebook.com/jamesmikko.recario" 
    },
    { 
      name: "Shai", 
      role: "Front/Back-end", 
      img: "/Images/Shai.jpg",
      contribution: "Tested and debugged the application for performance optimization.",
      fbLink: "https://www.facebook.com/shaifrederick.base.39" 
    },
  ];

  const handleClick = (fbLink) => {
    window.open(fbLink, "_blank"); 
  };

  return (
    <div className="min-h-screen bg-grey-400 text-gray-900 flex flex-col items-center justify-center">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-black"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Meet Our Team
      </motion.h1>

      <motion.p
        className="text-lg mb-12 text-black max-w-lg text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        We are a group of passionate individuals dedicated to delivering exceptional results.
      </motion.p>

      <div className="flex flex-row justify-center gap-8">
        {team.map((member, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 p-6 rounded-2xl shadow-lg flex flex-col items-center transition relative group cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            onClick={() => handleClick(member.fbLink)} // Trigger redirect on click
          >
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-4 relative group-hover:scale-110 group-hover:transition-transform duration-300">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mt-4">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
          </motion.div>
        ))}
      </div>

      <motion.footer
        className="mt-12 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        © 2024 Team Project. All Rights Reserved.
      </motion.footer>
    </div>
  );
};

export default Home;
