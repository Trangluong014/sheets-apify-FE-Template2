import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, FTextField } from "../../components/form";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDelivery } from "./cartSlice";

const DeliverySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone Number is required"),
  address: yup.string().required("Adress is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
});
const defaultValues = {
  name: "",
  phone: "",
  address: "",
  city: "",
  country: "",
};

function CheckoutDelivery({ setActiveStep }) {
  const methods = useForm({
    defaultValues: window.localStorage.getItem("defaultAddress")
      ? JSON.parse(window.localStorage.getItem("defaultAddress"))
      : defaultValues,
    resolver: yupResolver(DeliverySchema),
  });
  const { handleSubmit } = methods;
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setActiveStep((step) => step + 1);
    window.localStorage.setItem("defaultAddress", JSON.stringify(data));
    dispatch(setDelivery(data));
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ width: { md: "350px", xs: "200px" } }}>
          <Typography variant="h4" textAlign="center">
            Delivery Address
          </Typography>
          <FTextField name="name" label="Name" />
          <FTextField name="phone" label="Phone" />
          <FTextField name="address" label="Address" />
          <FTextField name="city" label="City" />
          <FTextField name="country" label="Country" />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default CheckoutDelivery;
