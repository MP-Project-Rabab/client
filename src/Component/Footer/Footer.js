import React from "react";
import { Stack, IconButton } from "@mui/material";
import "./style.css";
import { FaTwitter, FaFacebookF, FaInstagram, FaSnapchatGhost } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
    
      <Stack direction="row" spacing={1} sx={{m: 1}}>
        <IconButton sx={{color: "white", border: "2px solid white"}}>
          <FaTwitter />
        </IconButton>
        <IconButton sx={{color: "white", border: "2px solid white"}}>
          <FaFacebookF />
        </IconButton>
        <IconButton sx={{color: "white", border: "2px solid white"}}>
          <FaInstagram />
        </IconButton>
        <IconButton sx={{color: "white", border: "2px solid white"}}>
          <FaSnapchatGhost />
        </IconButton>
      </Stack>
    </div>
  );
};

export default Footer;
