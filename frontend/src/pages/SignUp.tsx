import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function SignUp() {
    const [userData,setUserData] = useState({email:"",password:""});

    function onSubmitHandle(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        toast.promise(
          axios.post(
            "https://taskmate-baib.onrender.com/auth/signup",
            userData
          ),
          {
            loading: "Saving... Please wait!",
            success: (res) => (
              <b>{res.data ? res.data : "User registered successfully!"}</b>
            ),
            error: (err) => (
              <b>
                {err.response
                  ? err.response.data.message
                  : "Could not register."}
              </b>
            ),
          }
        );
    }

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-10 rounded-xl shadow-2xl w-full max-w-md">
          {/* Heading */}
          <h2 className="text-4xl font-extrabold text-center mb-8 text-[#00df9a]">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-400 text-center mb-6">
            Join us today and manage your tasks effortlessly.
          </p>
          {/* Form */}
          <form className="space-y-6" onSubmit={onSubmitHandle}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                value={userData.email}
                onChange={(e)=>setUserData({...userData,email:e.target.value})}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-2 w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00df9a] transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                value={userData.password}
                onChange={(e)=>setUserData({...userData,password:e.target.value})}
                type="password"
                id="password"
                placeholder="Create a strong password"
                className="mt-2 w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00df9a] transition-all"
              />
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#00df9a] text-black font-medium rounded-lg hover:bg-[#0fc784] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign Up
            </button>
          </form>
          {/* Redirect Link */}
          <p className="mt-8 text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#00df9a] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp
