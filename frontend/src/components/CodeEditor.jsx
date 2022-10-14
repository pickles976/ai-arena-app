import React, { useEffect } from 'react';

// Import Brace and the AceEditor Component
import AceEditor from 'react-ace';
import ace from 'brace'

import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow_night_eighties';

import { customCompleter } from '../utilities/editor/completions';
import { useState } from 'react';

function CodeEditor (){

    let langTools = ace.require('ace/ext/language_tools');

    const [sessions, setSessions] = useState({
        'Base Start' : localStorage.getItem("Base Start") || '// Your code here',
        'Base Update' : localStorage.getItem("Base Update") || '// Your code here',
        'Ship Start' : localStorage.getItem("Ship Start") || '// Your code here',
        'Ship Update' : localStorage.getItem("Ship Update") || '// Your code here',
    })

    let currentCode = ""

    const onLoad = (newValue) => {
        console.log("Loaded")
    }

    const onChange = (newValue) => {
        console.log('change', newValue)
        currentCode = newValue
    }

    useEffect(() => {
        langTools.addCompleter(customCompleter)
    }, [])

    return (
        <div className='code-container'>
            <AceEditor
                mode="javascript"
                theme="tomorrow_night_eighties"
                onLoad={onLoad}
                onChange={onChange}
                name="editor"
                editorProps={{
                    $blockScrolling: true,
                    position: 'relative',
                }}
                fontSize='12pt'
                enableSnippets={true}
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                width='100%'
                height='89.5vh'
                // showGutter={false}
                
            />
        </div>
    );

}

export default CodeEditor