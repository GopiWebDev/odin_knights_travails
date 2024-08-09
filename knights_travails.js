// basic queue
class Queue {
  constructor() {
    this.values = [];
  }

  enqueue(val) {
    this.values.push(val);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.values.shift();
  }

  isEmpty() {
    return this.values.length === 0;
  }
}

// function to check if the move is valid
function isValidMove(x, y) {
  return x >= 0 && y >= 0 && x < 8 && y < 8;
}

// knightMoves function with start and end as parameters
function knightMoves(start, end) {
  // returns invalid if any parameter is missing
  if (!start || !end) return `Invalid`;

  // all valid moves for a knight
  const knightMoves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  const queue = new Queue();
  const visited = new Set();
  const path = new Map();

  // added starting positon to queue in positions key, and setting moves to 0
  queue.enqueue({ position: start, moves: 0 });
  // adding the starting positon to visted to avoid looping same position
  visited.add(`${start[0]},${start[1]}`);
  // creating the path to track the position and return
  path.set(`${start[0]},${start[1]}`, [start]);

  // while queue is not empty
  while (!queue.isEmpty()) {
    // dequeue the first value in queue i.e start and setting it to current
    const current = queue.dequeue();
    // setting the positions of current to x, y i.e start[0] & start[1]
    const [x, y] = current.position;
    // setting the moves of current to moves i.e 0
    const moves = current.moves;

    // checking if x is end[0] and y is end[1] if true we return the paths
    if (x === end[0] && y === end[1]) {
      // gets the path with get method and stores in variable to return
      const paths = path.get(`${x},${y}`);
      // logging the number of moves excluding the start so path.length - 1
      console.log(`You have made it in ${paths.length - 1} moves`);
      // returns the path it took to reach the target from start
      return paths;
    }

    // if [x,y] and end is different
    // loop over the values of knightMoves
    for (const move of knightMoves) {
      // newX indicates the new positon where the knight is
      const newX = x + move[0];
      // newY indicates the new positon where the knight is
      const newY = y + move[1];

      // checks if the newX and newY are valid and it has not been visited already
      if (isValidMove(newX, newY) && !visited.has(`${newX},${newY}`)) {
        // adds the new position to queue and sets the moves to +1
        queue.enqueue({ position: [newX, newY], moves: moves + 1 });
        // adds that position to visited to avoid repetition
        visited.add(`${newX},${newY}`);
        // creates new path that is previous path + new path. combines using concat method
        const newPath = path.get(`${x},${y}`).concat([[newX, newY]]);
        // this stores all the positions it took to reach the current position from start
        path.set(`${newX},${newY}`, newPath);
      }
    }
  }
  // returns this if it cannot reach the target
  return `Target is not reachable`;
}

console.log(knightMoves([3, 3], [7, 7]));
