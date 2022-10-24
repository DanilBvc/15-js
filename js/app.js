alert('Прошу проверить в последний день в сроки не получилось вложиться')
const body = document.body;
let Board;
const cellCount = 4;
let gameOver = false,
  moves = 0,
  time = 0;
cords = {};
let winWindowIsActive = 0;
let soundOn = true;
const finallArray = [];
for (let i = 0; i < cellCount ** 2; i++) {
  finallArray.push(i);
}

const checkIsWin = () => {
  for (let i = 0; i < Board.length; i++) {
    if (Board[i] !== finallArray[i]) {
      return false;
    }
  }
  return true;
};

moveAudio = new Audio('audio/click-sound.mp3');
const soundTurn = () => {
  if (soundOn) {
    moveAudio.play();
  }
};
const initRandomArray = (cellCount) => {
  const existed = [];
  for (let row = 0; row < cellCount ** 2; row++) {
    while (existed.length !== cellCount ** 2) {
      const randNumber = Math.floor(Math.random() * cellCount ** 2);
      if (!existed.includes(randNumber)) {
        existed.push(randNumber);
        cords[existed.length - 1] = {
          x: (existed.length - 1) % 4,
          y: (existed.length - 1 - ((existed.length - 1) % 4)) / 4,
        };
      }
    }
  }
  for (let i = 0; i < existed.length; i++) {
    if (existed[i] === 0) {
      let temp = existed[existed.length - 1];
      existed[i] = temp;
      existed[existed.length - 1] = 0;
    }
  }
  let c = 0
  for(key in cords) {
    cords[key].value = existed[c]
    cords[key].x = cords[key].x * 100
    cords[key].y = cords[key].y * 100
    c++
  }
  return existed;
};

Board = initRandomArray(cellCount);

const defaultHtml = (cellCount, board) => {
  let res = ``;
  let arrayOfString = [];
  for (let i = 0; i < board.length; i++) {
    arrayOfString.push(
      `<div class="main-item" id="${board[i]}">${board[i]}</div> `
    );
  }
  res = arrayOfString.join('');
  return `${`<div class="restart__btn">Restart</div>  <button class="save">save</button><div class="sound__btn">sound</div><div class="_moves">Moves :0</div><div class="_timer">0s</div><div class="main grid-cell-4" >${arrayOfString.join(
    ''
  )}</div>`}`;
};

const localStorageGets = (cordsa) => {
  let generateBoard = []
  cords = cordsa
  let arrayOfStrings = []

  for(let key in cordsa) {
    generateBoard.push(cordsa[key].value)
    arrayOfStrings.push(
      `<div class="main-item"  id="${cordsa[key].value}">${cordsa[key].value}</div> `
    );
  }
  Board = generateBoard
  return `${`<div class="restart__btn">Restart</div>  <button class="save">save</button><div class="sound__btn">sound</div><div class="_moves">Moves :0</div><div class="_timer">0s</div><div class="main grid-cell-4" >${arrayOfStrings.join(
    ''
  )}</div>`}`;
}
if(JSON.parse(localStorage.getItem('cords')) !== null) {
  body.insertAdjacentHTML('afterbegin', localStorageGets(JSON.parse(localStorage.getItem('cords'))))
}else {
  body.insertAdjacentHTML('afterbegin', defaultHtml(cellCount, Board));
}
document.querySelector('.save').addEventListener('click', () => {
  if(JSON.parse(localStorage.getItem('cords')) === null) {
    localStorage.setItem('cords', JSON.stringify(cords))
  }else {
    localStorage.removeItem('cords');
    localStorage.setItem('cords', JSON.stringify(cords))
  }
})
const collectionItems = document.querySelectorAll('.main-item');
for (let i = 0; i < collectionItems.length; i++) {
  // collectionItems[i].onmousedown = (e) => {
  //   console.log(e)
  // }
  if (+collectionItems[i].innerHTML === 0) {
    collectionItems[i].style.color = 'transparent';
    collectionItems[i].style.border = 'none';
  }
  collectionItems[i].style.left = cords[i].x + 'px';
  collectionItems[i].style.top = cords[i].y + 'px';
}
const main = document.querySelector('.main');
main.addEventListener('click', (e) => {

  let clickedBlock = e.target.innerHTML;
  let need;
  let ChangeBoard = false;
  if (!checkIsWin()) {
    if (+clickedBlock !== 0) {
      for (let i = 0; i < Board.length; i++) {
        if (+clickedBlock === Board[i]) {
          if (Board[i + 4] !== undefined && Board[i + 4] === 0) {
            moves = moves + 1;
            document.querySelector('._moves').innerHTML = `Moves: ${moves}`;
            soundTurn();
            ChangeBoard = true;
            need = Board.indexOf(Board[i]);
            for (let j = 0; j < collectionItems.length; j++) {
              if (+collectionItems[j].innerHTML === Board[i]) {
                collectionItems[j].style.top = `${
                  +collectionItems[j].style.top.split('px')[0] + 100
                }px`;
                cords[i].y = cords[i].y + 100
              } else if (+collectionItems[j].innerHTML === Board[i + 4]) {
                collectionItems[j].style.top = `${
                  +collectionItems[j].style.top.split('px')[0] - 100
                }px`;
                cords[j].y = cords[j].y - 100
              }
            }
          } else if (Board[i - 4] !== undefined && Board[i - 4] === 0) {
            moves = moves + 1;
            document.querySelector('._moves').innerHTML = `Moves: ${moves}`;
            soundTurn();
            ChangeBoard = true;
            need = Board.indexOf(Board[i]);
            for (let j = 0; j < collectionItems.length; j++) {
              if (+collectionItems[j].innerHTML === Board[i]) {
                collectionItems[j].style.top = `${
                  +collectionItems[j].style.top.split('px')[0] - 100
                }px`;
                cords[i].y = cords[i].y - 100
              } else if (+collectionItems[j].innerHTML === Board[i - 4]) {
                collectionItems[j].style.top = `${
                  +collectionItems[j].style.top.split('px')[0] + 100
                }px`;
                cords[j].y = cords[j].y + 100
              }
            }
          } else if (Board[i + 1] !== undefined && Board[i + 1] === 0) {
            moves = moves + 1;
            document.querySelector('._moves').innerHTML = `Moves: ${moves}`;
            soundTurn();
            ChangeBoard = true;
            need = Board.indexOf(Board[i]);
            for (let j = 0; j < collectionItems.length; j++) {
              if (+collectionItems[j].innerHTML === Board[i]) {
                collectionItems[j].style.left = `${
                  +collectionItems[j].style.left.split('px')[0] + 100
                }px`;
                cords[i].x = cords[i].x + 100
              } else if (+collectionItems[j].innerHTML === Board[i + 1]) {
                collectionItems[j].style.left = `${
                  +collectionItems[j].style.left.split('px')[0] - 100
                }px`;
                cords[j].x = cords[j].x - 100
              }
            }
          } else if (Board[i - 1] !== undefined && Board[i - 1] === 0) {
            moves = moves + 1;
            document.querySelector('._moves').innerHTML = `Moves: ${moves}`;
            soundTurn();
            ChangeBoard = true;
            need = Board.indexOf(Board[i]);
            for (let j = 0; j < collectionItems.length; j++) {
              if (+collectionItems[j].innerHTML === Board[i]) {
                collectionItems[j].style.left = `${
                  +collectionItems[j].style.left.split('px')[0] - 100
                }px`;
                cords[i].x = cords[i].x + 100
              } else if (+collectionItems[j].innerHTML === Board[i - 1]) {
                collectionItems[j].style.left = `${
                  +collectionItems[j].style.left.split('px')[0] + 100
                }px`;
                cords[j].x = cords[j].x + 100
              }
            }
          } else {
            ChangeBoard = false;
          }
        }
      }
      if (ChangeBoard) {
        for (let g = 0; g < Board.length; g++) {
          if (Board[g] === 0) {
            Board[g] = Board[need];
            Board[need] = 0;
          }
        }
      }
    }
  } else {
    winWindowIsActive = winWindowIsActive + 1;
    clearInterval(startTimer);
    if (winWindowIsActive === 1) {
      body.insertAdjacentHTML(
        'beforebegin',
        ` <div class="popup">
  <div class="title">Вы победили</div>
  <div class="timer">За ${time} с</div>
  <div class="moves">За ${moves} ходов</div>
  <button class="btn">Restart</button>

</div>`
      );
      document.querySelector('.btn').addEventListener('click', () => {
        if(JSON.parse(localStorage.getItem('cords')) !== null) {
          localStorage.clear()
        }else {
          console.log('local storage is empty')
        }
      });
      
    }
  }
});

const startTimer = setInterval(timerStart, 1000);
function timerStart() {
  time++;
  document.querySelector('._timer').innerHTML = `Time : ${time}s`;
}
document.querySelector('.sound__btn').addEventListener('click', () => {
  if (soundOn) {
    soundOn = false;
  } else {
    soundOn = true;
  }
});

document.querySelector('.restart__btn').addEventListener('click', () => {
  if(JSON.parse(localStorage.getItem('cords')) !== null) {
    localStorage.clear()
    window.location.reload()
  }else {
    console.log('local storage is empty')
    window.location.reload()
  }
});