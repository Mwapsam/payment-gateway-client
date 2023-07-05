import React, { ReactNode, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Button } from "@material-tailwind/react";

interface MessageCardProps {
  name: string;
  api_key: string;
  action?: ReactNode;
  showApiKeys: boolean;
}

function MessageCard({ name, action, api_key, showApiKeys }: MessageCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const getApiKeyDisplay = () => {
    if (showApiKeys) {
      return "api_key: " + api_key;
    } else {
      return "*".repeat(api_key.length);
    }
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(api_key);
    setIsCopied(true);
  
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };  

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-semibold"
          >
            {name}
          </Typography>
          <div className="flex items-center gap-2">
            <p className='text-gray-500'>{getApiKeyDisplay()}</p>
            {showApiKeys && (
              <Button
                variant="outlined"
                color="blue"
                size="sm"
                onClick={handleCopyApiKey}
              >
                {isCopied ? "Copied" : "Copy"}
              </Button>
            )}
          </div>
        </div>
      </div>
      {action}
    </div>
  );
}

MessageCard.defaultProps = {
  action: null,
};

MessageCard.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.node,
};

MessageCard.displayName = "MessageCard";

export default MessageCard;
