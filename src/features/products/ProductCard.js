import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Stack,
  Button,
  CardActions,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import noImage from "../../components/no-image.png";
import { fCurrency } from "../../utils/numberFormat";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../carts/cartSlice";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { website } = useSelector((state) => state.website);

  const dispatch = useDispatch();

  return (
    <Card>
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
          <Typography gutterBottom variant="body" component="div" noWrap>
            {product.name}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Rating
              value={product.average_rating ? product.average_rating : ""}
              precision={0.1}
              readOnly
            />
            <Typography variant="body2" color="text.secondary">
              {fCurrency(product.price)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => dispatch(addToCart(product))}
          variant="contained"
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
