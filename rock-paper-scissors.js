let score={
        wins:0,
        losses:0,
        ties:0
      };
      updateScoreElement();
      score=JSON.parse(localStorage.getItem('score')) || 
          {
          wins:0,
          losses:0,
          ties:0
        };
      let isAutoPlaying=false;
      let intervalId;
      function autoplay(){
        if(!isAutoPlaying){
            intervalId=setInterval(function(){
              const playerMove=playComputerMove();
              playGame(playerMove);
            },1500);
            isAutoPlaying=true;
            document.getElementById("stop-button").innerHTML='Stop Auto Play';
        }else{
          clearInterval(intervalId);
          isAutoPlaing=false;
        }
        
        
      }
      function playGame(playerMove){
        let computerMove=playComputerMove();
        let result='';
        if(playerMove==='rock'){
          if(computerMove==='rock'){
            result='Tie.';
          }else if(computerMove==='paper'){
            result='You lose.';
          }else if(computerMove==='scissors'){
            result='You win.';
          }
        }else if(playerMove==='paper'){
          if(computerMove==='rock'){
            result='You win.';
          }else if(computerMove==='paper'){
            result='Tie.';
          }else if(computerMove==='scissors'){
            result='You lose.';
          }
        }else if(playerMove==='scissors'){
          if(computerMove==='rock'){
            result='You lose.';
          }else if(computerMove==='paper'){
            result='You win.';
          }else if(computerMove==='scissors'){
            result='Tie.';
          }
        }
        if(result==='You win.'){
          score.wins+=1;
        }else if(result==='You lose.'){
          score.losses+=1;
        }else if(result==='Tie.'){
          score.ties+=1;
        }
        localStorage.setItem('score',JSON.stringify(score));
        document.querySelector('.js-result').innerHTML=`${result}`;
        document.querySelector('.js-moves').innerHTML=`You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;
        updateScoreElement();
      }
      function playComputerMove(){
        let randomNumber=Math.random();
        let computerMove;
        if(randomNumber<1/3){
          computerMove='rock';
        }else if(randomNumber>=1/3 && randomNumber<2/3){
          computerMove='paper';
        }else{
          computerMove='scissors';
        }
        return computerMove;
      }
      function updateScoreElement(){
        document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
      }
      function updateResultElement(){
        document.querySelector('.js-result').innerHTML=`${result}`;
      }