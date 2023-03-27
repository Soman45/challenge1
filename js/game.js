function game() {
	let playerScore = 0;
	let computerScore = 0;
	let moves = 0;


	// Function to
	function playGame(){
		const rockBtn = document.querySelector('.rock');
		const paperBtn = document.querySelector('.paper');
		const scissorBtn = document.querySelector('.scissor');
		const result = document.querySelector('.result');
		const playerOptions = [rockBtn,paperBtn,scissorBtn];
		const computerOptions = ['rock','paper','scissors']
		
		// Function to start playing game
		playerOptions.forEach(option => {
			option.addEventListener('click',function (){
				
				const movesLeft = document.querySelector('.movesleft');
				moves++;
				
				const choiceNumber = Math.floor(Math.random()*3);
				const computerChoice = computerOptions[choiceNumber];
				console.log(computerChoice)
				
				// Fungsi untuk menentukan pemenang
				winner(this.innerText,computerChoice)
				console.log(winner(this.innerText,computerChoice))
				
				if(moves == 1){
					gameOver(playerOptions,movesLeft);
				}

			})
		})
		
	}

	// Function to decide winner
	function winner (player,computer) {
		const result = document.querySelector('.result');
		const reloadBtn = document.querySelector('.reload');
		player = player.toLowerCase();
        computer = computer.toLowerCase();
		// if(player === computer){
		// 	result.textContent = 'Tie'
		// }
		 if(player == 'rock'){
			if(computer == 'paper'){
				computerScore++;
				console.log('Computer Menang')
			}else if( computer == 'scissors'){
				playerScore++;
				console.log('Player Menang')
			}else {
				result.style.fontSize = '2rem';
				result.innerText = 'Seri';
				result.style.color = 'grey'
        	    console.log("Seri")
			}
		}
		else if(player == 'scissors'){
			if(computer == 'rock'){
				computerScore++;
				console.log('Computer Menang')
			}else if(computer == 'paper'){
				playerScore++;
				console.log('Player Menang')
			}else {
				result.style.fontSize = '2rem';
				result.innerText = 'Seri';
				result.style.color = 'grey'
        	    console.log("Seri")
			}
		}
		else if(player == 'paper'){
			if(computer == 'scissors'){
				computerScore++;
				console.log('Computer Menang')
			}else if(computer=='rock'){
				playerScore++;
				console.log('Player Menang')
			}else{
				result.style.fontSize = '2rem';
				result.innerText = 'Seri';
				result.style.color = 'grey'
        	    console.log("Seri")
			}
		}
		// reloadBtn.innerText = 'Restart';
		// reloadBtn.style.display = 'flex'
		// reloadBtn.addEventListener('click',function() {
		// 	window.location.reload();
		// })
	}	

	function gameOver() {
		const result = document.querySelector('.result');
		const reloadBtn = document.querySelector('.reload');


		if(playerScore > computerScore){
			result.style.fontSize = '2rem';
			result.innerText = 'Player Menang'
			result.style.color = '#308D46';
			console.log('Player Menang')
		}
		else if(playerScore < computerScore){
			result.style.fontSize = '2rem';
			result.innerText = 'Player Kalah';
			result.style.color = 'red';
			console.log('Computer Menang')
		}
		else{
			result.style.fontSize = '2rem';
			result.innerText = 'Seri';
			result.style.color = 'grey';
			console.log('Seri')
		}
		reloadBtn.innerText = 'Restart';
		reloadBtn.style.display = 'flex'
		reloadBtn.addEventListener('click',() => {
			window.location.reload();
		})
	}
	// Calling playGame function inside game
	playGame();
	
}

// Calling the game function
game();
