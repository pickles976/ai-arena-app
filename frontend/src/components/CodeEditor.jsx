import React, { useEffect } from 'react';

// Import Brace and the AceEditor Component
import AceEditor from 'react-ace';
import ace from 'brace'

import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow_night_eighties';

import { customCompleter } from '../utilities/editor/completions';

let currentCode = '';
let currentSession = '';

const CodeEditor = React.memo((props) => {

    let langTools = ace.require('ace/ext/language_tools');

    const onLoad = (newValue) => {
        console.log("Loaded")
    }

    const onChange = (newValue) => {
        console.log('change', newValue)
        currentCode = newValue
    }

    // load in initial values
    useEffect(() => {
        langTools.addCompleter(customCompleter)
        currentCode = props.code
        currentSession = props.session
    }, [])

    // update sessions
    useEffect(() => {
        props.callback(currentSession, currentCode)
        currentSession = props.session
        currentCode = props.code
    }, [props.session])

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
                value={currentCode}
            />
        </div>
    );

})

export default CodeEditor