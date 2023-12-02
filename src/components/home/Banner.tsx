import BannerPic from "../../assets/picture/Course app-pana.svg";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-20 grid lg:grid-cols-2 grid-cols-1 gap-5  max-w-7xl mx-auto lg:px-0 px-4">
      <div className=" flex items-center">
        <div>
          {" "}
          <h3 className="text-5xl font-bold">Enrolled Course</h3>
          <div className="h-2 bg-red-500 w-28 mt-3"></div>
          <div className="mt-3">
            <p>
              Team Enjoy Time is a dynamic and collaborative group of
              individuals who share a common passion for creating positive and
              memorable experiences. Comprising diverse talents and backgrounds,
              our team is committed to fostering a vibrant and inclusive
              atmosphere where everyone feels valued and appreciated.
            </p>
            <div className="mt-5">
              {" "}
              <button
                onClick={() => navigate("/my-team")}
                className="px-8 py-2 bg-red-500 text-white rounded-xl"
              >
                Go Team
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <img src={BannerPic} className="" alt="" />
      </div>
    </div>
  );
};

export default Banner;
