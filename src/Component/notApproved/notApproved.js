import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material/";
import "./style.css";
// End of import all dependencies

const NotApproved = () => {
  const [approve, setApprove] = useState({});
  useEffect(() => {
    allNonApproved();
  }, []);

  const state = useSelector((state) => {
    return state;
  });

  // Get All Products Is not Approvedfunction
  const allNonApproved = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/notAprove`,

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      setApprove(result.data);
    
    } catch (error) {
      console.log(error);
    }
  };
  // Approved All Products function
  const approved = async (id) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/products/approved`,
        { isApproved: true, _id: id },

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
    allNonApproved();
  };

  return (
    <div className="users">
      <TableContainer
        component={Paper}
        style={{
          width: "auto",
          padding: "7px",
          margin: "auto",
          marginTop: "1rem",
        }}
        >
        <h1 className="h11">قائمة المنتجات</h1>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">المنتج</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">السعر</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {approve.length &&
            approve.map((item, i) => {
                return (
                  <TableRow
                    key={i}
                    className="cart-card"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="right">
                      <img src={item.img} alt="" />
                    </TableCell>
                    <TableCell align="right">
                      <h3>{item.name}</h3>
                    </TableCell>
                    <TableCell align="right">
                      <h4> {item.price}</h4>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => approved(item._id)}
                      >
                       يعتمد
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NotApproved;
