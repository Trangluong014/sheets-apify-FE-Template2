import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SatelliteAlt } from "@mui/icons-material";
import { getTotals } from "./cartSlice";

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
  const cart = useSelector((state) => state.cart);
  const { website } = useSelector((state) => state.website);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <WidgetStyle to={`/${website.websiteId}/checkout`}>
      <Badge badgeContent={cart.cartTotalQuantity} color="primary">
        <ShoppingCartIcon />
      </Badge>
    </WidgetStyle>
  );
}

export default CartWidget;
