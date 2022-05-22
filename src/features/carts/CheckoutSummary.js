import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { fCurrency } from "../../utils/numberFormat";
import { checkout, clearCart } from "./cartSlice";

function CheckoutSummary() {
  const { delivery, cartItems, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { website } = useSelector((state) => state.website);
  const handleCheckout = () => {
    const order = { delivery, cartItems, cartTotalAmount };
    console.log(order);
    dispatch(
      checkout({
        order,
        cb: () => {
          navigate(`/${website.websiteId}/checkout/completed`, {
            replace: true,
          });
        },
      })
    );

    dispatch(clearCart());
  };

  return (
    <Container>
      <Typography variant="h3" sx={{ my: 8 }}>
        Your Order
      </Typography>
      {/* <Divider /> */}
      <Stack direction="row" spacing={3} justifyContent="space-between" my={6}>
        <Box>
          <Typography>Order Date</Typography>
          <Typography>{new Date().toLocaleDateString("en-GB")}</Typography>
        </Box>
        <Box>
          <Typography>Name</Typography>
          <Typography>{delivery.name}</Typography>
        </Box>
        <Box>
          <Typography>Phone Number</Typography>
          <Typography>{delivery.phone}</Typography>
        </Box>
        <Box>
          <Typography>Address</Typography>
          <Typography>{delivery.address}</Typography>
        </Box>
        <Box>
          <Typography>City</Typography>
          <Typography>{delivery.city}</Typography>
        </Box>
        <Box>
          <Typography>Country</Typography>
          <Typography>{delivery.country}</Typography>
        </Box>
      </Stack>
      {/* <Divider /> */}
      <TableContainer sx={{ my: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell style={{ textAlign: "right" }}>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map(({ _id, name, price, cartQuantity, cover }) => (
              <TableRow key={_id}>
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
                <TableCell>{cartQuantity}</TableCell>
                <TableCell style={{ textAlign: "right" }}>
                  {fCurrency(cartQuantity * price)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>Total Price</TableCell>
              <TableCell style={{ textAlign: "right" }}>
                <Typography>{fCurrency(cartTotalAmount)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button variant="contained" onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
    </Container>
  );
}

export default CheckoutSummary;
