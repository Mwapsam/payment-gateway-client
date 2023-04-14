import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { AppDispatch } from "../../store/store";
import { loginUser } from "../../services/users.service";

interface User {
  phone_number: string;
  password: string;
}

const user: User = {
  phone_number: '',
  password: ''
};

const Login = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const [state, setState] = useState(user);

    const onStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(state);

      const formData = new FormData();
      formData.append("phone_number", state.phone_number);
      formData.append("password", state.password);
      
      dispatch(loginUser(formData)).
      then((response) => {
        if (response.type === 'user/login/fulfilled'){
          navigate('/dashboard');
        }
      }
      )
      setState(user);
      setOpen(false);
    }
   
    return (
      <React.Fragment>
        <Button onClick={handleOpen}>Login</Button>
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <form onSubmit={onSubmit}>
              <CardHeader
                variant="gradient"
                color="blue"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant="h3" color="white">
                  Login
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <Input label="Phone Number" name="phone_number" size="lg" value={state.phone_number} onChange={onStateChange} />
                <Input label="Password" name="password" size="lg" value={state.password} onChange={onStateChange} type="password" />
              </CardBody>
              <CardFooter className="pt-0">
                <Button variant="gradient" type="submit" fullWidth>
                  Login
                </Button>
                <Typography variant="small" className="mt-6 flex justify-center">
                  Agree to our terms & conditions
                  <Typography
                    as="a"
                    href="#signup"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                    onClick={handleOpen}
                  >
                    Register
                  </Typography>
                </Typography>
              </CardFooter>
            </form>
          </Card>
        </Dialog>
      </React.Fragment>
    );
}

export default Login