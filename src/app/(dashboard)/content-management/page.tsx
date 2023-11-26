"use client";
import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import NewsTable from "./component/news.table";
import StoryTable from "./component/stories.table";
import BlogPostTable from "./component/blog.table";

export default function ContentManagement() {
  const [page, setPage] = React.useState<string | null>(
    "Media & News".toLowerCase()
  );
  const options = ["Media & News", "BlogPost", "Stories"];

  return (
    <div>
      <Grid container>
        <div className="flex flex-col flex-wrap gap-y-8 max-w-7xl w-full isolate box-border mt-4">
          <Grid item>
            <FormControl style={{ maxWidth: "258px", width: "100%" }}>
              <InputLabel id="demo-simple-select-label">Select Page</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={page as any} // Value of the hasStates filter select input
                label="Select Page"
                style={{
                  maxWidth: "458px",
                  width: "100%",
                  borderRadius: "3rem",
                }}
                onChange={(e: SelectChangeEvent) => setPage(e.target.value)} // Function to handle changes in the hasStates filter select input
              >
                {options.map((option) => {
                  return (
                    <MenuItem key={option} value={option.toLowerCase()}>
                      {option}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          {page === "Stories".toLowerCase() ? (
            <StoryTable />
          ) : page === "BlogPost".toLowerCase() ? (
            <BlogPostTable />
          ) : (
            <NewsTable />
          )}
        </div>
      </Grid>
    </div>
  );
}
