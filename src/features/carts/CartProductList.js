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
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import { fCurrency } from "../../utils/numberFormat";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCart,
  decreaseQuant,
  getTotals,
  increaseQuant,
  removeFromCart,
} from "./cartSlice";
import { useNavigate } from "react-router-dom";

function CartProductList({ setActiveStep }) {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { website } = useSelector((state) => state.website);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, cart]);

  return (
    <>
      {cart.cartItems.length === 0 ? (
        <Stack>
          <Typography> Your Cart Is Emty</Typography>
          <Button onClick={() => navigate(`/${website.websiteId}`)}>
            {" "}
            Start Shopping
          </Button>
        </Stack>
      ) : (
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
                {cart.cartItems &&
                  cart.cartItems.map((product) => (
                    <TableRow key={product._id}>
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
                              src={product.cover}
                              alt="product"
                              width="100%"
                              height="100%"
                            />
                          </Box>
                          <Typography variant="body2" nowrap>
                            {product.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{fCurrency(product.price)}</TableCell>
                      <TableCell>
                        <QuantityCounter
                          dispatch={dispatch}
                          quantity={product.quantity}
                          product={product}
                        />
                      </TableCell>
                      <TableCell>
                        {fCurrency(product.cartQuantity * product.price)}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{ color: "red" }}
                          onClick={() => dispatch(removeFromCart([product]))}
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
      )}
    </>
  );
}

function QuantityCounter({ dispatch, product }) {
  return (
    <Box sx={{ width: 96 }}>
      <IconButton onClick={() => dispatch(decreaseQuant(product))}>
        <IndeterminateCheckBoxIcon />
      </IconButton>
      {product.cartQuantity}
      <IconButton
        sx={{ color: "#2ecc71" }}
        onClick={() => dispatch(increaseQuant(product))}
      >
        <AddBoxIcon />
      </IconButton>
    </Box>
  );
}

export default CartProductList;
