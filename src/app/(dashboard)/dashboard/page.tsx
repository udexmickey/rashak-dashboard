"use client";
import Maintance from "@/components/ui/placeholders/maintance.placeholder";
import React from "react";
import { MdEventNote, MdPhoto } from "react-icons/md";
import { FaUsers, FaVideo } from "react-icons/fa";
import { BiNews } from "react-icons/bi";
import { SiConvertio } from "react-icons/si";
import Charts from "./component/ui/chart/charts";
import SummeryCard from "./component/ui/cards/summery";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useOverviewCounts } from "@/hooks/useAnalytics";
import { TbBrandStorybook } from "react-icons/tb";

const DynamicChartsComponent = dynamic(
  () => import("./component/ui/chart/charts"),
  {
    ssr: false, // Disable server-side rendering
  }
);
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      // id={`simple-tabpanel-${index}`}
      // aria-labelledby={`simple-tab-${index}`}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    //   id: `simple-tab-${index}`,
    //   'aria-controls': `simple-tabpanel-${index}`,
    // };
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data: overviewData } = useOverviewCounts();

  return (
    <div className="flex items-stretch justify-between flex-col h-[87dvh] gap-y-8">
      {/* <Maintance /> */}
      <div className="flex justify-left items-center gap-12 flex-wrap">
        <SummeryCard
          title={"Total Images"}
          icon={MdPhoto}
          color={"#C7FFE2"}
          amount={(overviewData && overviewData?.totalImages) ?? "510"}
        />

        <SummeryCard
          title={"Total Blog posts"}
          icon={MdEventNote}
          color={"#FFE8D9"}
          amount={(overviewData && overviewData?.totalBlogs) ?? "90"}
        />

        <SummeryCard
          title={"Total Media/News posts"}
          icon={BiNews}
          color={"#C7FFE2"}
          amount={(overviewData && overviewData?.totalNews) ?? "62"}
        />

        <SummeryCard
          title={"Team & Board members"}
          icon={FaUsers}
          color={"#FFE8D9"}
          amount={(overviewData && overviewData?.totalMembers) ?? "30"}
        />

        <SummeryCard
          title={"Total Stories"}
          icon={TbBrandStorybook}
          color={"#C7FFE2"}
          amount={(overviewData && overviewData?.totalStories) ?? "62"}
        />
        {/* <SummeryCard
          title={"Total Videos"}
          icon={FaVideo}
          color={"#FFE8D9"}
          amount={(overviewData && overviewData?.totalVideos) ?? "60"}
        /> */}
      </div>

      {/* <div className="max-h-[510px] bg-white h-full"> */}
      <Box sx={{}}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            TabIndicatorProps={{ style: { background: "#00A651" } }}
            onChange={handleChange}
            textColor="inherit"
            // variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              label="Page Views"
              {...a11yProps(0)}
              className="text-[#484848] text-lg capitalize"
              // style={{ flexBasis: "100%" }}
            />
            <Tab
              label="User Engagement"
              {...a11yProps(1)}
              className="text-[#484848] text-lg capitalize"
              // style={{ flexBasis: "100%" }}
            />
            <Tab
              label="Popular Content"
              {...a11yProps(2)}
              className="text-[#484848] text-lg capitalize"
              // style={{ flexBasis: "100%" }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <DynamicChartsComponent type={"bar"} datas={undefined} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* <div className="max-h-[500px] bg-white"> */}
          <DynamicChartsComponent type={"area"} datas={undefined} />
          {/* </div> */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <DynamicChartsComponent type={"heatmap"} datas={undefined} />
        </CustomTabPanel>
      </Box>
      {/* </div> */}
    </div>
  );
}
