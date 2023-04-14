import { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card
} from "@material-tailwind/react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-javascript";
import CodeEditor from "./CodeEditor";

export default function CodeTabs() {
  const codeSample = 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n[\n  {\n    "id": 1,\n    "user_id": 1,\n    "payment_method_id": 1,\n    "transaction_status": "successful",\n    "transaction_amount": "100.0",\n    "transaction_id": "1234567890",\n    "transaction_timestamp": "2022-01-01T12:00:00Z",\n    "created_at": "2022-01-01T12:00:00Z",\n    "updated_at": "2022-01-01T12:00:00Z"\n  },\n  {\n    "id": 2,\n    "user_id": 2,\n    "payment_method_id": 2,\n    "transaction_status": "failed",\n    "transaction_amount": "50.0",\n    "transaction_id": "0987654321",\n    "transaction_timestamp": "2022-01-02T12:00:00Z",\n    "created_at": "2022-01-02T12:00:00Z",\n    "updated_at": "2022-01-02T12:00:00Z"\n  }\n]';

  const data = [
    {
      label: "Python",
      value: "Python",
      code: "import requests\n\nresponse = requests.get('http://your-api-domain.com/api/v1/transactions?api_key=my-api-key')\nprint(response.json())",
    },
    {
      label: "Ruby",
      value: "Ruby",
      code: "require 'net/http'\nrequire 'json'\n\nuri = URI('http://your-api-domain.com/api/v1/transactions?api_key=my-api-key')\nresponse = Net::HTTP.get(uri)\nputs JSON.parse(response)",
    },
    {
      label: "Node",
      value: "Node",
      code: "const https = require('https')\n\nhttps.get('http://your-api-domain.com/api/v1/transactions?api_key=my-api-key, (res) => {\n  let data = ''\n  res.on('data', (chunk) => {\n    data += chunk\n  })\n  res.on('end', () => {\n    console.log(JSON.parse(data))\n  })\n})",
    },
    {
      label: "PHP",
      value: "PHP",
      code: "<?php\n\n$url = 'http://your-api-domain.com/api/v1/transactions';\n$data = file_get_contents($url);\n$transactions = json_decode($data);\n\nprint_r($transactions);",
    },
    {
      label: "Java",
      value: "Java",
      code: "import java.net.*;\nimport java.io.*;\nimport com.google.gson.Gson;\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    URL url = new URL(\"http://your-api-domain.com/api/v1/transactions?api_key=my-api-key\");\n    HttpURLConnection con = (HttpURLConnection) url.openConnection();\n    con.setRequestMethod(\"GET\");\n\n    BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));\n    String inputLine;\n    StringBuffer content = new StringBuffer();\n    while ((inputLine = in.readLine()) != null) {\n        content.append(inputLine);\n    }\n    in.close();\n\n    Gson gson = new Gson();\n    Object[] transactions = gson.fromJson(content.toString(), Object[].class);\n    System.out.println(transactions);\n  }\n}",
    },
  ];  

  return (
    <div className="flex flex-col">
        <Tabs value="Python" className="w-full">
        <h3 className='font-bold py-3'>Example Request</h3>
            <TabsHeader
                className="bg-transparent"
                indicatorProps={{
                    className: "bg-blue-500/10 shadow-none text-blue-500",
                }}
            >
                {data.map(({ label, value }) => (
                <Tab key={value} value={value}>
                    {label}
                </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value, code }) => (
                <TabPanel key={value} value={value}>
                    <CodeEditor code={code}  />
                </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
        <div className="max-w-[40rem]">
            <h2 className='font-bold py-3'>Example Response</h2>
            <Card style={{ padding: "1.5rem" }} className='bg-white'>
                <AceEditor
                    mode="javascript"
                    theme="github"
                    readOnly={true}
                    value={codeSample}
                    height="400px"
                    width="100%"
                    showGutter={false}
                    showPrintMargin={false}
                    editorProps={{ $blockScrolling: true }}
                />
            </Card>
        </div>

    </div>
  );
}
