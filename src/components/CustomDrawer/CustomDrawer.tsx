import React from "react";
import { Drawer, Paper } from "@mui/material";
import { IPayment } from "../../assets/interfaces";
import "./CustomDrawer.css";

interface DrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rowData: any;
}

export default function CustomDrawer({ isOpen, setIsOpen, rowData }: DrawerProps) {
  console.log("rowData: ", rowData);

  return (
    <div>
      {isOpen && (
        <Drawer anchor={"right"} open={isOpen} onClose={setIsOpen}>
          {/* <Paper sx={{ height: "100vh", width: "25rem" }}> */}
          <div className="drawer-container">
            <div className="drawer-title">Payment Number: {rowData.id}</div>

            <label className="drawer-label">Price: </label>
            <input type="number" defaultValue={rowData.price} className="drawer-input" />

            <label className="drawer-label">VAT: </label>
            <input type="number" defaultValue={rowData.VAT} className="drawer-input" />

            <label className="drawer-label">Total: </label>
            <input type="number" defaultValue={rowData.totalPrice} className="drawer-input" />
          </div>
          {/* </Paper> */}
        </Drawer>
      )}
    </div>
  );
}
