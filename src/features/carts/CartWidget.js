import { Badge, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getTotals } from "./cartSlice";

const WidgetStyle = styled(IconButton)(({ theme }) => ({
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
  // backgroundColor: theme.palette.primary.light,
  borderRadius: "50%",
  // color: theme.palette.text.primary,
  cursor: "pointer",
}));

function CartWidget() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { website } = useSelector((state) => state.website);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <WidgetStyle
      size="large"
      onClick={() => navigate(`/${website.websiteId}/checkout`)}
    >
      <Badge color="warning" badgeContent={cart.cartTotalQuantity}>
        <ShoppingCartIcon fontSize="inherit" />
      </Badge>
    </WidgetStyle>
  );
}

export default CartWidget;
