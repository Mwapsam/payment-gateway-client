import {
    Card,
    CardBody,
    Typography,
    Alert,
  } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import Login from './Login';
import Register from './Register';
import { AppDispatch, RootState } from "../../store/store";

type Props = {}

const Aunthentication = (props: Props) => {
  const { loading, error } = useSelector((state: RootState) => state.users)

  return (
    <>
      {loading === 'pending' && ( 
        <div className="container mx-auto">
          <Alert
            // show={show}
            color="green"
            className="mx-auto"
            icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
            // dismissible={{
              // onClose: () => setShow(false),
            // }}
          >
            <Typography variant="h5" color="white">
              Success
            </Typography>
            <Typography color="white" className="mt-2 font-normal">
              I don&apos;t know what that word means. I&apos;m happy. But success,
              that goes back to what in somebody&apos;s eyes success means. For me,
              success is inner peace. That&apos;s a good day for me.
            </Typography>
          </Alert>
        </div>     

      )}
      <Card className="w-96 m-auto mt-20">
          <CardBody className="flex flex-col gap-4">
              <Login />
              <Register />
          </CardBody>
      </Card>
    </>
  )
}

export default Aunthentication