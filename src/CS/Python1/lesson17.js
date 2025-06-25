import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson17 = () => {
    const content = `# Day 2-3: Tic Tac Toe

## Project Overview

Students should create a tic tac toe game in which the user can play against the computer.

## Project Requirements

**Basic Requirements:**
- 3x3 game board using lists
- Player vs computer gameplay
- Win condition checking
- Draw condition checking
- Clear board display

## Sample Implementation

\`\`\`python
import random

def print_board(board):
    for i in range(0, 9, 3):
        print(board[i], "|", board[i+1], "|", board[i+2])
        if i < 6:
            print("---------")

def check_winner(board, player):
    # Check rows
    for i in range(0, 9, 3):
        if board[i] == board[i+1] == board[i+2] == player:
            return True
    
    # Check columns
    for i in range(3):
        if board[i] == board[i+3] == board[i+6] == player:
            return True
    
    # Check diagonals
    if board[0] == board[4] == board[8] == player:
        return True
    if board[2] == board[4] == board[6] == player:
        return True
    
    return False

def is_board_full(board):
    return " " not in board

def computer_move(board):
    empty_positions = [i for i, spot in enumerate(board) if spot == " "]
    if empty_positions:
        return random.choice(empty_positions)
    return None

# Initialize board
board = [" " for _ in range(9)]

print("Welcome to Tic Tac Toe!")
print("You are X, computer is O")

while True:
    print_board(board)
    
    # Player's turn
    while True:
        try:
            move = int(input("Enter your move (1-9): ")) - 1
            if 0 <= move <= 8 and board[move] == " ":
                board[move] = "X"
                break
            else:
                print("Invalid move! Try again.")
        except ValueError:
            print("Please enter a number between 1 and 9.")
    
    # Check if player won
    if check_winner(board, "X"):
        print_board(board)
        print("You win!")
        break
    
    # Check if board is full
    if is_board_full(board):
        print_board(board)
        print("It's a draw!")
        break
    
    # Computer's turn
    computer_pos = computer_move(board)
    if computer_pos is not None:
        board[computer_pos] = "O"
        print("Computer chose position", computer_pos + 1)
    
    # Check if computer won
    if check_winner(board, "O"):
        print_board(board)
        print("Computer wins!")
        break
    
    # Check if board is full
    if is_board_full(board):
        print_board(board)
        print("It's a draw!")
        break
\`\`\`

## Key Concepts Applied

**Lists:**
- 3x3 board representation
- Position tracking
- Win condition checking

**Functions:**
- Board display
- Winner checking
- Computer AI

**Loops and Conditionals:**
- Game loop
- Move validation
- Win/draw detection

## Resources

- Example: https://repl.it/talk/share/Tic-Tac-Toe/124082

## Next Steps

In the next module, we'll learn about 2D arrays and nested iteration!`;

    return (
        <LessonPage
            title="Tic Tac Toe"
            moduleTitle="Lists"
            lessonNumber={17}
            content={content}
            prevLesson="/cs/python1/lesson16"
            nextLesson="/cs/python1/lesson18"
        />
    );
};

export default Lesson17; 
