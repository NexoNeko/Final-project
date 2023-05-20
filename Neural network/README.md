#Neural network

This is a very simple neural network that returns values from -1 to 1.

Notes:
In the begining mutate the brain for every 2 dislikes, then start counting every like-spree the user engages with.
Every time the user dislikes more users than they have liked in this iteration, mutate the network and reset the like counter
to 2.
Every time the user likes another user, reset the dislike counter to 0.
Every time the user goes on a like-spree that supprases the current max likes, check for the max likes stored in the database
if the like spree suprases that of the database, save the brain to the database.
Otherwise, save the brain to local storage and keep going.

