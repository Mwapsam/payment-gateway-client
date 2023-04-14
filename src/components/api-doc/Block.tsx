import React from 'react';
import {
    Card,
    Typography,
  } from "@material-tailwind/react";

import CodeTabs from './CodeTabs';
import GetAttributes from './GetAttributes';

type Props = {}

const Block = (props: Props) => {
  return (
    <>
        <Card color="transparent">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-6">
                <Card shadow={false} color="transparent" className=''>
                    <h2 className='font-extrabold uppercase text-lg mb-3'>Introduction</h2>
                    <Typography>
                        This API is designed to handle transactions, including creating, updating, and deleting transactions, and retrieving transaction information. The API uses the <span className='font-bold'>`MomoApiHelper`</span> module, which provides functions to interact with the mobile money payment system.
                    </Typography>
                    <h3 className='font-bold py-3'>Authentication</h3>
                    <Typography>
                        Before accessing any API endpoints, you need to authenticate your project. The authentication process is handled by the `authenticate_project` method.
                    </Typography>

                    <h3 className='font-bold py-3'>API Endpoints</h3>
                    <Typography>
                        The following endpoints are available:
                    </Typography>
                    <h3 className='font-bold py-3'>`GET /api/v1/transactions`</h3>
                    <Typography>
                        Returns a list of all transactions.
                    </Typography>

                    <GetAttributes />
                </Card>
                <CodeTabs />
            </div>
        </Card>

    </>
  )
}

export default Block