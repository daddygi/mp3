export default function NewtonInterpolation(
  points: [number, number][],
  n: number,
  x: number
): number {
  // Step 1: Define sample points
  let xVals: number[] = new Array(n);
  let yVals: number[] = new Array(n);
  for (let i = 0; i < n; i++) {
    xVals[i] = points[i][0];
    yVals[i] = points[i][1];
  }

  // Step 2: Create divided difference table
  let divDiffTable: number[][] = new Array(n);
  for (let i = 0; i < n; i++) {
    divDiffTable[i] = new Array(n);
    divDiffTable[i][0] = yVals[i];
  }
  for (let j = 1; j < n; j++) {
    for (let i = 0; i < n - j; i++) {
      divDiffTable[i][j] =
        (divDiffTable[i + 1][j - 1] - divDiffTable[i][j - 1]) /
        (xVals[i + j] - xVals[i]);
    }
  }

  // Step 3: Evaluate the interpolating polynomial
  let Pn_x: number = divDiffTable[0][0];
  let prod: number = 1;
  for (let j = 1; j < n; j++) {
    prod *= x - xVals[j - 1];
    Pn_x += divDiffTable[0][j] * prod;
  }

  // Step 4: Return the interpolated value
  return Pn_x;
}
