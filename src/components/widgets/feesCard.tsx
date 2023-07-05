import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

interface StatisticsCardProps {
  color?: string;
  icon: ReactNode;
  title: ReactNode;
  footer?: ReactNode;
  fee: ReactNode;
}

const FeesCard: React.FC<StatisticsCardProps> = ({
    fee,
    icon,
    title,
    footer,
  }) => {
    
  return (
    <>
      <Card className="border border-gray-100">
        <CardHeader
          variant="gradient"
          color="white"
          className="absolute -mt-4 grid h-16 w-16 place-items-center border border-gray-200"
        >
          <img
            src={icon ? `http://localhost:3000/${icon.toString()}` : undefined}
            alt={title ? title.toString() : undefined}
            className="h-8 w-10"
          />
        </CardHeader>
        <CardBody className="p-4 text-right">
          <Typography variant="small" className="font-normal text-blue-gray-600">
            {title}
          </Typography>
        </CardBody>
        {footer && (
          <CardFooter className="border-t border-blue-gray-50 p-4">
            {fee && typeof fee === 'object' && 'fee_percentage' in fee ? (fee.fee_percentage as React.ReactNode) : null}% <span className="text-sm font-thin">per transaction</span>
          </CardFooter>
        )}
      </Card>
    </>
  )
}

FeesCard.propTypes = {
    color: PropTypes.oneOf([
      "white",
      "blue-gray",
      "gray",
      "brown",
      "deep-orange",
      "orange",
      "amber",
      "yellow",
      "lime",
      "light-green",
      "green",
      "teal",
      "cyan",
      "light-blue",
      "blue",
      "indigo",
      "deep-purple",
      "purple",
      "pink",
      "red",
    ]),
    icon: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
    footer: PropTypes.node,
  };

FeesCard.defaultProps = {
    color: "blue",
    footer: null,
};

FeesCard.displayName = "/src/widgets/cards/fees-card.tsx";
  
export default FeesCard;