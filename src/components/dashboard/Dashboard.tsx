import { Typography } from "@mui/material";
import { ICourse } from "../../interface/course";
import { useMyEnrolledCourseQuery } from "../../redux/api/enrollCourseApi";
import CourseProgress from "../ui/Pogress";
import Loading from "../shared/Loading";

const Dashboard = () => {
  const { data, isLoading } = useMyEnrolledCourseQuery({ limit: 100 });
  if (isLoading) {
    return <Loading />;
  }
  console.log(data);
  return (
    <div className="my-10 max-w-7xl mx-auto h-full border lg:px-0 px-4 rounded-2xl shadow ">
      <div className="p-5">
        <h3 className="text-xl">My Enrolled Courses</h3>
        <div className=" grid lg:grid-cols-2 grid-cols-1 gap-5 mt-5">
          {data?.map((enrolledCourse: { course: ICourse }) => (
            <div
              key={enrolledCourse.course._id}
              className="lg:w-[600px] h-60 border rounded-2xl shadow p-2 flex"
            >
              <div className="w-60 h-56">
                <img
                  src={enrolledCourse?.course?.thumbnail}
                  className="w-60  h-56 rounded"
                  alt=""
                />
              </div>
              <div className="p-5 w-96">
                <div className="h-24">
                  <Typography style={{ fontSize: "18px" }}>
                    {enrolledCourse.course.name}
                  </Typography>{" "}
                  <Typography>{enrolledCourse.course.instructor}</Typography>
                  <Typography>
                    {enrolledCourse.course.duration} Duration
                  </Typography>
                </div>
                <div className="mt-3 w-full flex justify-center items-center gap-4">
                  <CourseProgress value={100} />
                  <div className="">
                    <Typography>100 %</Typography>
                  </div>
                </div>
                <div className="w-full h-10 cursor-pointer bg-red-500 text-white rounded flex justify-center items-center mt-2">
                  <button>Complete Course</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
