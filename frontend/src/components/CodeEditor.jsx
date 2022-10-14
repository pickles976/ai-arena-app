import React, { useEffect } from 'react';

// Import Brace and the AceEditor Component
import AceEditor from 'react-ace';
import ace from 'brace'

import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow_night_eighties';

import { customCompleter } from '../utilities/editor/completions';
import { SetupEditor } from '../utilities/editor/editor';

function CodeEditor (){

    let langTools = ace.acequire('ace/ext/language_tools');

    const onLoad = (newValue) => {

    }

    const onChange = (newValue) => {
        console.log('change', newValue);
    }

    useEffect(() => {
        langTools.addCompleter(customCompleter);
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