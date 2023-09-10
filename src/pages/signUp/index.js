import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../containers/store";
import { Box } from "@mui/material";
import { signUpApi } from "../../api/Auth";

const SignUp = () => {
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const history = useHistory();

  const [authData, setAuthData] = React.useState({
    username: {
      value: "",
      isError: false,
      errMessage: "Tên đăng nhập cần ít nhất 1 ký tự",
    },
    password: {
      value: "",
      isError: false,
      errMessage: "Mật khẩu cần ít nhất 1 ký tự",
    },
    fullname: {
        value: "",
        isError: false,
        errMessage: "Họ tên cần ít nhất 1 ký tự",
    }
  });

  React.useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [isAuth, history]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("username");
    const password = data.get("password");
    const fullname = data.get("fullname");

    if (username !== "" && password !== "" && fullname !== "") {
        try{
            const response = await signUpApi({fullname, username,password})
            if(response.result === "ok"){
                alert("Success!")
                setAuthData({
                    username: {
                      value: "",
                      isError: false,
                      errMessage: "Tên đăng nhập cần ít nhất 1 ký tự",
                    },
                    password: {
                      value: "",
                      isError: false,
                      errMessage: "Mật khẩu cần ít nhất 1 ký tự",
                    },
                    fullname: {
                        value: "",
                        isError: false,
                        errMessage: "Họ tên cần ít nhất 1 ký tự",
                    }
                  })
                return;
            }
        }catch(error){
            if(error.response.data){
                alert(error.response.data.error)
                console.log(error)
                return;
            }
        }
    }
  };

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    const newAuthData = {
      ...authData,
      [name]: {
        ...authData[name],
        value: value,
      },
    };
    setAuthData(newAuthData);
  };

  const checkAuthDataValid = (event) => {
    const { name, value } = event.target;
    if (value === "") {
      const newAuthData = {
        ...authData,
        [name]: {
          ...authData[name],
          isError: true,
        },
      };
      setAuthData(newAuthData);
    }
  };

  const onFocusHandler = (event) => {
    const { name } = event.target;
    const newAuthData = {
      ...authData,
      [name]: {
        ...authData[name],
        isError: false,
      },
    };
    setAuthData(newAuthData);
  };

  return (
    <>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký - Tạo tài khoản
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Họ tên"
                name="fullname"
                autoComplete="fullname"
                onBlur={checkAuthDataValid}
                onFocus={onFocusHandler}
                value={authData.fullname.value}
                error={authData.fullname.isError}
                onChange={onChangeInputHandler}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Tên đăng nhập"
            name="username"
            autoComplete="username"
            onBlur={checkAuthDataValid}
            onFocus={onFocusHandler}
            value={authData.username.value}
            error={authData.username.isError}
            onChange={onChangeInputHandler}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            onFocus={onFocusHandler}
            onBlur={checkAuthDataValid}
            value={authData.password.value}
            error={authData.password.isError}
            onChange={onChangeInputHandler}
          />
          {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng Ký
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
