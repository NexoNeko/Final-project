/**
 * Maybe mutate bias on every 2-3 dislikes to ensure we get some learning going.
 * The network itself will learn as the user likes or dislikes certain things.
 */

//This handles the visualization of the NN
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=600;
const networkCtx = networkCanvas.getContext("2d");
//Returns a random value between -1 and 1 for testing purposes.
const getRandomValue = () => Math.floor(Math.random() * 3) - 1;


/**
 * This creates a new user with a brain
 * This is one of the important parts hence
 * why it is marked down like this
 */
const user = new User();

/**
 * The animate function, takes user.brain as a parameter to animate whatever is going on 
 * This function is only needed for the visualizer to work. 
 */
function animate(time)
{
	networkCanvas.height=window.innerHeight;
	networkCtx.lineDashOffset=-time/50;
	Visualizer.drawNetwork(networkCtx, user.brain);
	requestAnimationFrame(animate);
}
//calls for animate, this animates the NN in the canvas
animate();

/** 
 **********************************************************
 * Important functions begin here
 * These are the ones you're gonna use for function calls.
 **********************************************************
 */
 
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
 * getOutputs - Evaluates action of the user to recommend new profiles to display.
 *
 * Input: Array[249] of numbers (-1, 0 or 1).
 * Output: Array[249] of numbers (0 or 1).
 *
 * Description: This will send the user action to the neural network for evaluation.
 * depending on the action taken by the user:
 * -1: Unliked tags
 *  0: Neutral tags
 *  1: Liked tags
 * The neural network will return a list of tags that it thinks the user might like
 * based on randomized correlations.
 */
function getOutputs(tags, user = user)
{
	/**Divide every value by 10 to get decimals*/
	//tags = tags.map(value => value / 10);
	/**send the tags as well as the neural network*/
	//console.log('Sent tags: ' + tags);
	const outputs=NeuralNetwork.feedForward(tags,user.brain);
	/**outputs[0] to outputs[249] contains the tags*/
	//console.log('output: ' + outputs);
}

/**
 * mutate - Mutates user brain on function call
 *
 * Input: user Object
 *
 * Description: Might only mutate weights if neuron mutation is commented outerHeight
 * in network.js
 */
function mutate(user = user){
	user.mutateBrain();
	getOutputs(defaultTags, user);
}

/**
 * arraysToDictionary - Transforms two arrays into a single dictionary.
 *
 * Input: Array1[249] of user tags, Array2[249] of NN output (0s and 1s) 
 * Output: Dictionary{Array1 = true/false}
 *
 * Description: This is to be used with the NN output b4 sending to API.
 */
function arraysToDictionary(array1, array2) {
  if (array1.length !== array2.length) {
    throw new Error('Array lengths must be equal');
  }
  
  let dictionary = {};
  for (i = 0; i < array1.length; i++) {
    let value = array2[i] === 1 ? true : false;
    dictionary[array1[i]] = value;
  }
  
  return dictionary;
}


