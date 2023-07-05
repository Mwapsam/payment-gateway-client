import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Select, Option
} from "@material-tailwind/react";
import { XMarkIcon, InformationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { createFee, getFees } from "../../services/fees.service";
import { getPaymentMethods } from "../../services/payments.service";
import { AppDispatch } from "../../store/store";
import { setShowSuccessMessage, setShowErrorMessage } from "../../reducers/fees";

interface Props {
  payments: Payment;
}

interface Payment {
  map(arg0: (payment: any) => JSX.Element): React.ReactNode;
  id: string;
  image: string;
  payment_method_name: string;
}

const AddFees: React.FC<Props> = ({payments}) => {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [fee, setFee] = useState<string>('0');
  const [paymentId, setPaymentId] = useState('')

  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: any = {
      fee_percentage: fee,
      payment_method_id: paymentId
    };
  
    dispatch(createFee(data))
      .unwrap()
      .then(() => {
        dispatch(getFees());
        dispatch(getPaymentMethods());
        dispatch(setShowSuccessMessage(true));
        setTimeout(() => {
          dispatch(setShowSuccessMessage(false));
      }, 6000)
      })
      .catch((error) => {
        // Handle error
        dispatch(setShowErrorMessage(true));
        setTimeout(() => {
          dispatch(setShowErrorMessage(false));
      }, 6000)
      });
  
    setFee('0');
    setPaymentId('');
    setTimeout(() => {
      closeDrawer();
    }, 2000);
  };

  return (
    <React.Fragment>
      <Button onClick={openDrawer}>Add Transaction Fees</Button>
      <Drawer placement="right" open={open} onClose={closeDrawer} className="bg-gray-100">
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Transaction 
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-6 p-4">
        <div>
        <Input label="Percentage fee" value={fee} onChange={(e) => setFee(e.target.value)} />
          <Typography variant="small" color="gray" className="flex  gap-1 font-normal mt-2">
            <InformationCircleIcon className="w-4 h-4" />
            Add a transaction fee in percentage to the payment method.
          </Typography>
        </div>
          <Select defaultValue={paymentId} onChange={(value) => value && setPaymentId(value)} label="Payment Method">
            {payments.map((payment) => (
              <Option  key={payment.id} value={payment.id}>{payment.payment_method_name}</Option>
            ))}
          </Select>
          <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal">
            <InformationCircleIcon className="w-4" />
            Please select the payment method.
          </Typography>
          <Button type="submit">Set Fee</Button>
        </form>
      </Drawer>
    </React.Fragment>
  )
}

export default AddFees