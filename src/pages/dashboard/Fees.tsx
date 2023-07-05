import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFees } from '../../services/fees.service';
import { getPaymentMethods } from '../../services/payments.service';
import { AppDispatch, RootState } from '../../store/store';
import { Typography, Alert, Button } from '@material-tailwind/react';
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { FeesCard, AddFees } from '../../components';

const Fees = () => {
  const { fees, showSuccessMessage, showErrorMessage } = useSelector((state: RootState) => state.fees);
  const { payments }: any = useSelector((state: RootState) => state.payments);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFees());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getPaymentMethods());
  }, [dispatch]);
  
  return (
    <>
      {showSuccessMessage && (
        <Alert
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          className="bg-[#2ec946]/10 text-[#2ec946] border-l-4 border-[#2ec946] rounded-none font-medium"
        >
          Transaction fee was updated or added to the payment method!
        </Alert>
      )}
      {showErrorMessage && (
        <Alert
          variant="gradient"
          color="red"
          icon={<ExclamationTriangleIcon className="h-6 w-6" />}
        >
          Sorry, something went wrong please try again.
        </Alert>
      )}
      <div className='bg-gray-100 p-5 shadow rounded-lg'>
        <AddFees payments={payments} />
        <div className="my-12  grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {payments.map((payment: { id: Key | null | undefined; payment_method_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; image: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; fee_structure: any; }) => {
            const fee = fees.find((f) => f.payment_method_id === payment.id);
            return (
            <FeesCard
              key={payment.id}
              fee={fee}
              title={payment.payment_method_name}
              icon={payment.image}
              footer={
                <footer>
                  <Typography className="font-normal text-blue-gray-600">
                    <strong className="text-green-500">{fee ? fee.fee_percentage : 0}</strong>
                    &nbsp;{payment.fee_structure}
                  </Typography>
                </footer>
              }
            />
          )})}
        </div>
      </div>
    </>
  )
}

export default Fees;