import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SlOptionsVertical } from "react-icons/sl";
import { MdAssignmentAdd, MdAutoDelete } from "react-icons/md";
import { IconType } from "react-icons/lib";
import { ListItemIcon } from "@mui/material";

interface OptionItemsProps {
  icon: IconType;
  text: string;
  adminId: string;
  onClick: (text: string, adminId: string) => void;
}

const ITEM_HEIGHT = 48;

const OptionItems: React.FC<OptionItemsProps> = ({
  icon: Icon,
  text,
  adminId,
  onClick,
}) => {
  return (
    <>
      <MenuItem onClick={() => onClick(text, adminId)}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        {text}
      </MenuItem>
    </>
  );
};

export default function EditOptionMenu({
  adminId,
  handleOptionClick,
}: {
  adminId: string;
  handleOptionClick: (optionName: string, clickedAdminId: string) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SlOptionsVertical />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <OptionItems
          icon={MdAssignmentAdd}
          text="Re-Assign"
          adminId={adminId}
          onClick={handleOptionClick}
        />
        <OptionItems
          icon={MdAutoDelete}
          text="Delete"
          adminId={adminId}
          onClick={handleOptionClick}
        />
      </Menu>
    </div>
  );
}
