<!-- https://github.com/pickles976/ai-arena-site -->

<h1>
	Documentation
</h1>
<div>

	<p>
		The user has total control over the memory that they create. Users can create their own functions and fields inside of gameobjects. 
		However any default fields/functions are read-only access. A player can read their team or uuid, but they cannot modify it.
	</p>

	<h2>Base</h2>

	<h3>Start</h3>

	<h3>Update</h3>

	<h2>Ship</h2>

	<h3>Start</h3>

	<h3>Update</h3>

	<h2>Game</h2>

	<h2>Graphics</h2>

	<p>
		The available default fields for Graphics are:

		["H", "W"]

		The available default functions for Graphics are:

		["drawText", "drawLine", "drawCircle", "drawCircleTransparent"]

		Example usage of Graphics object:

		let H = Graphics.H
		Graphics.drawCircle(new Vector2D(0,H),100,"#FFFF00")
	</p>


</div>