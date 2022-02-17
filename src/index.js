function render(data) {
  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  const dataSize = data.length;
  const pixelSize = Math.floor(width / dataSize);

  // reset canvas
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, height, width);

  const drawPixel = (x, y) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    ctx.stroke();
  };

  for (let y = 0; y < dataSize; y++) {
    for (let x = 0; x < dataSize; x++) {
      if (data[y][x]) {
        drawPixel(y, x);
      }
    }
  }
}

let SIZE = 100;

function create2dArr(randomize = false) {
  return Array(SIZE)
    .fill(0)
    .map(function () {
      return Array(SIZE)
        .fill(0)
        .map(function () {
          if (randomize) {
            return Math.round(Math.random());
          } else {
            return 0;
          }
        });
    });
}

let data = create2dArr(true);

function countLiveNeighbors(x, y) {
  let neighborLocations = [
    [x, y + 1],
    [x + 1, y + 1],
    [x + 1, y],
    [x + 1, y - 1],
    [x, y - 1],
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1]
  ];

  let sum = 0;

  neighborLocations.forEach(function (location) {
    let x = location[0];
    let y = location[1];

    if (data[y] !== undefined && data[y][x] === 1) {
      sum++;
    }
  });

  return sum;
}

function nextGeneration() {
  let newData = create2dArr();

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let sum = countLiveNeighbors(x, y);
      let isLive = data[y][x] === 1;

      if (isLive) {
        if (sum < 2 || sum > 3) {
          newData[y][x] = 0;
        } else {
          newData[y][x] = 1;
        }
      } else {
        if (sum === 3) {
          newData[y][x] = 1;
        } else {
          newData[y][x] = 0;
        }
      }
    }
  }
  data = newData;
}

render(data);

setInterval(function () {
  nextGeneration();
  render(data);
}, 200);
