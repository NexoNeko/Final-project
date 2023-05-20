class User
{
	constructor()
	{
		//Attempt to get a brain if it exists, otherwise create a new brain
		if(localStorage.getItem("userBrain"))
		{
			this.brain=JSON.parse(
				localStorage.getItem("userBrain")
			);
		}
		else
		{
			this.brain=new NeuralNetwork([10,15,10]);
			this.mutateBrain();
		}
	}
	
	mutateBrain()
	{
		//Mutate neural network
		NeuralNetwork.mutate(this.brain,0.1);
	}

}