import React from "react";
import { ICourse } from "../../interface/course";
import { Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import { useLikedCourseMutation } from "../../redux/api/courseApi";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/hooks";
import { useEnrolledCourseMutation } from "../../redux/api/enrollCourseApi";
const CourseDetails = ({ course }: { course: ICourse }) => {
  const user: { email: string | null; userId: string | null } = useAppSelector(
    (state) => state.user.user
  );

  const [likedCourse] = useLikedCourseMutation();
  const [enrolledCourse] = useEnrolledCourseMutation();

  const enrolledCourseHandler = async (id: string) => {
    const data = { userId: user.userId, course: id };
    if (user?.email) {
      try {
        const res = await enrolledCourse(data).unwrap();
        if (res) {
          toast.success("Course Enrolled Successfully");
        } else {
          toast.error("Something is wrong");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please Login First");
    }
  };
  const likeHandler = async (id: string) => {
    if (user.email) {
      try {
        const res = await likedCourse(id).unwrap();
        if (res) {
          toast.success("Liked");
        } else {
          toast.success("Un-liked");
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please Login First");
    }
  };
  return (
    <div className="w-96 h-full border rounded-2xl shadow">
      <div className="  h-44  p-3 rounded-xl">
        <img
          src={course.thumbnail}
          className=" rounded-xl h-44 w-full"
          alt=""
        />
      </div>
      <div className="p-3 mt-3 h-44">
        <h3 className="text-xl">{course.name}</h3>
        <div className="mt-1 flex ">
          <div className=" w-40">
            <Typography>Instructor</Typography>
          </div>
          <Typography>{course.instructor}</Typography>
        </div>
        <div className="mt-1 flex ">
          <div className=" w-40">
            <Typography>Duration</Typography>
          </div>
          <Typography>{course.duration}</Typography>
        </div>
        <div className="mt-1 flex ">
          <div className=" w-40">
            <Typography>Enrollment Status</Typography>
          </div>
          <Typography>{course.enrollmentStatus}</Typography>
        </div>
        <div className="mt-1 flex ">
          <div className=" w-40">
            <Typography>Location</Typography>
          </div>
          <Typography>{course.location}</Typography>
        </div>
      </div>
      <div className="p-3 mt-1 grid grid-cols-2">
        <div className=" flex gap-3">
          <div
            onClick={() => likeHandler(course?._id)}
            className={`${
              course?.likes?.some((LikeUser) => LikeUser.user == user.userId)
                ? "text-red-600"
                : "text-blue-600"
            } h-12 w-20 cursor-pointer border  flex  justify-center items-center rounded`}
          >
            <div className=" flex  items-center mt-2 ">
              <Typography className="px-2">{course.like} </Typography>
            </div>{" "}
            <ThumbUpIcon />
          </div>
          <Link
            to={`/course/${course?._id}`}
            className="h-12 w-20 border text-red-600 flex  justify-center items-center rounded"
          >
            <RemoveRedEyeIcon />
          </Link>
        </div>
        <div
          onClick={() => enrolledCourseHandler(course?._id)}
          className="w-full h-12 cursor-pointer bg-red-500 text-white rounded flex justify-center items-center"
        >
          <button>Enrolled Now</button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
