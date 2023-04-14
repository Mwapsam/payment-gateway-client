import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Alert,
} from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { AppDispatch, RootState } from "../../store/store";
import { postUser } from "../../services/users.service";

interface User {
  name: string;
  email: string;
  phone_number: string;
  password: string;
}

const user: User = {
  name: '',
  email: '',
  phone_number: '',
  password: ''
};

const Register = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const [state, setState] = useState(user);

    const onStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(state);

      const formData = new FormData();
      formData.append("name", state.name);
      formData.append("email", state.email);
      formData.append("phone_number", state.phone_number);
      formData.append("password", state.password);
      
      dispatch(postUser(formData));
      setState(user);
      setOpen(false);
    }

    return (
      <React.Fragment>
        <Button onClick={handleOpen}>Register</Button>
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
                  Register
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <Input label="Name" name="name" size="lg" value={state.name} onChange={onStateChange} />
                <Input label="Email" name="email" size="lg" value={state.email} onChange={onStateChange} />
                <Input label="Phone Number" name="phone_number" size="lg" value={state.phone_number} onChange={onStateChange} />
                <Input label="Password" name="password" size="lg" value={state.password} onChange={onStateChange} type="password" />
              </CardBody>
              <CardFooter className="pt-0">
                <Button variant="gradient" type="submit" fullWidth>
                  Register
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

export default Register;
