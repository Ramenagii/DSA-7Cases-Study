import React from "react";
import { useNavigate } from "react-router-dom";
import Plates from "../components/Plates.jsx";
import videoSrc from "../assets/videos/hero-vid.mp4";
import Jams from "../assets/images/team/jams.jpg";
import Shai from "../assets/images/team/shai.jpg";
import Rohann from "../assets/images/team/rohann.jpg";
import Shoti from "../assets/images/team/shoti.jpg";
import fbLight from "../assets/images/icons/socmed/fb-light.png";
import githubLight from "../assets/images/icons/socmed/github-light.png";
import linkedinLight from "../assets/images/icons/socmed/linkedin-light.png";

function Landing() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/stacks");
  };

  return (
    <>
      <div
        id="Visualize"
        className="relative flex flex-col items-center justify-center min-h-screen bg-white p-4"
      >
        {/* Navbar */}
          <nav className="w-full h-[200px] p-4 fixed top-0 navbar-gradient z-40">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-white text-2xl font-bold">DSA & Co.</div>
              <div className="space-x-16 text-xl">
                <a href="#Visualize" className="text-white hover:text-lilac-100">
            Visualize
                </a>
                <a href="#Team" className="text-white hover:text-lilac-100">
            Team
                </a>
                <a href="#Contacts" className="text-white hover:text-lilac-100">
            Contacts
                </a>
              </div>
            </div>
          </nav>

          {/* Main Content */}
        <video
          className="absolute top-0 left-0 w-full h-[350px] object-cover z-0"
          src={videoSrc}
          autoPlay
          loop
          muted
        ></video>

        {/* Overlay Plates */}
        <Plates />

        {/* Hero */}
          <div className="relative mt-[500px] z-20 text-center text-slate-950">
            <h1 className="text-5xl font-bold mb-4">
              Data Structure and Algorithm Visualizer
            </h1>
            <p className="text-xl mb-8 text-center max-w-2xl mx-auto">
              Discover the power of data structures and algorithms with examples
              like Tower of Hanoi, garage stacks, queues, and Tic-Tac-Toe lists.
              Explore their real-world applications in an interactive way!
            </p>
            <button
              className="px-6 py-3 mt-6 bg-[#907AD6] text-white rounded hover:bg-[#6B5B95] hover:scale-105 transition-transform duration-300 font-arcade"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          </div>
          </div>

          {/* team section */}
      <section id="Team" className="w-full h-[600px] bg-[#4F518C]">
        <div className="flex flex-col items-center justify-center h-full text-white m-">
          <div className="flex flex-col items-center justify-center mt-12">
            <h1 className="text-5xl font-bold">Meet Our Team</h1>
            <p className="text-xl mb-8 text-center max-w-2xl mx-auto m-8">
              We are a group of passionate individuals dedicated to delivering
              exceptional results through creativity and collaboration.
            </p>
          </div>

          {/* team cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-14">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 border border-transparent hover:border-white flex items-center">
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold mb-4">jams</h2>
                <p className="text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <img
                src={Jams}
                alt="jams"
                className="w-44 h-44 object-cover rounded-lg ml-4"
              />
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 border border-transparent hover:border-white flex items-center">
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold mb-4">Shoti</h2>
                <p className="text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <img
                src={Shoti}
                alt="jams"
                className="w-44 h-44 object-cover rounded-lg ml-4"
              />
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 border border-transparent hover:border-white flex items-center">
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold mb-4">Shai</h2>
                <p className="text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <img
                src={Shai}
                alt="jams"
                className="w-44 h-44 object-cover rounded-lg ml-4"
              />
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 border border-transparent hover:border-white flex items-center">
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold mb-4">Rohann</h2>
                <p className="text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <img
                src={Rohann}
                alt="jams"
                className="w-44 h-44 object-cover rounded-lg ml-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="Contacts" className="bg-white text-slate-950 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Get in Touch</h2>
            <p className="text-xl mt-4">
              We'd love to hear from you! Reach out to us with any questions or
              feedback.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full md:w-2/3 lg:w-1/2">
              <form className="bg-slate-400 p-8 rounded-lg shadow-lg">
                <div className="mb-4 text-alate-700">
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="w-full px-4 py-2 bg-gray-200 text-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    id="name"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-4 text-slate-700">
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-2 bg-gray-200 text-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="email"
                    id="email"
                    placeholder="Your Email"
                  />
                </div>
                <div className="mb-4 text-slate-700">
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-2 bg-gray-200 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    id="message"
                    rows="5"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button className="w-full py-3 mt-4 bg-[#907AD6] hover:bg-purple-700 rounded-lg text-white font-semibold">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} DSA & Co. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubLight} alt="GitHub" className="w-10 h-10" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinLight} alt="LinkedIn" className="w-10 h-10" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={fbLight} alt="Facebook" className="w-10 h-10" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Landing;
