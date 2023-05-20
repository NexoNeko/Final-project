/**
 * Maybe mutate bias on every 2-3 dislikes to ensure we get some learning going.
 * The network itself will learn as the user likes or dislikes certain things.
 */

//This handles the visualization of the NN
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=600;
const networkCtx = networkCanvas.getContext("2d");

const getRandomValue = () => Math.floor(Math.random() * 3) - 1;
let defaultTags = [-1, 0, 1, -1, 1, 0, -1, 0, 0, 1];

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

let tags = defaultTags;
/*
 * Accepts an array of -1, 0 and 1 for each tag and returns a new array with -1, 0 and 1
 * -1: Unliked tags
 *  0: Neutral tags
 *  1: Liked tags
 */
function getOutputs(tags, user = user)
{
	//Divide every value by 10 to get decimals
	//tags = tags.map(value => value / 10);
	//send the tags as well as the neural network
	console.log('Sent tags: ' + tags);
	const outputs=NeuralNetwork.feedForward(tags,user.brain);
	//outputs[0] to outputs[249] contains the tags
	console.log('output: ' + outputs);
}

function mutate(user){
	user.mutateBrain();
	getOutputs(defaultTags, user);
}

function randTags()
{
	defaultTags = Array.from({ length: 10 }, getRandomValue);
	console.log('new tags: ' + defaultTags);
	tags = defaultTags;
	return defaultTags;
}