import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { $axios } from "../../lib/axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import CustomSnackbar from "../../components/CustomSnackbar";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState({
    isError: false,
    errorMessage: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <CustomSnackbar
        open={errorInfo.isError}
        status="error"
        message={errorInfo.errorMessage}
      />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address.")
              .required("Email is required."),
            password: Yup.string().trim().required("Password is required."),
          })}
          onSubmit={async (values) => {
            try {
              setLoading(true);

              // hit route
              const response = await $axios.post("/user/login", values);

              setLoading(false);

              // extract accesstoken
              const accesstoken = response.data.access_token;

              console.log(response);

              // save access token to local storage
              localStorage.setItem("accesstoken", accesstoken);

              // push to home page
              navigate("/");
            } catch (error) {
              setLoading(false);
              setErrorInfo({
                isError: true,
                errorMessage: error.response.data.message,
              });
            }
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                minWidth: "200px",
                borderRadius: "10px",
                margin: "auto",
                padding: "2rem",
                gap: "1rem",
              }}
            >
              <Typography variant="h3" sx={{ color: "grey" }}>
                Login
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                {...formik.getFieldProps("email")}
              />

              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}

              <FormControl
                fullWidth
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
              >
                <InputLabel htmlFor="outlined-adornment-password-register">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-register"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  name="password"
                  label="Password"
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  inputProps={{}}
                />

                {formik.touched.password && formik.errors.password ? (
                  <div className="error-message">{formik.errors.password}</div>
                ) : null}
              </FormControl>

              <Button variant="contained" type="submit" disabled={loading}>
                Login
              </Button>
              <Link to="/register">Don&apos;t have an account?</Link>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
