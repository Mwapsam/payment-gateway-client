import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { AppDispatch } from "../../store/store";
import { postUser } from "../../services/users.service";
import { User } from "../../types";

const user: User = {
  name: '',
  email: '',
  phone_number: '',
  password: ''
};

const Register = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [error, setError] = useState("")

    const [state, setState] = useState(user);

    const onStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      const userData: User = {
        name: state.name,
        email: state.email,
        phone_number: state.phone_number,
        password: state.password
      };
    
      dispatch(postUser(userData))
        .unwrap()
        .then(() => {
          setState(user);
          setOpen(false);
        })
        .catch(error => {
          const errorMessage = error as string;
          setError(errorMessage);
        });
    };    

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
              {error && <p className="text-red-600 text-center font-thin">{error}</p>}
              <CardFooter className="pt-0">
                <Button variant="gradient" type="submit" fullWidth>
                  Register
                </Button>
                <Typography variant="small" className="mt-6 text-center">
                  By signing up you agree to our terms & conditions
                </Typography>
              </CardFooter>
            </form>
          </Card>
        </Dialog>
      </React.Fragment>
    );
}

export default Register;
