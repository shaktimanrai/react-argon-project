import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NavLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

function MenuButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
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
        aria-controls="long-menu"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
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
            width: "25ch",
            boxShadow: "none",
            border: "1px solid black",
          },
        }}
      >
        {props.options.map((option) => (
          <NavLink
            to={`/admin/${option.page}/${props.index}`}
            key={option.name}
          >
            <MenuItem key={option.name} onClick={handleClose}>
              {option.name}
            </MenuItem>
          </NavLink>
        ))}
      </Menu>
    </div>
  );
}

export default MenuButton;
