import { useParams } from "react-router-dom";
import { useCourseDetailsQuery } from "../../redux/api/courseApi";
import { ICourse } from "../../interface/course";
import { Typography } from "@mui/material";
import Loading from "../shared/Loading";
import { ISyllabus } from "../../interface/syllabus";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import { useEnrolledCourseMutation } from "../../redux/api/enrollCourseApi";

const Course = () => {
  const [enrolledCourse] = useEnrolledCourseMutation();
  const user: { email: string | null; userId: string | null } = useAppSelector(
    (state) => state.user.user
  );
  const params: { id: string } = useParams();
  const { data, isLoading } = useCourseDetailsQuery(params.id);

  const course: ICourse = data;
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
      } catch (error: any) {
        console.log(error);
        toast.error(error?.data);
      }
    } else {
      toast.error("Please Login First");
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="my-10 max-w-7xl mx-auto lg:px-0 px-4 border h-full  grid lg:grid-cols-2  grid-cols-1  rounded-xl shadow">
      <div className="w-full h-full">
        <img
          src={course?.thumbnail}
          className="w-full h-full rounded-l-xl"
          alt=""
        />
      </div>
      <div className="px-8 mt-3">
        <h3 className="text-2xl">{course?.name}</h3>
        <div className="mt-1">
          {" "}
          <Typography>{course?.description}</Typography>
        </div>

        <h3 className="my-2 text-xl">Course Basic Information</h3>
        <div className="mt-1 flex ">
          <div className=" w-48">
            <Typography>Instructor</Typography>
          </div>
          <Typography>{course?.instructor}</Typography>
        </div>
        <div className="mt-1 flex ">
          <div className=" w-48">
            <Typography>Duration</Typography>
          </div>
          <Typography>{course?.duration}</Typography>
        </div>
        <div className="mt-1 flex ">
          <div className=" w-48">
            <Typography>Enrollment Status</Typography>
          </div>
          <Typography className="text-red-600 font-bold">
            {course?.enrollmentStatus}
          </Typography>
        </div>
        <div className="mt-1 flex ">
          <div className=" w-48">
            <Typography>schedule</Typography>
          </div>
          <Typography>{course?.schedule}</Typography>
        </div>
        <div className="mt-1 flex ">
          <div className=" w-48">
            <Typography>Location</Typography>
          </div>
          <Typography>{course?.location}</Typography>
        </div>
        <div className="mt-2">
          <h3 className=" text-xl">Pre Requisites</h3>
          <div className="px-4 mt-1">
            {course?.prerequisites?.map((preRequisit) => (
              <li>
                <Typography className=" inline">{preRequisit}</Typography>
              </li>
            ))}
          </div>
        </div>

        <div className="mt-4 pb-4">
          <h3 className="my-2 text-xl">Syllabus</h3>
          {course?.syllabus?.map((syllabus: ISyllabus, index: number) => (
            <div key={index}>
              <div className="mt-1 flex ">
                <div className=" w-48">
                  <Typography>Week</Typography>
                </div>
                <Typography>{syllabus?.week}</Typography>
              </div>
              <div className="mt-1 flex ">
                <div className=" w-48">
                  <Typography>Topic</Typography>
                </div>
                <Typography>{syllabus?.topic}</Typography>
              </div>
              <div className="mt-1 flex ">
                <div className=" w-48">
                  <Typography>Content</Typography>
                </div>
                <Typography>{syllabus?.content}</Typography>
              </div>
            </div>
          ))}
        </div>

        <div className="py-4">
          <button
            onClick={() => enrolledCourseHandler(course?._id)}
            className="w-full h-12 bg-red-500 text-white rounded flex justify-center items-center"
          >
            Enrolled Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;
