import { Link } from "react-router-dom";

const FooterTop = () => {
  return (
    <section name="footer-top" className="bg-white pt-5">
      <div className="border-y-[1px] border-[#ddd] py-6 px-5 ">
        <div className="w-[230px] mx-auto text-center pt-2">
          <p className="text-[13px] leading-6 font-medium">
            See Personalized recommendations
          </p>
          <Link to="/signin">
          <button className="w-full bg-yellow-400 rounded-md py-[6px] text-xs font-semibold cursor-pointer hover:bg-yellow-500 active active::bg-yellow-700">
            Sign In
          </button>
          </Link>
          <p className="text-[11px] mt-1">
            New customer?
            <span className="text-[#007185] cursor-pointer">Start here.</span>
          </p>
        </div>
      </div>
      <div className="text-center text-sm bg-[#37475a] mt-4 text-[#fff] font-medium hover:bg-opacity-90 cursor-pointer">
        <a href="#" className=" block py-4">
          Back to top
        </a>
      </div>
    </section>
  );
};

export default FooterTop;
