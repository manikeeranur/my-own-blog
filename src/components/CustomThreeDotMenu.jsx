import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { MoreHoriz, MoreVert } from "@mui/icons-material";

const ITEM_HEIGHT = 48;

function CustomThreeDotMenu({ options, icon, iconStyle }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {options?.length > 0 && (
        <IconButton
          aria-controls="three-dot-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {icon === "horiz" ? <MoreHoriz /> : <MoreVert sx={iconStyle || {}} />}
        </IconButton>
      )}
      <Menu
        id="three-dot-menu"
        className="custom-three-dot-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            minWidth: "160px",
            maxWidth: "230px",
            border: "1px solid var(--bs-border-color)",
            boxShadow: "0 16px 48px rgba(0,0,0,.175)",
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={option?.func} hidden={option?.hidden}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default CustomThreeDotMenu;
