class numberCube{
    constructor(num, merged){
        this.number = num;
        this.merged = merged;
    }
}

class position{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

//we know that the matrix is 4x4 so we dont have magical numbers in the code
const size = 4;

//init playField
function init() {
    let matrix = new Array(size);
    for(let i = 0; i < size; i++){
        matrix[i] = new Array(size);
    }
    return matrix;
}

let playField = init();

let onField = [];

//keep an array of all the added elements >
//in every move function sort the array in a certain way so that we start from the one closest to the move border if up-top, left-left and so on >
//when we merge items merge into one and then delete the other one from the array
//add a new item randomly on the field
//we know all the possible positions to add on because we have the once we already have on

//method for creating an element of 2 on a random empty element
function createNew2(playField){
    while(true){
        if(onField.length === 16){
            alert("Game over!");
            reset();
            break;
        }
        if(onField.length <= 10){
            let x = Math.floor(Math.random()*4);
            let y = Math.floor(Math.random()*4);
            if(playField[x][y] == undefined){
                playField[x][y] = new numberCube(2, false);
                onField.push(new position(x,y));
                break;
            }
        }
        else{
            let free = [];
            for(let i = 0; i < size; i++){
                for(let j = 0; j < size; j++){
                    if(playField[i][j] == undefined){
                        free.push(new position(i, j));
                    }
                }
            }
            let rndPos = free[Math.floor(Math.random()*free.length)];
            playField[rndPos.x][rndPos.y] = new numberCube(2, false);
            onField.push(new position(rndPos.x,rndPos.y));
            break;
        }
        
    }
}

//no guards because its met for testing purposes not to brake the program
function createTesting(playField, x, y, num){
    playField[x][y] = new numberCube(num, false);
    onField.push(new position(x,y)); 
}

//methods for moving in one of the certain four possible positions
function moveUp(playField){
    let merged = [];
    //sort in ascending order by row(x);
    onField.sort(function(a, b){ return a.x - b.x; });
    for(let i = 0; i < onField.length; i++){
        let start = onField[i].x; // we we look only the numbers above 
        let col = onField[i].y;
        for(let j = start - 1; j >= 0; j--){
            if(playField[j][col] == undefined){
                playField[j][col] = playField[onField[i].x][col];
                playField[onField[i].x][col] = undefined;
                onField[i].x = j;
            }
            else if(playField[j][col].number == playField[onField[i].x][col].number && !playField[j][col].merged){
                merged.push(new position(j, col));
                playField[j][col].number *= 2;
                playField[j][col].merged = true;
                playField[onField[i].x][col] = undefined;
                onField[i].x = -1;//mark this position for removal 
                if(playField[j][col].number === 2048) {
                    alert("You won!");
                    reset();
                    return true;
                }
                break;
            }
            else break;
        }
    }

    let editedField = [];
    for(let i = 0; i < onField.length; i++){
        if(onField[i].x != -1){
            editedField.push(onField[i]);
        }
    }
    onField = editedField;
    //unmerge the merged once 
    for(let i = 0; i < merged.length; i++){
        playField[merged[i].x][merged[i].y].merged = false;
    }
    //on the end of this function add a new element if possible if not end game
    createNew2(playField);
}

function moveDown(playField){
    let merged = [];
    //sort in descending order by row(x);
    onField.sort(function(a, b){ return b.x - a.x; });
    //todo!()
    for(let i = 0; i < onField.length; i++){
        let start = onField[i].x; // we we look only the numbers above 
        let col = onField[i].y;
        for(let j = start + 1; j < size; j++){
            if(playField[j][col] == undefined){
                playField[j][col] = playField[onField[i].x][col];
                playField[onField[i].x][col] = undefined;
                onField[i].x = j;
                
            }
            else if(playField[j][col].number == playField[onField[i].x][col].number && !playField[j][col].merged){
                merged.push(new position(j, col));
                playField[j][col].number *= 2;
                playField[j][col].merged = true;
                playField[onField[i].x][col] = undefined;
                onField[i].x = -1;//mark this position for removal 
                if(playField[j][col].number === 2048) {
                    alert("You won!");
                    reset();
                    return true;
                }
                break;
            }
            else break; // we dont want to continue if there is no free space or a cube to merge with
        }
    }
    //remove the merged items
    let editedField = [];
    for(let i = 0; i < onField.length; i++){
        if(onField[i].x != -1){
            editedField.push(onField[i]);
        }
    }
    onField = editedField;
    //unmerge the merged once 
    for(let i = 0; i < merged.length; i++){
        playField[merged[i].x][merged[i].y].merged = false;
    }

    createNew2(playField);
}

function moveLeft(playField){
    let merged = [];
    //sort in ascending order by col(y);
    onField.sort(function(a, b){ return a.y - b.y; });
    //todo!()
    for(let i = 0; i < onField.length; i++){
        let start = onField[i].y; // we we look only the numbers above 
        let row = onField[i].x;
        for(let j = start - 1; j >= 0; j--){
            if(playField[row][j] == undefined){
                playField[row][j] = playField[row][onField[i].y];
                playField[row][onField[i].y] = undefined;
                onField[i].y = j;
            }
            else if(playField[row][j].number == playField[row][onField[i].y].number && !playField[row][j].merged){
                merged.push(new position(row, j));
                playField[row][j].number *= 2;
                playField[row][j].merged = true;
                playField[row][onField[i].y] = undefined;
                onField[i].x = -1;//mark this position for removal 
                if(playField[row][j].number === 2048){
                    alert("You won!");
                    reset();
                    return true;
                }
                break;
            }
            else break;
        }
    }
    let editedField = [];
    for(let i = 0; i < onField.length; i++){
        if(onField[i].x != -1){
            editedField.push(onField[i]);
        }
    }
    onField = editedField;
    //unmerge the merged once 
    for(let i = 0; i < merged.length; i++){
        playField[merged[i].x][merged[i].y].merged = false;
    }

    createNew2(playField);
}

function moveRight(playField){
    let merged = [];
    //sort in descending order by col(y);
    onField.sort(function(a, b){ return b.y - a.y; });
    //todo!()
    for(let i = 0; i < onField.length; i++){
        let start = onField[i].y; // we we look only the numbers above 
        let row = onField[i].x;
        for(let j = start + 1; j < size; j++){
            if(playField[row][j] == undefined){
                playField[row][j] = playField[row][onField[i].y];
                playField[row][onField[i].y] = undefined;
                onField[i].y = j;
            }
            else if(playField[row][j].number == playField[row][onField[i].y].number && !playField[row][j].merged){
                merged.push(new position(row, j));
                playField[row][j].number *= 2;
                playField[row][j].merged = true;
                playField[row][onField[i].y] = undefined;
                onField[i].x = -1;//mark this position for removal 
                if(playField[row][j].number === 2048) {
                    alert("You won!");
                    reset();
                    return true;
                }
                break;
            }
            else break;
        }
    }
    
    let editedField = [];
    for(let i = 0; i < onField.length; i++){
        if(onField[i].x != -1){
            editedField.push(onField[i]);
        }
    }
    onField = editedField;
    //unmerge the merged once 
    for(let i = 0; i < merged.length; i++){
        playField[merged[i].x][merged[i].y].merged = false;
    }

    createNew2(playField);
}

//the function gets the playField and edits the table on the site
function render(playField){
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            if(playField[i][j] == undefined){
                document.getElementById(`${i+1}` + `${j+1}`).innerText = "";
            }
            else{
                document.getElementById(`${i+1}` + `${j+1}`).innerText = `${playField[i][j].number}`;
            }
        }
    }
}

let showPlayField = function(){
    document.getElementById("start").style.display = "none";
    document.getElementsByClassName("content")[0].style.display = "block";
    document.getElementsByClassName("footer")[0].style.display = "none";
    //put the first element
    createNew2(playField);
    render(playField);
}

//left = 37, right = 39, up = 38, down = 40
function move(event){
    switch(event.keyCode){
        case 39:{
            moveRight(playField);
        }
        break;
        case 37:{
            moveLeft(playField);
        }
        break;
        case 38:{
            moveUp(playField);
        }
        break;
        case 40:{
            moveDown(playField); 
        }
        break;
    }
    render(playField);
}

function reset(){
    playField = init();
    onField = [];
    document.getElementById("start").style.display = "block";
    document.getElementsByClassName("content")[0].style.display = "none";
    document.getElementsByClassName("footer")[0].style.display = "flex";
}

document.getElementById("start").addEventListener("click", showPlayField);

document.body.addEventListener("keydown", move);