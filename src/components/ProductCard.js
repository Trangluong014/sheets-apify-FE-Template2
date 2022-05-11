import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack, Button, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../utils/numberFormat";
import noImage from "../no-image.png";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/products/${product.id}`)}>
        <CardMedia
          component="img"
          height="140"
          image={product.image ? product.image : noImage}
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
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through", color: "text.disabled" }}
            >
              {fCurrency(product.priceSale ? product.priceSale : "")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {fCurrency(product.price)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => {}} variant="contained">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
