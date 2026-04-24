import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateSudoku = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `
    Generate a 9x9 Sudoku puzzle. 
    Return the result in JSON format with two fields:
    1. "initial": A 2D array of strings where '0' represents empty cells.
    2. "solution": A 2D array of strings representing the full solution.
    Ensure the puzzle has a unique solution and is of medium difficulty.
    Only return the JSON.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean up possible markdown code blocks
    const cleanedText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating Sudoku with Gemini, using fallback:", error);
    return getFallbackSudoku();
  }
};

const getFallbackSudoku = () => {
  // A standard pre-solved Sudoku board that we can permute or just return
  // For simplicity, a static one that's valid
  return {
    initial: [
      ["5", "3", "0", "0", "7", "0", "0", "0", "0"],
      ["6", "0", "0", "1", "9", "5", "0", "0", "0"],
      ["0", "9", "8", "0", "0", "0", "0", "6", "0"],
      ["8", "0", "0", "0", "6", "0", "0", "0", "3"],
      ["4", "0", "0", "8", "0", "3", "0", "0", "1"],
      ["7", "0", "0", "0", "2", "0", "0", "0", "6"],
      ["0", "6", "0", "0", "0", "0", "2", "8", "0"],
      ["0", "0", "0", "4", "1", "9", "0", "0", "5"],
      ["0", "0", "0", "0", "8", "0", "0", "7", "9"]
    ],
    solution: [
      ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
      ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
      ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
      ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
      ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
      ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
      ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
      ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
      ["3", "4", "5", "2", "8", "6", "1", "7", "9"]
    ]
  };
};

export const generateMinesweeper = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `
    Generate an 8x8 Minesweeper grid with exactly 10 mines.
    Return the result in JSON format with one field:
    1. "mineMap": A 2D array of exactly 8 rows and 8 columns of booleans (true/false), where true represents a mine.
    Ensure exactly 10 'true' values are present.
    The response must be valid JSON only. Do not include any explanations, markdown formatting, or other text outside the JSON structure.
    Format example:
    {
      "mineMap": [
        [true, false, false, false, false, false, false, false],
        [false, true, false, false, false, false, false, false],
        ...
      ]
    }
    Only return the JSON object, no other text.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanedText);
    
    // Validation
    if (!data.mineMap || !Array.isArray(data.mineMap) || data.mineMap.length !== 8) {
      throw new Error("Invalid Minesweeper grid format from Gemini");
    }
    
    return data;
  } catch (error) {
    console.error("Error generating Minesweeper with Gemini, using fallback:", error);
    return generateDeterministicMinesweeper();
  }
};

const generateDeterministicMinesweeper = () => {
  // Simple deterministic random based on date
  const date = new Date();
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  
  // LCG-like simple random
  let currentSeed = seed;
  const random = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
    return currentSeed / 4294967296;
  };

  const mineMap = Array(8).fill(null).map(() => Array(8).fill(false));
  let placed = 0;
  while (placed < 10) {
    const r = Math.floor(random() * 8);
    const c = Math.floor(random() * 8);
    if (!mineMap[r][c]) {
      mineMap[r][c] = true;
      placed++;
    }
  }
  
  return { mineMap };
};
