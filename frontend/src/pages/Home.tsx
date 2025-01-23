import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="h-screen bg-gray-900 text-white flex flex-col items-center">
        {/* Navbar */}
        <nav className="w-full flex justify-between items-center p-6 bg-[#1e293b] shadow-lg">
          <h1 className="text-2xl font-bold text-[#00df9a] transition-transform hover:scale-105">
            TaskMate
          </h1>
          <div className="flex gap-4">
            <Link to="/login" className="px-4 py-2 bg-[#00df9a] rounded shadow-lg hover:bg-[#0fc784] transition duration-300 ease-in-out">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 border border-[#00df9a] rounded shadow-lg hover:bg-[#00df9a] hover:text-black transition duration-300 ease-in-out">
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mt-16 px-6 animate-fadeIn">
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            Stay Organized, <span className="text-[#00df9a]">Stay Ahead</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            With TaskMate, your personal task management tool, you can track,
            organize, and complete your goals seamlessly.
          </p>
          <div className="mt-8">
            <button className="px-6 py-3 bg-[#00df9a] rounded-lg text-lg font-medium shadow-md hover:bg-[#0fc784] hover:shadow-xl transition-all duration-300 ease-in-out">
              Get Started
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-5xl">
          <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-4 text-[#ff6b6b]">
              Easy Task Tracking
            </h3>
            <p className="text-gray-400">
              Add tasks, set deadlines, and track progress effortlessly with an
              intuitive interface.
            </p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-4 text-[#42a5f5]">
              Collaborate Seamlessly
            </h3>
            <p className="text-gray-400">
              Work with your team, assign tasks, and monitor progress in real
              time.
            </p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-4 text-[#fbc02d]">
              Dark Mode
            </h3>
            <p className="text-gray-400">
              Enjoy a visually appealing dark mode that reduces strain on your
              eyes.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full absolute bottom-0 mt-16 py-6 bg-[#1e293b] text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} TaskMate. All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

export default Home
