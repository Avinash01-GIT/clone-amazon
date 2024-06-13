import { logoDark } from "../assets/images";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  // Error messages start
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");

  // Loading message
  const [Loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Handle function starts
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  // Email validation
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  };

  // submit Button
  const handleRegistration = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter Your Name");
    }
    if (!email) {
      setErrEmail("Enter Your email");
      setFirebaseErr("");
    } else {
      if (!emailValidation(email)) {
        setErrEmail("Enter a vaild email");
      }
    }
    if (!password) {
      setErrPassword("Enter Your password");
    } else {
      if (password.length < 6) {
        setErrPassword("Password must be at least 6 characters");
      }
    }
    if (!cPassword) {
      setErrCPassword("Confirm Your password");
    } else {
      if (cPassword !== password) {
        setErrCPassword("Password not Matched");
      }
    }

    if (
      clientName &&
      email &&
      emailValidation(email) &&
      password &&
      password.length >= 6 &&
      cPassword &&
      cPassword === password
    ) {
      // console.log(clientName, email, password, cPassword);
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
            photoURL:
              "https://i.pinimg.com/originals/9d/d0/68/9dd06809fe624bae4da7e37c4f6ba514.jpg",
          });
          const user = userCredential.user;
          setLoading(false);
          setSuccessMsg("Account Created Successfully!");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
          // console.log(user);
          // Clear the fields after successful registration
          setClientName("");
          setEmail("");
          setPassword("");
          setCPassword("");
          setFirebaseErr("");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email Already in use, try another one");
          } else {
            setFirebaseErr("Registration failed. Please try again.");
          }
        });
    }
  };
  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form className="w-[350px] mx-auto flex flex-col items-center">
          <img className="w-32" src={logoDark} alt="darklogo" />
          <div className="w-full border border-gray-300 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Create Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Your name</p>
                <input
                  onChange={handleName}
                  value={clientName}
                  className="w-full py-1 border-zinc-400 px-2 text-base rounded-sm outline-none 
                  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  type="text"
                />{" "}
                {errClientName && (
                  <p className="text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 text-red-500">
                    <span className="text-base font-titleFont font-semibold italic  ">
                      !
                    </span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email or phone number</p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full  py-1 border-zinc-400 px-2 text-base rounded-sm outline-none 
                  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  type="email"
                />
                {errEmail && (
                  <p className="text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 text-red-500">
                    <span className="text-base font-titleFont font-semibold italic  ">
                      !
                    </span>
                    {errEmail}
                  </p>
                )}
                {firebaseErr && (
                  <p className="text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 text-red-500">
                    <span className="text-base font-titleFont font-semibold italic  ">
                      !
                    </span>
                    {firebaseErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full py-1 border-zinc-400 px-2 text-base rounded-sm outline-none 
                  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  type="password"
                />
                {errPassword && (
                  <p className="text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 text-red-500">
                    <span className="text-base font-titleFont font-semibold italic  ">
                      !
                    </span>
                    {errPassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Re-enter Password</p>
                <input
                  onChange={handleCPassword}
                  value={cPassword}
                  className="w-full  py-1 border-zinc-400 px-2 text-base rounded-sm outline-none 
                  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  type="password"
                />
                {errCPassword && (
                  <p className="text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 text-red-500">
                    <span className="text-base font-titleFont font-semibold italic  ">
                      !
                    </span>
                    {errCPassword}
                  </p>
                )}
                <p className="text-xs mt-1">
                  <span className="text-blue-600 text-sm italic pl-1 pr-2 font-serif font-semibold">
                    i
                  </span>
                  Passwords must be at least 6 characters.
                </p>
                <p className="text-sm py-3 text-justify">
                  To verify your number, we will send you a text message with a
                  temporary code. Message and data rates may apply.
                </p>
              </div>
              <button
                onClick={handleRegistration}
                type="submit"
                className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                Continue
              </button>
              {Loading && (
                <div className="flex justify-center">
                  <RotatingLines
                    strokeColor="#febd69"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                  />
                </div>
              )}
              {successMsg && (
                <div>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-base font-titlefont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center"
                  >
                    {successMsg}
                  </motion.p>
                </div>
              )}
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              By Continuing, you agree to Amazon&apos;s
              <span className="text-blue-600">Conditions of Use </span>and
              <span className="text-blue-600">Privacy Notice</span>
            </p>
            <div>
              <p className="text-sm text-black">
                Already have an account?
                <Link to="/signin">
                  <span className="text-xs text-blue-600 hover:text-red-700 hover:underline underline-offset-1 cursor-pointer duration-100">
                    Sign in
                    <span>
                      <ArrowRightIcon />
                    </span>
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full my-4 py-5 text-xs text-center bg-zinc-100 bg-gradient-to-t from-white via-white to-zinc-100">
        <div className="w-[350px] mx-auto mb-3 flex gap-3 justify-center items-center">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_cou?ie=UTF8&nodeId=200545940"
            className="text-blue-600  hover:text-orange-700 hover:underline cursor-pointer"
          >
            Conditions of Use
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_privacy_notice?ie=UTF8&nodeId=200534380"
            className="text-blue-600  hover:text-orange-700 hover:underline cursor-pointer"
          >
            Privacy Notice
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=508510"
            className="text-blue-600  hover:text-orange-700 hover:underline cursor-pointer"
          >
            Help
          </a>
        </div>
        <div className=" text-lightGray">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </div>
  );
};

export default Registration;
