import { generateSudoku, generateMinesweeper } from "./geminiService.js";
import { storePuzzle } from "./puzzleStorage.js";

export const runDailyGeneration = async () => {
  console.log("Starting daily puzzle generation...");

  // Sudoku
  try {
    const sudokuData = await generateSudoku();
    await storePuzzle("sudoku", sudokuData);
    console.log("Sudoku daily puzzle updated.");
  } catch (error) {
    console.error("Failed to generate daily Sudoku:", error);
  }

  // Minesweeper
  try {
    const minesweeperData = await generateMinesweeper();
    await storePuzzle("minesweeper", minesweeperData);
    console.log("Minesweeper daily puzzle updated.");
  } catch (error) {
    console.error("Failed to generate daily Minesweeper:", error);
  }
};

// If run directly
if (import.meta.url.endsWith("puzzleGenerator.js")) {
  runDailyGeneration();
}
