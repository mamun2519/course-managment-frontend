import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
type IPaginationPops = {
  page: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlePageChange: any;
};
const PaginationLink = ({ page, handlePageChange }: IPaginationPops) => {
  return (
    <div className=" flex justify-center">
      <Stack spacing={2}>
        <Pagination
          count={70}
          onChange={handlePageChange}
          page={page}
          variant="outlined"
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default PaginationLink;
