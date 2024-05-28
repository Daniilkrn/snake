import { GameArea, User } from "./app";

export const grid = 20;

export const snake = {
  x: 0,
  y: 0,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 3,
  paused: false,
  color: "green",
  progress: 0,
  progressCount: 3,
  initialCell: 3,
};

export const obstacle = {
  x: 0,
  y: 0,
  cells: [],
  color: "gray",
  maxSize: 25,
};

export const apple = {
  x: 100,
  y: 100,
  color: "red",
  length: 1,
};

export const boosts = {
  counter: 0,
  double: {
    timeEnding: 15000,
    x: null,
    y: null,
  },
  get getStatus(){
    return this.status
  },
  set setStatus(boolean){
    return this.status = boolean
  }
}

export const gameAreaSettings = {
  speed: 6
}