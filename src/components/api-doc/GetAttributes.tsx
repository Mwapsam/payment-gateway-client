import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
  } from "@material-tailwind/react";

type Props = {}

const authorsTableData = [
    {
      attribute: "user_id",
      datatype: "UUID",
      description: "The unique identifier for the user who initiated the transaction",
    },
    {
        attribute: "payment_method_id",
        datatype: "UUID",
        description: "The unique identifier for the payment method used for the transaction",
      },
      {
        attribute: "transaction_status",
        datatype: "string",
        description: "The current status of the transaction (e.g. 'successful', 'failed', 'pending')",
      },
      {
        attribute: "transaction_amount",
        datatype: "decimal",
        description: "The amount of the transaction, in a decimal format (e.g. '100.0')",
      },
      {
        attribute: "transaction_amount",
        datatype: "decimal",
        description: "The amount of the transaction, in a decimal format (e.g. '100.0')",
      },
      {
        attribute: "transaction_id",
        datatype: "string",
        description: "A unique identifier for the transaction, used for reference and tracking purposes",
      },
      {
        attribute: "transaction_timestamp",
        datatype: "datetime",
        description: "The date and time when the transaction was initiated, in ISO 8601 format",
      },
  ];

const GetAttributes = (props: Props) => {
  return (
    <>
        <Card className="mt-12">
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[540px] table-auto">
            <thead>
              <tr>
                {["Attributes", "Datatype", "Description"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(
                ({ attribute, datatype, description }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={attribute}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {attribute}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {datatype}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {description}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  )
}

export default GetAttributes;