import { Box, Input, TextField } from "@material-ui/core";
import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import "regenerator-runtime/runtime";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <Box display="flex" alignItems="center" >
      <strong style={{marginRight:'10px'}}>Search:</strong>{" "}
      <TextField
        size="small"
        variant="outlined"
        className="w-60"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </Box>
  );
};
