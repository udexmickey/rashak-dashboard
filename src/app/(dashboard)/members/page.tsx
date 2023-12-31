"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TeamMemberTable from "@/components/ui/Tables/teamMember.table";
import { Button } from "@mui/material";
import NestedModal from "@/components/ui/modal";
import MemberCard from "@/components/ui/cards/MemberCard";
import BoardMemberTable from "@/components/ui/Tables/boardMember.table";

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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function MembersManagement() {
  const [value, setValue] = React.useState(0);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<string>("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function handleReassign(adminId: string, selectedMember: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Box
      sx={{ width: "100%", minHeight: "60vh" }}
      component={"div"}
      // className={"shadow-md"}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <Tabs
          value={value}
          TabIndicatorProps={{ style: { background: "#00A651" } }}
          // value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          className="text-[#00A651]"
        >
          <Tab
            label="Team members"
            {...a11yProps(0)}
            className="text-[#484848] text-lg capitalize"
            style={{ flexBasis: "100%" }}
          />
          <Tab
            label="Board members"
            {...a11yProps(1)}
            className="text-[#484848] text-lg capitalize"
            style={{ flexBasis: "100%" }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TeamMemberTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BoardMemberTable />
      </CustomTabPanel>

      <Button
        variant="contained"
        style={{
          backgroundColor: "#00A651",
          color: "#ffffff",
          marginRight: "2rem",
          marginBottom: "2rem",
        }}
        type="submit"
        className="px-6 !text-base py-2 capitalize mt-12 float-right mr-8 ml-10"
        sx={{
          "&:focus": { backgroundColor: "#00A651" },
          "&.Mui-error": { backgroundColor: "red" },
        }}
        onClick={() => setOpenModal(true)}
      >
        Add New Member
      </Button>

      {openModal && (
        <NestedModal
          handleClose={() => setOpenModal(false)}
          title={"Select Member"}
        >
          <MemberCard
            title="Kindly select the member you want to add"
            handleReassign={handleReassign}
            handleClose={() => setOpenModal(false)}
          />
        </NestedModal>
      )}
    </Box>
  );
}
