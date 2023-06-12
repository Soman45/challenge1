function game() {
	function playGame() {
	  const moveButtons = document.querySelectorAll('.move-btn');
	  const result = document.querySelector('.result');
  
	//   const moves = ['rock', 'paper', 'scissors'];
	  const commoves = ['rockcom', 'papercom', 'scissorscom'];
  
	  moveButtons.forEach(function (button) {
		button.addEventListener('click', function () {
		  const playerMove = button.getAttribute('data-value');
		  const computerMove = getRandomMove();
  
		  displayMoves(playerMove, computerMove);
		  determineWinner(playerMove, computerMove);
		  gameOver();
		});
	  });
  
	  function getRandomMove() {
		const randomIndex = Math.floor(Math.random() * commoves.length);
		return commoves[randomIndex];
	  }
  
	  function displayMoves(playerMove, computerMove) {
		const playerMoveBtn = document.querySelector('.move-btn[data-value="' + playerMove + '"]');
   	 	const computerMoveBtn = document.querySelector('.computer-move-btn[data-value="' + computerMove + '"]');

    	playerMoveBtn.classList.add('selected');
    	computerMoveBtn.classList.add('selected-computer');
	  }
  
	  function determineWinner(playerMove, computerMove) {
		if (
			(playerMove === "rock" && computerMove === "rockcom") ||
			(playerMove === "paper" && computerMove === "papercom") ||
			(playerMove === "scissors" && computerMove === "scissorscom")
		  ) {
			result.textContent = "Seri";
		} else if (
		  (playerMove === 'rock' && computerMove === 'scissorscom') ||
		  (playerMove === 'paper' && computerMove === 'rockcom') ||
		  (playerMove === 'scissors' && computerMove === 'papercom')
		) {
		  result.textContent = 'Kamu Menang!';
		} else {
		  result.textContent = 'Computer Menang!';
		}
	  }

	}
  
	function gameOver() {
		const reloadBtn = document.querySelector('.reload');
		reloadBtn.innerHTML =
		  '<img src="/assets/refresh.png" alt="" style="width:20px; height:20px;">';
		reloadBtn.style.display = 'flex';
		reloadBtn.addEventListener('click', () => {
		  window.location.reload();
		});
	  }

	playGame();
  }
  
  game();
  