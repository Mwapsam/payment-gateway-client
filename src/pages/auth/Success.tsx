import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function Success() {
  return (
    <div className="relative flex justify-center items-center">
      <Card className="w-96 lg:w-[45rem] top-10">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Registration Successful!
          </Typography>
          <Typography>
          Please check your inbox to activate your account. Kindly review your email for the activation link.
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}
