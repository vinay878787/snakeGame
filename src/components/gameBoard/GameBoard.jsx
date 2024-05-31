// GameBoard.js
import React, { useState, useEffect } from "react";
import styles from "./GameBoard.module.css";

class Node {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.next = null;
  }
}

const GameBoard = () => {
  const rows = 20;
  const cols = 10;
  const initialSnakeLength = 5;
  const baseSpeed = 200;

  const [snakes, setSnakes] = useState([]);
  const [diamondPosition, setDiamondPosition] = useState({ row: -1, col: -1 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);

  const generateInitialSnakePositions = () => {
    const initialRow = Math.floor(Math.random() * rows);
    const initialCol = Math.floor(Math.random() * cols);
    const initialDirection = ["up", "down", "left", "right"][Math.floor(Math.random() * 4)]; 
    let head = new Node(initialRow, initialCol);
    let tail = head;
  
    for (let i = 1; i < initialSnakeLength; i++) {
      let nextCol;
      let nextRow;
      switch (initialDirection) {
        case "up":
          nextRow = initialRow - i;
          nextCol = initialCol;
          break;
        case "down":
          nextRow = initialRow + i;
          nextCol = initialCol;
          break;
        case "left":
          nextRow = initialRow;
          nextCol = initialCol - i;
          break;
        case "right":
          nextRow = initialRow;
          nextCol = initialCol + i;
          break;
        default:
          nextRow = initialRow;
          nextCol = initialCol - i;
      }
      const newNode = new Node(nextRow, nextCol);
      tail.next = newNode;
      tail = newNode;
    }
    return { head, tail, direction: initialDirection };
  };
  
//generate random position fpr diamond
  const generateRandomPosition = () => {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    return { row, col };
  };

  const handleStart = () => {
    setGameOver(false);
    setScore(0);
    const initialSnake = generateInitialSnakePositions();
    setSnakes([initialSnake]);
    setDiamondPosition(generateRandomPosition());
    setGameRunning(true);
  };

  const handleStop = () => {
    setGameRunning(false);
  };

  const moveSnakes = () => {
    if (!gameRunning) return;

    const newSnakes = snakes.map((snake) => {
      let newHead;
      let newDirection = snake.direction;

      switch (snake.direction) {
        case "up":
          newHead = new Node(snake.head.row - 1, snake.head.col);
          if (newHead.row < 0) {
            newHead.row = rows - 1;
          }
          break;
        case "down":
          newHead = new Node(snake.head.row + 1, snake.head.col);
          if (newHead.row >= rows) {
            newHead.row = 0;
          }
          break;
        case "left":
          newHead = new Node(snake.head.row, snake.head.col - 1);
          if (newHead.col < 0) {
            newHead.col = cols - 1;
          }
          break;
        case "right":
          newHead = new Node(snake.head.row, snake.head.col + 1);
          if (newHead.col >= cols) {
            newHead.col = 0;
          }
          break;
        default:
          return snake;
      }

      newHead.next = snake.head;
      const newSnake = { ...snake, head: newHead, direction: newDirection };

      if (newHead.row === diamondPosition.row && newHead.col === diamondPosition.col) {
        setScore((prevScore) => prevScore - 10);
        setDiamondPosition(generateRandomPosition());
      } else {
        let current = snake.head;
        while (current.next !== snake.tail) {
          current = current.next;
        }
        current.next = null;
        newSnake.tail = current;
      }

      return newSnake;
    });

    setSnakes(newSnakes);
  };

  const isSnakeCell = (row, col) => {
    for (let snake of snakes) {
      let currentNode = snake.head;
      while (currentNode !== null) {
        if (currentNode.row === row && currentNode.col === col) {
          return true;
        }
        currentNode = currentNode.next;
      }
    }
    return false;
  };

  const handleDiamondClick = () => {
    setScore((prevScore) => prevScore + 10);
    setDiamondPosition(generateRandomPosition());
  };

  useEffect(() => {
    const speedMultiplier = 0.95 - (0.05 * Math.min(1, snakes.length / 10));
    if (gameRunning) {
      const interval = setInterval(() => {
        moveSnakes();
      }, baseSpeed * Math.pow(speedMultiplier, snakes.length - 1));
  
      return () => clearInterval(interval);
    }
  }, [gameRunning, snakes, diamondPosition]);
  

  useEffect(() => {
    const snakeCount = Math.floor(score / 10);
    if (snakeCount > snakes.length) {
      const newSnake = generateInitialSnakePositions();
      setSnakes((prevSnakes) => [...prevSnakes, newSnake]);
    }
    if (score < 0) {
      setGameOver(true);
      setGameRunning(false);
    }
  }, [score]);

  return (
    <div className={styles.snakeBoardWrapper}>
      <div>
        <div className={styles.board}>
          {[...Array(rows)].map((_, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {[...Array(cols)].map((_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${styles.cell} ${
                    isSnakeCell(rowIndex, colIndex) ? styles.snake : ""
                  } ${
                    diamondPosition.row === rowIndex &&
                    diamondPosition.col === colIndex
                      ? styles.diamond
                      : ""
                  }`}
                  onClick={() =>
                    diamondPosition.row === rowIndex &&
                    diamondPosition.col === colIndex
                      ? handleDiamondClick()
                      : null
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.featuresContainer}>
        {gameOver && <div className={styles.gameOver}>Game Over</div>}
        <div className={styles.scoreWrapper}>
          <div className={styles.score}>Score: {score}</div>
        </div>
        <div className={styles.buttons}>
          {gameRunning ? (
            <button onClick={handleStop} className={styles.stopBtn}>Stop</button>
          ) : (
            <button onClick={handleStart} className={styles.startBtn}>Start</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
