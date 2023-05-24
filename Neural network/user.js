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
			//Edit these numbers to change the amount of neurons to use
			this.brain=new NeuralNetwork([249,260,249]);
			this.mutateBrain();
		}
	}
	
	mutateBrain()
	{
		//Mutate neural network
		NeuralNetwork.mutate(this.brain,0.5);
	}

}