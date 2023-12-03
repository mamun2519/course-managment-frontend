import React from "react";
import { useParams } from "react-router-dom";
import { useCourseDetailsQuery } from "../../redux/api/courseApi";
import { ICourse } from "../../interface/course";
import { Typography } from "@mui/material";

const Course = () => {
  const params: { id: string } = useParams();
  const { data } = useCourseDetailsQuery(params.id);
  console.log(data);
  const course: ICourse = data;

  return (
    <div className="my-20 max-w-7xl mx-auto lg:px-0 px-4 border h-[550px]  grid lg:grid-cols-2  grid-cols-1  rounded-xl shadow">
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
          <Typography>{course?.enrollmentStatus}</Typography>
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
          <h3 className=" text-xl">prerequisites</h3>
        </div>
      </div>
    </div>
  );
};

export default Course;
