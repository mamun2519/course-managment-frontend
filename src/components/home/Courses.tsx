import { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loading from "../shared/Loading";
import { useAllCourseQuery } from "../../redux/api/courseApi";
import CourseDetails from "./CourseDetails";
import { ICourse } from "../../interface/course";
import PaginationLink from "../ui/Pagination";
const Courses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: Record<string, any> = {};
  const handlePageChange = (_event: string, page: number) => {
    setCurrentPage(page);
  };
  query["page"] = currentPage;
  query["limit"] = pageLimit;
  //   query["sortBy"] = sortBy;
  if (searchTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useAllCourseQuery(query);
  console.log(data);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="my-20 max-w-7xl mx-auto lg:px-0 px-4">
      <h3 className="text-center text-3xl ">Our Courses</h3>

      <div className=" flex justify-end">
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label" className="px-4">
            Limit
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={pageLimit}
            label="Page"
            onChange={(e) => setLimit(e.target.value as number)}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={40}>40</MenuItem>
            <MenuItem value={60}>60</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="">
        <div className=" grid lg:grid-cols-3 grid-cols-1 gap-5  mt-10">
          {data?.data?.map((course: ICourse) => (
            <CourseDetails key={course?._id} course={course} />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <PaginationLink
          page={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Courses;
