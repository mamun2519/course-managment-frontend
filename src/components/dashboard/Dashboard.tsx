import { Typography } from "@mui/material";
import { ICourse } from "../../interface/course";
import {
  useDeleteEnrolledCourseMutation,
  useMyEnrolledCourseQuery,
  useUpdatedCourseMutation,
} from "../../redux/api/enrollCourseApi";
import CourseProgress from "../ui/Pogress";
import Loading from "../shared/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
const Dashboard = () => {
  const [deleteEnrolledCourse] = useDeleteEnrolledCourseMutation();
  const [updatedCourse] = useUpdatedCourseMutation();
  const { data, isLoading } = useMyEnrolledCourseQuery({ limit: 100 });
  if (isLoading) {
    return <Loading />;
  }

  const deleteCourseHandler = async (id: string) => {
    try {
      const res = await deleteEnrolledCourse(id).unwrap();
      if (res) {
        toast.success("Course Delete Successfully");
      } else {
        toast.error("Something is worng");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const courseCompleteHandler = async (id: string) => {
    const data = { id, status: "Completed" };
    try {
      const res = await updatedCourse(data).unwrap();
      if (res) {
        toast.success("Congratulation , Course Completed");
      } else {
        toast.error("Something is wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="my-10 max-w-7xl mx-auto h-full border lg:px-0 px-4 rounded-2xl shadow ">
      <div className="p-5">
        <h3 className="text-xl">My Enrolled Courses</h3>
        <div className=" grid lg:grid-cols-2 grid-cols-1 gap-5 mt-5">
          {data?.map(
            (enrolledCourse: {
              course: ICourse;
              status: string;
              _id: string;
            }) => (
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
                  <div className="h-36">
                    <div className="">
                      <Typography style={{ fontSize: "18px" }}>
                        {enrolledCourse?.course?.name}
                      </Typography>{" "}
                      <Typography>
                        {enrolledCourse?.course?.instructor}
                      </Typography>
                      <Typography>
                        {enrolledCourse?.course?.duration} Duration
                      </Typography>
                      <Typography>
                        {enrolledCourse?.status == "Completed"
                          ? "Course Completed"
                          : "Course Not Complete"}
                      </Typography>
                    </div>
                    <div className=" w-full flex justify-center items-center gap-4">
                      <CourseProgress
                        value={enrolledCourse.status == "Completed" ? 100 : 0}
                      />
                      <div className="m">
                        <Typography>
                          {enrolledCourse.status == "Completed" ? 100 : 0} %
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2  justify-center items-center">
                    <button
                      disabled={enrolledCourse.status === "Completed"}
                      onClick={() => courseCompleteHandler(enrolledCourse._id)}
                      className={`${
                        enrolledCourse.status === "Completed"
                          ? "bg-red-200"
                          : " bg-red-500"
                      } w-full h-10 cursor-pointer  text-white rounded flex justify-center items-center mt-2`}
                    >
                      Complete Course
                    </button>
                    <div className=" flex items-center justify-center mt-3">
                      <button
                        onClick={() => deleteCourseHandler(enrolledCourse._id)}
                        className="w-20 h-10  border text-red-500"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
