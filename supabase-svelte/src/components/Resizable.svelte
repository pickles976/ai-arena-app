<script>
  import EditorPanel from "./EditorPanel.svelte";
  import { code, defaultCode } from "../stores.js";
    import { deleteCode, getCode, getUserCode, submitCode } from '../features/code.js'
    import { auth } from "../stores.js";
    import {push, pop, replace} from 'svelte-spa-router'
    import {deleteCodeLocally, getAllLocalCode, storeCodeLocally } from  "../features/storage.js"
    import Modal,{getModal} from '../components/Modal.svelte'
    import { onMount } from "svelte";
    import { getCodeFromEditor, initEditor, oldSessionValue, resizeEditor, selectScript } from "../editor.js";

    /** Upsert user code on submission */
    function trySubmitCode() {

      if (!$auth.session) {
        // Force user to log in
        alert("Please log in")
        push('/login/')
        return
      }

      if ($code.name === "") {
        // Force user to enter a name for their code
        trySave()
        return
      }

      trySave()

      // Popup modal with submission status
      getModal('submission-status').open()

      // Upload code
      submitCode($code, $auth)
    }

    /** Fetch code from the local storage and the server */
    function tryFetchAllCode() {

      localCodeObjects = {}
      remoteCodeObjects = {}

      // Get code from db
      if ($auth.session) {
        getUserCode().then((data) => {
          data.forEach((entry) => {
            remoteCodeObjects[entry.name] = entry.code
            remoteCodeObjects[entry.name].id = entry.id // id needed for upsert
          })
        })
      }


      localCodeObjects = getAllLocalCode()
      getModal('load-code').open()
    }

    /** Try to load code into the editor*/
    function tryLoadLocalCode(name) {
      code.set(localCodeObjects[name])
      initEditor($code)
      getModal('load-code').close(1)
    }

    /** Try to load code into the editor*/
    function tryLoadRemoteCode(name) {
      code.set(remoteCodeObjects[name])
      initEditor($code)
      getModal('load-code').close(1)
    }

    function tryDeleteLocalCode(name) {
      deleteCodeLocally(name)
      tryFetchAllCode()
    }

    async function tryDeleteRemoteCode(id) {
      deleteCode(id).then(() => tryFetchAllCode())
    }

    /** Save code from the editor into local storage, update the code global object */
    function trySave() {

      // User must name code to save it
      if ($code.name === "") {
        getModal('save-as').open()
        return
      }

      // copy editor values into code object
      let editorCode = getCodeFromEditor()
      $code.baseStart = editorCode.baseStart
      $code.baseUpdate = editorCode.baseUpdate
      $code.shipStart = editorCode.shipStart
      $code.shipUpdate = editorCode.shipUpdate

      storeCodeLocally($code)
      getModal('save-as').close(1)

    }

    function tryNew() {
      // Warn user about data loss
      getModal('unsaved-warning').open()
    }

    let localCodeObjects = {}
    let remoteCodeObjects = {}

    // MOVE CODE 
	function move(element) {
		
		return {
			destroy() {
			}
		}
	}
	
	function resize(element) {
		
        const top = document.getElementById('top')
		top.direction = 'north'
				
		const grabbers = [top]
		
		let active = null, initialRect = null, initialPos = null
		
		grabbers.forEach(grabber => {
			element.appendChild(grabber)
			grabber.addEventListener('mousedown', onMousedown)
		})
		
		function onMousedown(event) {
			active = event.target
			const rect = element.getBoundingClientRect()
			const parent = element.parentElement.getBoundingClientRect()
			
			initialRect = {
				width: rect.width,
				height: rect.height,
				left: rect.left - parent.left,
				right: parent.right - rect.right,
				top: rect.top - parent.top,
				bottom: parent.bottom - rect.bottom
			}
			initialPos = { x: event.pageX, y: event.pageY }
			active.classList.add('selected')
		}
		
		function onMouseup(event) {
			if (!active) return
			
			active.classList.remove('selected')
			active = null
			initialRect = null
			initialPos = null
		}
		
		function onMove(event) {

			if (!active) return
			
			const direction = active.direction
			let delta
			
			if (direction.match('east')) {
				delta = event.pageX - initialPos.x
				element.style.width = `${initialRect.width + delta}px`				
			}
			
			if (direction.match('west')) {
				delta = initialPos.x - event.pageX
				element.style.left = `${initialRect.left - delta}px`
				element.style.width = `${initialRect.width + delta}px`
			}
			
			if (direction.match('north')) {
				delta = initialPos.y - event.pageY
				element.style.top = `${initialRect.top - delta}px`
				element.style.height = `${initialRect.height + delta}px`
			}
			
			if (direction.match('south')) {
				delta = event.pageY - initialPos.y
				element.style.height = `${initialRect.height + delta}px`
			}

            // resizeEditor()
		}
		
		window.addEventListener('mousemove', onMove)	
		window.addEventListener('mouseup', onMouseup)	
		
		return {
			destroy() {
				window.removeEventListener('mousemove', onMove)
				window.removeEventListener('mousemove', onMousedown)
				
				grabbers.forEach(grabber => {
					element.removeChild(grabber)
				})
			}
		}
	}

	let grabber = true

    onMount(() => {
      initEditor($code)
      resizeEditor()
    })
</script>

<main class:hide-grabber={!grabber}>
    
    <div id='top' class="grabber top"/>

    <div class="box" use:move use:resize>
        <EditorPanel />
    </div>

        <!-- <div class="codeContainer">
            <div id="editor"></div>
        </div>  -->

    <!-- EDITOR BOX -->
	<!-- <div class="box" use:move use:resize>

        <div class="vert-panel" style="height: 100%;">
        <div>
            First
        </div>

        <div class="codeContainer" style="flex-grow: 1;">
            <div id="editor"></div>
        </div>

        <div>
            Third
        </div>
        </div>
	</div> -->
</main>

<style>
	.box {
        bottom: 0px;
		height: 35%;
		width: 100vw;
		background: #e5e5e5;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		user-select: none;
	}
	
	:global(.grabber) {
		position: absolute;
		box-sizing: border-box; 
	}
	
	:global(.grabber.top) {
		height: 4vh;
		/* width: 100%; */
		background: green;
		top: 0vh;
        left: 13vw;
        right: 7vw;
		cursor: row-resize;
	}
	
	:global(.hide-grabber .grabber) {
		background: transparent !important;
		border: none !important;
	}
	
	:global(.grabber.selected) {
		border: solid 1px black;
	}
	
	header {
		text-align: center;
	}
	main {
		flex: 2;
		display: block;
		position: relative;
	}
	
	:global(body) {
		display: flex;
		flex-direction: column;
		justify-content: center;
        
	}
</style>