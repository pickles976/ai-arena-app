<script>
  import { initEditor, resizeEditor } from "../editor";
  import EditorPanel from "./EditorPanel.svelte";


	function move(element) {
		
		return {
			destroy() {
			}
		}
	}
	
	function resize(element) {
		
        const top = document.getElementById('top')
		// const top = document.createElement('div')
		top.direction = 'north'
		// top.classList.add('grabber')
		// top.classList.add('top')
				
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
			
			console.log({rect, parent})
			
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
</script>

<main class:hide-grabber={!grabber}>
    <div id='top' class="grabber top"/>
	<div class="box" use:move use:resize>
        <div>STUFF HEREs</div>
        <div class="codeContainer">
            <div id="editor"></div>
        </div>
	</div>
</main>

<style>
	.box {
        bottom: 0px;
		height: 15%;
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
	
	:global(.grabber.right) {
		width: 10px;
		height: 100%;
		background: red;
		right: -5px;
		cursor: col-resize;
	}
	
	:global(.grabber.left) {
		width: 10px;
		height: 100%;
		background: blue;
		left: -5px;
		cursor: col-resize;
	}
	
	:global(.grabber.top) {
		height: 4vh;
		width: 100%;
		background: green;
		top: -4vh;
		cursor: row-resize;
	}
	
	:global(.grabber.bottom) {
		height: 10px;
		width: 100%;
		background: orange;
		bottom: -5px;
		cursor: row-resize;
	}
	
	:global(.grabber.top-left) {
		height: 20px;
		width: 20px;
		background: orange;
		top: -10px;
		left: -10px;
		cursor: nw-resize;
		border-radius: 100%;
	}
	
	:global(.grabber.top-right) {
		height: 20px;
		width: 20px;
		background: orange;
		top: -10px;
		right: -10px;
		cursor: ne-resize;
		border-radius: 100%;
	}
	
	:global(.grabber.bottom-left) {
		height: 20px;
		width: 20px;
		background: green;
		bottom: -10px;
		left: -10px;
		cursor: sw-resize;
		border-radius: 100%;
	}
	
	:global(.grabber.bottom-right) {
		height: 20px;
		width: 20px;
		background: green;
		bottom: -10px;
		right: -10px;
		cursor: se-resize;
		border-radius: 100%;
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