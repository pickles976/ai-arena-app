// import { BaseStart, BaseUpdate, ShipStart, ShipUpdate } from '../game/ai-controls.js'
// import { customCompleter } from './completions.js'


// // function setEditorOptions(editor){
// //     // editor.session.setMode("ace/mode/javascript");
// //     editor.setOptions({
// //         enableBasicAutocompletion: true,
// //         enableSnippets: true,
// //         enableLiveAutocompletion: true,
// //         fontSize: '12pt'
// //     });
// // }

// // Get object containing code from all editor sections
// export var getCodeFromEditor = function(){
//     sessions[oldSessionValue] = editor.getSession().getValue()

//     var sessionCode = {}

//     // if a session is uninitialized, it will be a string
//     Object.keys(sessions).forEach(function(key, index) {
//         const value = sessions[key]
//         if (typeof value === "string")
//         {
//             sessionCode[key] = value
//             localStorage.setItem(key,value || " ") // if value is null, undefined, or '', replace it with a single space string
//         }
//         else
//         {
//             sessionCode[key] = value.getValue();
//             localStorage.setItem(key,value.getValue() || " ")
//         }
//       });

//     return sessionCode
// }

// export const SetupEditor = () => {

//     // Sessions are saved when users switch between tabs
//     function selectScript(event) {
//         const session = event.target.value;
//         var code = editor.getSession().getValue();
//         sessions[oldSessionValue] = ace.createEditSession(code)
//         oldSessionValue = session
        
//         if (typeof sessions[session] == 'string')
//             editor.session.setValue(sessions[session])
//         else
//             editor.setSession(sessions[session])

//         // setEditorOptions(editor)
//     }
//     document.getElementById("select-script").addEventListener("change", selectScript)

//     // Load the previous session from storage, or load the default code
//     var sessions = {
//         'Base Start' : localStorage.getItem("Base Start") || BaseStart,
//         'Base Update' : localStorage.getItem("Base Update") || BaseUpdate,
//         'Ship Start' : localStorage.getItem("Ship Start") || ShipStart,
//         'Ship Update' : localStorage.getItem("Ship Update") || ShipUpdate,
//     }

//     var oldSessionValue = "Ship Update"

//     // var langTools = ace.require("ace/ext/language_tools");
//     // langTools.addCompleter(customCompleter);
//     // var editor = ace.edit("editor");
//     // editor.setTheme("ace/theme/tomorrow_night_eighties");
//     // editor.session.setValue(sessions[oldSessionValue])

//     // setEditorOptions(editor)

// }