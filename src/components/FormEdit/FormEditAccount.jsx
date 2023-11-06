import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  FilledInput,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useMemo, useState } from "react";

const FormEditAccount = (props) => {
  const { userId, password } = props.data;
  // console.log(password);

  const memorizePassword = useMemo(() => password, password);

  const [showPassword, setPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState(false);
  const [errors, setErrors] = useState([]);

  const OnClickShowPassword = () => {
    setPassword(true);
  };
  const OnClickShowNewPassword = () => {
    setNewPassword(true);
  };
  const OnClickShowConfirmPassword = () => {
    setConfirmNewPassword(true);
  };

  const OnClickClosePassword = () => {
    setPassword(false);
  };
  const OnClickCloseNewPassword = () => {
    setNewPassword(false);
  };
  const OnClickCloseConfirmPassword = () => {
    setConfirmNewPassword(false);
  };

  // const putNewPassword = async () => {
  //   const token = localStorage.getItem("token");
  //   await axios.put(import.meta.env.VITE_REACT_APP_API_URL + `/User/UpdateUser/${userId}`, con);
  // };

  return (
    <Container
      maxWidth="sm"
      sx={{
        border: "2px solid #322F2F",
        borderRadius: 5,
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h4">Account Setting</Typography>
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            {password == null ? (
              <></>
            ) : (
              <>
                <InputLabel htmlFor="filled-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  sx={{ width: "60%" }}
                  id="filled-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={OnClickShowPassword}
                        onMouseDown={OnClickClosePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </>
            )}
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <InputLabel htmlFor="filled-adornment-newPassword">
              New Password
            </InputLabel>
            <OutlinedInput
              sx={{ width: "60%" }}
              id="filled-adornment-newPassword"
              type={newPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle newPassword visibility"
                    onClick={OnClickShowNewPassword}
                    onMouseDown={OnClickCloseNewPassword}
                    edge="end"
                  >
                    {newPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <InputLabel htmlFor="filled-adornment-new-confirm-password">
              Confirm New Password
            </InputLabel>
            <OutlinedInput
              sx={{ width: "60%" }}
              id="filled-adornment-new-confirm-password"
              type={confirmNewPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={OnClickShowConfirmPassword}
                    onMouseDown={OnClickCloseConfirmPassword}
                    edge="end"
                  >
                    {confirmNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Stack>
          <Button
            type="submit"
            variant="outlined"
            sx={{ width: "20%", placeSelf: "end" }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default FormEditAccount;
