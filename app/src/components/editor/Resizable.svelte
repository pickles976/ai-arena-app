<script>
  import EditorPanel from "./EditorPanel.svelte";
  import { code } from "../../stores.js";
    import { onMount } from "svelte";
    import { initEditor, resizeEditor } from "../../editor.js";

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

            resizeEditor()
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
	let grabberHeight = '10%'

    onMount(() => {
      initEditor($code)
      resizeEditor()

	  // make sure that the grabber object is the same height as the panel
	  grabberHeight = document.getElementById('top-editor-panel').offsetHeight + 'px'
		console.log(grabberHeight)
    })
</script>

<div class:hide-grabber={!grabber} style="flex: 2; display: block; position: absolute; height: 35%; bottom: 0px;">
    
    <div id='top' class="grabber top" style='--grabberHeight:{grabberHeight};'/>

    <div class="box" use:move use:resize style="position: absolute;">
        <EditorPanel />
    </div>
</div>

<style>
	.box {
        bottom: 0px;
		height: 100%;
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
		/* height: 3.2vh; */
		height: var(--grabberHeight);
		/* width: 100%; */
		/* background: green; */
		background-color: transparent;
		top: 0vh;
        left: 0vw;
        right: 0vw;
		cursor: row-resize;
	}

	:global(.grabber.top:hover) {
		/* height: 3.2vh; */
		height: var(--grabberHeight);
		/* width: 100%; */
		background-color: #ffffff0f;
		top: 0vh;
        left: 0vw;
        right: 0vw;
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