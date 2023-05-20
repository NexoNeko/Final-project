/**
 * This simple neural network will only use values between -1 and 1
 */
class NeuralNetwork{
	//neuronCounts will be the number of neurons in each layer.
	constructor(neuronCounts)
	{
		this.levels=[];
		for(let i=0; i<neuronCounts.length-1;i++)
		{
			//add a new Level
			this.levels.push(new Level(
				neuronCounts[i],neuronCounts[i+1]
				));
		}
	}
	//This method takes a neural network as an input
	static feedForward(givenInputs, network)
	{
		// get outputs by calling level feedForwards with the given inputs and networks first level
		// this is calling the first level to produce its outputs.
		let outputs=Level.feedForward(givenInputs,network.levels[0]);
		//we're putting the ouput of the previous level on the next
		//level as an input here and repeating until all levels are cleared.
		for(let i=1;i<network.levels.length;i++)
		{
			outputs=Level.feedForward(outputs,network.levels[i]);
		}
		//This is whats gonna tell us what tags should we recommend
		return outputs;
	}
	static mutate(network,amount=1)
	{
			network.levels.forEach(level => {
				for(let i=0;i<level.biases.length;i++)
				{
					level.biases[i]=lerp(
						level.biases[i],
						Math.random()*2-1,
						amount
					)
				}
				//for(let i=0;i<level.weights.length;i++)
				//{
				//	for(let j=0;j<level.weights[i].length;j++)
				//	{
				//		level.weights[i][j]=lerp(
				//			level.weights[i][j],
				//			Math.random()*2-1,
				//			amount
				//		)
				//	}
				//}
			});
		}
	}

class Level
{
	constructor(inputCount,outputCount)
	{
		this.inputs=new Array(inputCount);
		this.outputs=new Array(outputCount);
		//The bias is a value above which the neuron will fire
		this.biases=new Array(outputCount);
		
		this.weights=[];
		for (let i=0;i<inputCount;i++)
		{
			//creates an array of size outputCount for every Node so that
			//every node on level 1 is connected to every node on level 2
			this.weights[i]=new Array(outputCount);
		}
		//we'll start with a random brain
		Level.#randomize(this);
	}
	
	static #randomize(Level)
	{
		//Let's go through every input of every Level
		for(let i=0;i<Level.inputs.length;i++)
		{
			//now through every output of every Level
			for(let j=0;j<Level.outputs.length;j++)
			{
				//set the weight to a random value between -1 and 1
				Level.weights[i][j]=(Math.random()*2)-1;
				//We're using negative values to aid decision making. A negative value
				//basically tells our subject 'don't do this if you need to do something'
			}
		}
		//for starters we are also randomizing the bias.
		for(let i=0;i<Level.biases.length;i++)
		{
			Level.biases[i]=(Math.random()*2)-1;
		}
	}
	
	//Get the output values using a feedForward algorithm
	static feedForward(givenInputs, Level)
	{
		//set the Level inputs to the given inputs
		for(let i=0;i<Level.inputs.length;i++)
		{
			Level.inputs[i]=givenInputs[i];
		}
		
		//Now get the outputs, we need to figure them out using some sort of sum
		//between the weight and the bias
		//Lets get the values first
		for(let i=0;i<Level.outputs.length;i++)
		{
			let sum=0;
			for(let j=0; j<Level.inputs.length;j++)
			{
				sum+=Level.inputs[j]*Level.weights[j][i];
			}
			//figure out if the value is greater than the bias
			if(sum>Level.biases[i])
			{
				//if the value is greater than the bias, fire this neuron
				Level.outputs[i]=1;
			}
			else
			{
				//otherwise don't.
				Level.outputs[i]=0;
			}
		}
		return Level.outputs;
	}
}

