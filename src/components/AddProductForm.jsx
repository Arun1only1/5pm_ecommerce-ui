import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import { $axios } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { addProductBySeller } from "../lib/apis/product.apis";
import Loader from "./Loader";
import CustomSnackbar from "./CustomSnackbar";

const productCategories = [
  "grocery",
  "kitchen",
  "clothing",
  "electronics",
  "furniture",
  "cosmetics",
  "bakery",
  "liquor",
];

const AddProductForm = () => {
  const navigate = useNavigate();

  const addProductMutation = useMutation({
    mutationKey: ["add-product"],
    mutationFn: (values) => addProductBySeller(values),
    onSuccess: () => {
      navigate("/products");
    },
  });

  if (addProductMutation.isLoading) {
    return <Loader />;
  }

  console.log(addProductMutation);

  return (
    <>
      <CustomSnackbar
        open={addProductMutation.isError}
        status="error"
        message={
          addProductMutation?.error?.response?.data || "Something went wrong"
        }
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            padding: "8px",
            fontSize: "1rem",
            marginTop: "2rem",
            width: "30%",
          }}
          onClick={() => navigate("/products")}
        >
          Back to product page
        </Button>
        <Box
          sx={{
            margin: "5rem",
            width: "400px",

            padding: "10px",
            borderRadius: "10px",
            boxShadow:
              "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
          }}
        >
          <Formik
            initialValues={{
              name: "",
              company: "",
              price: 0,
              freeShipping: false,
              quantity: 0,
              category: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(2, "Name must be at least 2 characters.")
                .max(55, "Name must be at most 55 characters.")
                .trim()
                .required("Product name is required."),
              company: Yup.string()
                .min(2, "Company name must be at least 2 characters.")
                .max(55, "Company name must be at most 55 characters.")
                .trim()
                .required("Company is required."),
              price: Yup.number()
                .min(0, "Price cannot be less than or equals to 0.")
                .required("Price is required."),
              freeShipping: Yup.boolean().required(
                "Free shipping is required."
              ),
              quantity: Yup.number()
                .min(1, "Quantity must be at least 1.")
                .required("Quantity is required")
                .integer(),
              category: Yup.string()
                .trim()
                .required("Category is required.")
                .oneOf(productCategories),
            })}
            onSubmit={async (values) => {
              addProductMutation.mutate(values);
            }}
          >
            {({ handleSubmit, getFieldProps, errors, touched, values }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "2rem",
                  minWidth: "350px",
                }}
              >
                <TextField
                  sx={{ width: "100%" }}
                  name="name"
                  label="Product name"
                  {...getFieldProps("name")}
                />
                {touched.name && errors.name ? (
                  <div className="error-message">{errors.name}</div>
                ) : null}

                <TextField
                  sx={{ width: "100%" }}
                  name="company"
                  label="Company"
                  {...getFieldProps("company")}
                />
                {touched.company && errors.company ? (
                  <div className="error-message">{errors.company}</div>
                ) : null}

                <TextField
                  sx={{ width: "100%" }}
                  name="price"
                  label="Price"
                  {...getFieldProps("price")}
                  type="number"
                />
                {touched.price && errors.price ? (
                  <div className="error-message">{errors.price}</div>
                ) : null}

                <TextField
                  sx={{ width: "100%" }}
                  name="quantity"
                  label="Quantity"
                  {...getFieldProps("quantity")}
                  type="number"
                />
                {touched.quantity && errors.quantity ? (
                  <div className="error-message">{errors.quantity}</div>
                ) : null}

                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    label="Category"
                    {...getFieldProps("category")}
                  >
                    {productCategories.map((item, index) => {
                      return (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {touched.category && errors.category ? (
                    <div className="error-message">{errors.category}</div>
                  ) : null}
                </FormControl>

                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <InputLabel>Free shipping</InputLabel>
                  <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    label="Free shipping"
                    name="freeShipping"
                    {...getFieldProps("freeShipping")}
                  />
                </Grid>

                {/* {console.log({ values })} */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "100%", padding: "7px" }}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default AddProductForm;
