import { BaseStart, BaseUpdate, ShipStart, ShipUpdate } from './ai-controls'
import { customCompleter } from './completions.js'
import * as ace from 'ace-builds'
import langTools from 'ace-builds/src-min-noconflict/ext-language_tools'
import * as theme from 'ace-builds/src-min-noconflict/theme-tomorrow_night_eighties'
import * as javascript from 'ace-builds/src-min-noconflict/mode-javascript'


var oldSessionValue = "ShipUpdateCode"
var editor

export const SetupEditor = () => {

    editor = ace.edit("editor")
    document.getElementById("select-script").addEventListener("change", selectScript)
    langTools.addCompleter(customCompleter)
    editor.setTheme("ace/theme/tomorrow_night_eighties")
    editor.session.setValue(sessions[oldSessionValue])

    setEditorOptions(editor)
}

function setEditorOptions(editor){
    editor.session.setMode("ace/mode/javascript")
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        fontSize: '12pt'
    });
}

// Sessions are saved when users switch between tabs
function selectScript(event) {
    const session = event.target.value
    var code = editor.getSession().getValue()
    sessions[oldSessionValue] = ace.createEditSession(code)
    oldSessionValue = session
    
    if (typeof sessions[session] == 'string')
        editor.session.setValue(sessions[session])
    else
        editor.setSession(sessions[session])

    setEditorOptions(editor)
}

// Get object containing code from all editor sections
export var getCodeFromEditor = function(){
    sessions[oldSessionValue] = editor.getSession().getValue()

    var sessionCode = {}

    // if a session is uninitialized, it will be a string
    Object.keys(sessions).forEach(function(key, index) {
        const value = sessions[key]
        if (typeof value === "string")
        {
            sessionCode[key] = value
            localStorage.setItem(key,value || " ") // if value is null, undefined, or '', replace it with a single space string
        }
        else
        {
            sessionCode[key] = value.getValue();
            localStorage.setItem(key,value.getValue() || " ")
        }
      });

    return sessionCode
}

// Load the previous session from storage, or load the default code
var sessions = {
    'BaseStartCode' : localStorage.getItem("BaseStartCode") || BaseStart,
    'BaseUpdateCode' : localStorage.getItem("BaseUpdateCode") || BaseUpdate,
    'ShipStartCode' : localStorage.getItem("ShipStartCode") || ShipStart,
    'ShipUpdateCode' : localStorage.getItem("ShipUpdateCode") || ShipUpdate,
}