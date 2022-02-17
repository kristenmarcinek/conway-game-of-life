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

let SIZE = 25;

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
  data[y][x];
}

function nextGeneration() {
  let newData = create2dArr();
}

render(data);
