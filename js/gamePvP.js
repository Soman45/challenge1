function game() {
    function playGame() {
      const moveButtons = document.querySelectorAll('.move-btn');
      const result = document.querySelector('.result');
      const playerName = ''; 
      let playerOneMove = '';
  
      moveButtons.forEach(function (button) {
        button.addEventListener('click', function () {
          if (!playerOneMove) {
            playerOneMove = button.getAttribute('data-value');
            displayMove(playerOneMove);
          } else {
            const playerTwoMove = button.getAttribute('data-value');
            displayMove(playerTwoMove);
            determineWinner(playerOneMove, playerTwoMove);
            gameOver();
          }
        });
      });
  
      function displayMove(move) {
        const moveBtn = document.querySelector('.move-btn[data-value="' + move + '"]');
        moveBtn.classList.add('selected');
      }
  
      function determineWinner(playerOneMove, playerTwoMove) {
        if (
          (playerOneMove === "rock" && playerTwoMove === "scissors") ||
          (playerOneMove === "paper" && playerTwoMove === "rock") ||
          (playerOneMove === "scissors" && playerTwoMove === "paper")
        ) {
          result.textContent = playerName + ' Menang!';
        } else if (
          (playerOneMove === 'rock' && playerTwoMove === 'paper') ||
          (playerOneMove === 'paper' && playerTwoMove === 'scissors') ||
          (playerOneMove === 'scissors' && playerTwoMove === 'rock')
        ) {
          result.textContent = playerName + ' Kalah!';
        } else {
          result.textContent = "Seri";
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
  