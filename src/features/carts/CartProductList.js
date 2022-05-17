import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import { fCurrency } from "../../utils/numberFormat";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";

function CartProductList({ setActiveStep }) {
  const { cartProducts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts.map(({ id, name, price, quantity, cover }) => (
              <TableRow key={id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        display: "flex",
                        width: 64,
                        height: 64,
                        mr: "5px",
                      }}
                    >
                      <img
                        src={cover}
                        alt="product"
                        width="100%"
                        height="100%"
                      />
                    </Box>
                    <Typography variant="body2" nowrap>
                      {name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{fCurrency(price)}</TableCell>
                <TableCell>
                  <QuantityCounter
                    dispatch={dispatch}
                    quantity={quantity}
                    id={id}
                  />
                </TableCell>
                <TableCell>{fCurrency(quantity * price)}</TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() =>
                      dispatch({ type: "DEL_PRODUCT", payload: id })
                    }
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant="contained"
          onClick={() => setActiveStep((step) => step + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

function QuantityCounter({ dispatch, quantity, id }) {
  return (
    <Box sx={{ width: 96 }}>
      <IconButton onClick={() => dispatch({ type: "DEC_QUANT", payload: id })}>
        <IndeterminateCheckBoxIcon />
      </IconButton>
      {quantity}
      <IconButton
        sx={{ color: "#2ecc71" }}
        onClick={() => dispatch({ type: "INC_QUANT", payload: id })}
      >
        <AddBoxIcon />
      </IconButton>
    </Box>
  );
}

export default CartProductList;
