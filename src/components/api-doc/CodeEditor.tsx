import React from 'react';
import AceEditor from "react-ace";
import { Card } from '@material-tailwind/react';
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-javascript";

type CodeEditorProps = {
  code: string;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ code }) => {

  return (
    <Card style={{ padding: "1.5rem" }} className='bg-white'>
        <AceEditor
            mode="javascript"
            theme="github"
            readOnly={true}
            value={code}
            height="200px"
            width="100%"
            showGutter={false}
            showPrintMargin={false}
            editorProps={{ $blockScrolling: true }}
        />
    </Card>
  );
};

export default CodeEditor;
