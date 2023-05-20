//This handles the visualization of the NN
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=600;
const networkCtx = networkCanvas.getContext("2d");

/**
 * This creates a new user with a brain
 * This is one of the important parts hence
 * why it is marked down like this
 */
const user = new User();

//calls for animate, this animates the NN in the canvas
animate();
//The animate function, takes user.brain as a parameter to animate whatever is going on
function animate(time)
{
	networkCanvas.height=window.innerHeight;
	networkCtx.lineDashOffset=-time/50;
	Visualizer.drawNetwork(networkCtx, user.brain);
	requestAnimationFrame(animate);
}

//Save brain to localStorage
function localStorage_save()
{
	localStorage.setItem("userBrain",
		JSON.stringify(user.brain));
}

//Delete brain from localstorage
function localStorage_discard()
{
	localStorage.removeItem("userBrain");
}

/*
 * Accepts an array of -1, 0 and 1 for each tag and returns a new array with -1, 0 and 1
 * -1: Unliked tags
 *  0: Neutral tags
 *  1: Liked tags
 */
function getOutputs(tags, user = user)
{
	//send the tags as well as the neural network
	const outputs=NeuralNetwork.feedForward(tags,user.brain);
	//outputs[0] to outputs[249] contains the tags
	console.log(outputs);
}