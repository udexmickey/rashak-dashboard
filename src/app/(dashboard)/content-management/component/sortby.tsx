import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import React from "react";

export default function SortBy({
  sortBy,
  setSortBy,
  SortedItems,
}: {
  sortBy: string;
  setSortBy: (e: SelectChangeEvent) => void;
  SortedItems: string[];
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sortBy as any}
        label="Sort By"
        style={{ minWidth: "150px" }}
        onChange={(e: SelectChangeEvent) => setSortBy(e)}
      >
        {SortedItems.map((item: string) => (
          <MenuItem key={item} value={item.toLowerCase()}>
            {item}
          </MenuItem>
        ))}
        {/* <MenuItem value="newest">Newest</MenuItem>
        <MenuItem value="oldest">Oldest</MenuItem> */}
      </Select>
    </FormControl>
  );
}
