import { BaseStart, BaseUpdate, ShipStart, ShipUpdate } from './aiControls.js'
import { customCompleter } from './completions.js'

let editor, langTools, sessions
export let oldSessionValue

function setEditorOptions(editor){
    editor.session.setMode("ace/mode/javascript");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        fontSize: '10.5pt'
    });
    editor.setAutoScrollEditorIntoView(true);
}

export function resizeEditor() {
    editor.resize()
}

// Sessions are saved when users switch between tabs
export function selectScript(value) {
    const session = value;
    var code = editor.getSession().getValue();
    sessions[oldSessionValue] = ace.createEditSession(code)
    oldSessionValue = session
    
    if (typeof sessions[session] == 'string')
        editor.session.setValue(sessions[session])
    else
        editor.setSession(sessions[session])

    setEditorOptions(editor)
}

// Get object containing code from all editor sections
export function getCodeFromEditor(){

    sessions[oldSessionValue] = editor.getSession().getValue()

    var sessionCode = {}

    // if a session is uninitialized, it will be a string
    Object.keys(sessions).forEach(function(key, index) {
        const value = sessions[key]
        if (typeof value === "string")
        {
            sessionCode[key] = value || " "
        }
        else
        {
            sessionCode[key] = value.getValue() || " ";
        }
      });

    return sessionCode
}

export function initEditor(code) {

    sessions = {
        'baseStart' : code.baseStart || BaseStart,
        'baseUpdate' : code.baseUpdate || BaseUpdate,
        'shipStart' : code.shipStart || ShipStart,
        'shipUpdate' : code.shipUpdate || ShipUpdate,
    }

    oldSessionValue = "shipUpdate"

    langTools = ace.require("ace/ext/language_tools");
    langTools.addCompleter(customCompleter);
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow_night_eighties");
    editor.session.setValue(sessions[oldSessionValue])

    setEditorOptions(editor)
}