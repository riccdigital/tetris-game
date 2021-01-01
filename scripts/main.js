//event listener to make script wait for html to finish loading
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-btn');
    let nextRandom = 0;

    //The shapes

    const lShape = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    const zShape = [
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1]
    ];

    const tShape = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];

    const oShape = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]

    ];

    const iShape = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const theShapes = [lShape, zShape,tShape, oShape, iShape];

    let currentPosition = 4;
    let currentRotation = 0;
    //random selection in its first rotation*
    let random = Math.floor(Math.random() * theShapes.length);
    let current = theShapes[random][currentRotation];

    //draw the Shape
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('shape');
        });
    }

    //undraw the Shape
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('shape');
        });
    }

    //make shape move down every second

    timerId = setInterval(moveDown, 1000);
    //keyCode functions

    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate();
        }
         else if (e.keyCode === 39 ) {
            moveRight();
        }
         else if (e.keyCode === 40) {
            moveDown();
        }
    }

    document.addEventListener('keydown', control);

    //movedown funct
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    //bottom stop function
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));

            //start new Shape
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theShapes.length);
            current = theShapes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
         }
    }
//edge blockage
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        
        if (!isAtLeftEdge) currentPosition -= 1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
    }
    //moveRight
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

        if (!isAtRightEdge) currentPosition += 1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();    

    }

    //rotate the shape
    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theShapes[random][currentRotation];
        draw();

    } 
    //Show Next Shape 
    const dispalySquares = document.querySelectorAll('.mini-grid div'); 
    const displayWidth = 4;
    let displayIndex = 0;
    

    //The Shapes without rotations  
    const upNextShapes = [
        //lShape
        [1, displayWidth + 1, displayWidth * 2 + 1, 2],
        //zShape
        [displayWidth + 1, displayWidth + 2, displayWidth * 2, displayWidth * 2 + 1],
        //tShape
        [1, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 1],
        //oShape
        [0, 1, displayWidth, displayWidth + 1],
        //iShape
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1]

    ];

    //display shape in mini grid function
     //first clean grid
    function displayShape() {
        dispalySquares.forEach(square => {
            square.classList.remove('shape');
        });
        upNextShapes[nextRandom].forEach(index => {
            dispalySquares[displayIndex + index].classList.add('shape');
        });
    }


});