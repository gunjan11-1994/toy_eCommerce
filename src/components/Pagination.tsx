import { Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
}

function Pagination({ count, page, onChange }: PaginationProps) {
  return (
    <MuiPagination
      count={count}
      page={page}
      onChange={(_, value) => onChange(value)}
      color="primary"
      shape="rounded"
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
      }}
    />
  );
}

export default Pagination;
