function game() {
	let playerScore = 0;
	let computerScore = 0;
	let moves = 0;


	function playGame(){
		const rockBtn = document.querySelector('.rock');
		const paperBtn = document.querySelector('.paper');
		const scissorBtn = document.querySelector('.scissor');
		const playerOptions = [rockBtn,paperBtn,scissorBtn];
		const computerOptions = ['rock','paper','scissors']
		
		// Function untuk main Game
		playerOptions.forEach(function (option)  {
			option.addEventListener('click',function (){
				
				// const movesLeft = document.querySelector('.sisa');
				moves++;
				
				const choiceNumber = Math.floor(Math.random()*3);
				const computerChoice = computerOptions[choiceNumber];
				console.log(computerChoice)
				
				// Function untuk menentukan pemenang
				winner(this.innerText,computerChoice)
				console.log(winner(this.innerText,computerChoice))
				
				if(moves == 1){
					gameOver(playerOptions);
				}

			})
		})
		
	}

	function winner (player,computer) {
		const rockBtn = document.querySelector('.rock');
		const paperBtn = document.querySelector('.paper');
		const scissorBtn = document.querySelector('.scissor');
		const rockComBtn = document.querySelector('.rockcom');
		const paperComBtn = document.querySelector('.papercom');
		const scissorComBtn = document.querySelector('.scissorcom');
		const result = document.querySelector('.result');
		// player = player.toLowerCase();
        // computer = computer.toLowerCase();
		if(player === computer){
			result.textContent = 'Seri'
		}
		 if(player == 'rock'){
			rockBtn.style.color = "red";
			if(computer == 'paper'){
				paperComBtn.style.color = "red";
				computerScore++;
				console.log('Computer Menang')
			}else{
				playerScore++;
				console.log('Player Menang')
			}
		}
		else if(player == 'scissors'){
			scissorBtn.style.color = "red";
			if(computer == 'rock'){
				rockComBtn.style.color = "red";
				computerScore++;
				console.log('Computer Menang')
			}else{
				playerScore++;
				console.log('Player Menang')
			}
		}
		else if(player == 'paper'){
			paperBtn.style.color = "red";
			if(computer == 'scissors'){
				scissorComBtn.style.color = "red";
				computerScore++;
				console.log('Computer Menang')
			}else{
				playerScore++;
				console.log('Player Menang')
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
		reloadBtn.innerHTML = '<img src="/assets/refresh.png" alt="" style="width:20px; height:20px;">';
		reloadBtn.style.display = 'flex'
		reloadBtn.addEventListener('click',() => {
			window.location.reload();
		})
	}
	
	playGame();
	
}

game();
