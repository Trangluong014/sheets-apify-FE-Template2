import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { SatelliteAlt } from "@mui/icons-material";

const WidgetStyle = styled(RouterLink)(({ theme }) => ({
  zIndex: 999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  right: "20px",
  top: "100px",
  height: "40px",
  width: "40px",
  padding: "8px",
  backgroundColor: "#fff",
  borderRadius: "50%",
  color: theme.palette.text.primary,
  cursor: "pointer",
}));

function CartWidget() {
  const { cartProducts } = useSelector((state) => state.cart);
  const totalItems = cartProducts.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  return (
    <WidgetStyle to="/checkout">
      <Badge badgeContent={totalItems} color="primary">
        <ShoppingCartIcon />
      </Badge>
    </WidgetStyle>
  );
}

export default CartWidget;
