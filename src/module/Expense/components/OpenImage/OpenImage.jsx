import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React from "react";

const OpenImage = ({ open, setOpen, url }) => {
  console.log(url);
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl">
        <DialogTitle>
          Увеличенное изображение
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          ></IconButton>
        </DialogTitle>
        <DialogContent>
          <img
            src={`http://localhost:3030/${url}`}
            alt={url}
            width={1000} // Установите ширину по вашему усмотрению
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpenImage;
