import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Stack,
  CardActions,
  Rating,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import noImage from "../../components/no-image.png";
import { fCurrency } from "../../utils/numberFormat";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../carts/cartSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import "./productCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { website } = useSelector((state) => state.website);

  const dispatch = useDispatch();

  return (
    <Card className="product-card">
      <CardActionArea
        onClick={() =>
          navigate(`/${website.websiteId}/products/${product.rowIndex}`)
        }
      >
        <CardMedia
          component="img"
          height="140"
          image={product.cover ? product.cover : noImage}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="body2" noWrap sx={{ my: 2 }}>
            {product.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600 }}
            color="text.secondary"
          >
            {fCurrency(product.price)}
          </Typography>
        </CardContent>
        <CardContent>
          <Stack direction="row">
            <Rating
              value={product.average_rating ? product.average_rating : ""}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography variant="body2" sx={{ mx: 1 }}>
              ({product.total_rating || 0})
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Tooltip title="Add to cart">
          <IconButton
            onClick={() => dispatch(addToCart(product))}
            variant="contained"
            size="small"
          >
            <AddShoppingCartIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
