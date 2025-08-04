const dice = document.getElementById("dice")
const p1 = document.getElementById("p1")
const p2 = document.getElementById("p2")
const entry_num = 1;
let turn = true;
const cells = document.querySelectorAll(".cell");
const players = document.querySelectorAll('.players');
const image1 = document.createElement('img');
image1.src = '/placeholder.png';
image1.id = 'p1Icon';
const image2 = document.createElement('img');
image2.src = '/placeholder.png';
image2.id = 'p2Icon';


//ladders object
const ladders = {
    "13": "27",
    "16": "67",
    "28": "32",
    "33": "49",
    "42": "63",
    "62": "80",
    "53": "87",
    "72": "90",
    "85": "95"
}

const snakes = {
    "23": "3",
    "30": "10",
    "39": "20",
    "47": "26",
    "56": "36",
    "71": "9",
    "78": "24",
    "86": "65",
    "98": "79"
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
function playMoveSoundDynamic() {
    const moveSound = new Audio('/move.wav');
    moveSound.play();
}
const animation = async (i, sum, player) => {

    for (i; i < sum; i++) {
        if (player == 'p1') {
            document.getElementById('p1Icon').remove(); //remove the previous position
            cells[i].append(image1); // add at the new position
            playMoveSoundDynamic();
        }
        else if (player == 'p2') {
            document.getElementById('p2Icon').remove(); //remove the previous position
            cells[i].append(image2); // add at the new position
            playMoveSoundDynamic();
        }
        await delay(400);
    }
    return new Promise((resolve, reject) => {
        resolve();
    });

}

const checkPos = (sum) => {
    if (ladders[sum]) {
        return sum = ladders[sum];
    }
    else if (snakes[sum]) {
        return sum = snakes[sum];
    }
    return sum;
}

const checkWin = (sum) => {
    if (sum == '100') {
        return true;
    }
    return false;
}


const Move = async () => {
    if (turn) {// p1 move
        console.log("P1: " + dice.innerText);
        if (p1.textContent == '0') { // if the player has not got an entry yet i.e.; score is 0 enter.
            if (dice.textContent == '1') {  // if the player rolled the dice and got 1 , Add his piece on the board
                p1.textContent = '1';
                cells[0].appendChild(image1);
            }

        }
        else {
            let sum = Number(p1.textContent) + Number(dice.textContent);
            if (sum <= 100) {
                const promAnimation = await animation(Number(p1.textContent), sum, "p1")

                sum = checkPos(sum); //check if we have hit any obstacles

                console.log(sum);
                p1.textContent = sum;
                cells[sum - 1].append(image1); // if we have hit any obstacles then change the sum.
                if (checkWin(sum)) { // check win every time 
                    dice.disabled = true;
                    console.log("P1 Wins");
                }
            }
        }
        turn = false;


    }
    else {

        if (p2.textContent == '0') {
            if (dice.textContent == '1') {
                p2.textContent = '1';
                cells[0].appendChild(image2);
            }

        }
        else {
            let sum = Number(p2.textContent) + Number(dice.textContent);
            if (sum <= 100) {
                const promAnimation = await animation(Number(p2.textContent), sum, "p2")

                sum = checkPos(sum);
                console.log(sum);
                p2.textContent = sum;
                cells[sum - 1].append(image2);
                if (checkWin(sum)) {
                    dice.disabled = true;
                    console.log("P2 wins");
                }
            }
        }
        turn = true;
    }
    dice.disabled = false;
    dice.style.backgroundColor = dice.style.backgroundColor == 'red' ? 'blue' : 'red';

}

dice.style.backgroundColor = 'red';
// players[0].style.backgroundColor = 'red';
async function Click() {
    dice.addEventListener("click", () => {
        dice.disabled = true;
        let a = setInterval(() => {
            dice.textContent = Math.floor(Math.random() * 6) + 1;
        }, 100);


        setTimeout(() => {
            clearInterval(a)
            Move();

        }, 1000);



    })

}

Click();