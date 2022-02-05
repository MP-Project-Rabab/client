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
} from "@mui/material";
const Posts = () => {
  useEffect(() => {
    postNotApproved();
  }, []);
  const [approve, setApprove] = useState({});

  const state = useSelector((state) => {
    return state;
  });
  //  Get All Posts Is not Approved function
  const postNotApproved = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/notAprove`,

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

  // Approved All Posts function
  const postApprove = async (id) => {
    try {
      // eslint-disable-next-line
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/posts/approved`,
        { isApproved: true, _id: id },

        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    postNotApproved();
  };
  return (
    <div className="approve-posts">
      <TableContainer
        component={Paper}
        style={{
          width: "auto",
          height: "40rem",
          padding: "7px",
          margin: "auto",
        }}
        >
        <h1 className="h11">قائمة البوستات</h1>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell align="right">العنوان</TableCell>
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
                      <h3>{item.title}</h3>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => postApprove(item._id)}
                      >
                       موافقة
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

export default Posts;
