import React, { useEffect } from 'react';

// Import Brace and the AceEditor Component
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';

// Import a Mode (language)
import 'brace/mode/javascript';

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/tomorrow_night_eighties';
import { customCompleter } from '../utilities/editor/completions';

function CodeEditor (){

    // constructor(props, context) {
    //     super(props, context);
        
    //     this.onChange = this.onChange.bind(this);
    // }

    const onLoad = (newValue) => {

    }

    const onChange = (newValue) => {
        console.log('change', newValue);
    }

    useEffect(() => {

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