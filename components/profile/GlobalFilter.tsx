import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import "regenerator-runtime/runtime";

export const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter);
    const onChange = useAsyncDebounce((value) => {
      setFilter(value || undefined);
    }, 1000);
    return (
      <div className="mb-2 flex justify-center place-items-center">
        <strong className="mr-2">Search:</strong>{" "}
        <input
          className="w-60"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </div>
    );
  };
  