import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useRef, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SideNavContent from "./SideNavContent";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
const HeaderBottom = () => {
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const ref = useRef();
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setSidebar(false);
      }
    });
  }, [ref, sidebar]);
  return (
    <div className="bg-amazon_light text-white w-full px-4 h-[36px] flex items-center">
      {/* Listitems Starts here */}
      <ul className="flex items-center gap-2 text-sm tracking-wide">
        <li
          onClick={() => setSidebar(true)}
          className="headerHover flex items-center gap-2 text-sm"
        >
          <MenuIcon /> All
        </li>
        <li className="headerHover">Today&apos;s Deals</li>
        <li className="headerHover">Customer Services</li>
        <li className="headerHover">Gift Cards</li>
        <li className="headerHover">Registry</li>
        <li className="headerHover">Sell</li>
      </ul>
      {/* Listitems Ends here */}
      {/* SideNav Starts here */}
      {sidebar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50 z-50">
          <div className="w-full h-full relative ">
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="scroll relative h-full w-[80%] overflow-x-hidden overflow-y-scroll border border-black bg-white md:w-[350px]"
            >
              <div className="w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4">
                {userInfo ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={userInfo.image}
                    alt="UserImg"
                  />
                ) : (
                  <AccountCircleIcon />
                )}
                <h3 className="font-titleFont font-bold text-lg tracking-wide">
                  {userInfo ? (
                    <p className="text-sm mdl:text-xs text-gray-100 mdl:text-lightText font-medium">
                      Hello, {userInfo.userName}
                    </p>
                  ) : (
                    <p className="text-sm mdl:text-xs text-white mdl:text-lightText font-light">
                      Hello, sign in
                    </p>
                  )}
                </h3>
              </div>
              <SideNavContent
                title="Trending"
                one="Best Sellers"
                two="New Releases"
                three="Movers and Shakers"
              />
              <SideNavContent
                title="Digital Content & Devices"
                one="Amazon Prime Music"
                two="Amazon Prime Video"
                three="Audible AudioBooks"
              />
              <SideNavContent
                title="Shop by Department"
                one="Electronics"
                two="Computers"
                three="Smart Home"
              />
              <SideNavContent
                title="Programs & Features"
                one="Gift Cards & Mobile Recharges"
                two="Amazon Launchpad"
                three="Clearnce store"
              />
              <SideNavContent
                title="Help & Settings"
                one="Your Account"
                two="Customer Service"
                three="Sign in"
              />
            </motion.div>
            <span
              onClick={() => setSidebar(false)}
              className="absolute top-0 left-[360px] cursor-pointer w-10 h-10 text-white flex items-center justify-center "
            >
              <CloseIcon fontSize="large" />
            </span>
          </div>
        </div>
      )}
      {/* SideNav Ends here */}
    </div>
  );
};

export default HeaderBottom;
