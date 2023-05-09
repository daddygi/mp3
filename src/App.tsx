import React, { useState } from "react";
import NewtonInterpolation from "./algo/newton";
import "./App.css";

function App(): JSX.Element {
  // Part 1: User-defined inputs
  const [newPoints, setNewPoints] = useState<Array<[number, number]>>([]);
  const [nPoints, setNPoints] = useState<number>(0);
  const [xVal, setXVal] = useState<number>(0);
  const [result, setResult] = useState<number>();
  const [stockResult, setStockResult] = useState<number>();

  // Part 2: Stock values
  const stockValues = [
    184.51, 186.79, 180.54, 185.9, 188, 187.04, 184.31, 180.59, 162.99, 165.08,
    162.55, 160.67, 153.75, 160.19, 164.31, 161.83, 160.31, 160.61, 161.2,
    170.06, 171.79,
  ];
  const [nStockPoints, setNStockPoints] = useState<number>(10);
  const [stockXVal, setStockXVal] = useState<number>(0);

  // Handle form submission for user-defined inputs
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const n = parseInt(nPoints.toString());
    if (isNaN(n) || n <= 0) {
      alert("Invalid number of points. Please enter a positive integer.");
      return;
    }

    const x = parseFloat(xVal.toString());
    if (isNaN(x)) {
      alert("Invalid value of x. Please enter a number.");
      return;
    }

    const points: [number, number][] = [];
    for (let i = 0; i < n; i++) {
      const xi = parseFloat(
        (document.getElementById(`x${i}`) as HTMLInputElement).value
      );
      const yi = parseFloat(
        (document.getElementById(`y${i}`) as HTMLInputElement).value
      );
      if (isNaN(xi) || isNaN(yi)) {
        alert("Invalid value of x or y. Please enter a number.");
        return;
      }
      points.push([xi, yi]);
    }

    const res = NewtonInterpolation(points, n, x);
    setResult(res);
  };

  // Handle form submission for fetching stock values
  const handleStockSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const n = parseInt(nStockPoints.toString());
    const x = parseFloat(stockXVal.toString());

    const points: [number, number][] = stockValues
      .slice(0, n)
      .map((value, index) => [index, value]); // map values to points
    const res = NewtonInterpolation(points, n, x);

    setStockResult(res);
  };

  return (
    <div>
      <div className="heading">
        <h1>Machine Problem 3: Group 2</h1>
      </div>
      <div className="container">
        <div className="part1">
          <h1 style={{ textAlign: "center" }}>Newton Interpolation</h1>
          <form onSubmit={handleSubmit}>
            <div className="input2">
              <label htmlFor="nPoints">Enter number of points (n): </label>
              <input
                type="number"
                id="nPoints"
                value={nPoints}
                onChange={(event) => setNPoints(parseInt(event.target.value))}
              />
            </div>
            {nPoints && nPoints > 0
              ? [...Array(nPoints)].map((_, i) => (
                  <div key={i} className="input1">
                    <label htmlFor={`x${i}`}>x{i}:</label>
                    <input
                      type="number"
                      id={`x${i}`}
                      onChange={(event) => {
                        const points = [...newPoints];
                        points[i] = [
                          parseFloat(event.target.value),
                          points[i][1],
                        ];
                        setNewPoints(points);
                      }}
                    />
                    <label htmlFor={`y${i}`}>y{i}:</label>
                    <input
                      type="number"
                      id={`y${i}`}
                      onChange={(event) => {
                        const points = [...newPoints];
                        points[i] = [
                          points[i][0],
                          parseFloat(event.target.value),
                        ];
                        setNewPoints(points);
                      }}
                    />
                  </div>
                ))
              : null}
            <div className="input3">
              <label htmlFor="xVal">Enter x value: </label>
              <input
                type="number"
                id="xVal"
                value={xVal}
                onChange={(event) => setXVal(parseFloat(event.target.value))}
              />
            </div>
            <button type="submit">Calculate</button>
          </form>
          {result && (
            <div className="result-container">
              <p>
                <b>Pn(x)={result}</b>
              </p>
            </div>
          )}
          {stockResult && (
            <div className="result-container">
              <p>
                <b>
                  Stock value at x = {stockXVal}: {stockResult}
                </b>
              </p>
            </div>
          )}
        </div>
        <div className="part2">
          <h1>Stock Values</h1>
          <form onSubmit={handleStockSubmit}>
            <div className="input4">
              <label htmlFor="nStockPoints">
                Enter number of stock values (n):{" "}
              </label>
              <input
                type="number"
                id="nStockPoints"
                value={nStockPoints}
                onChange={(event) =>
                  setNStockPoints(parseInt(event.target.value))
                }
              />
            </div>
            <div className="input5">
              <label htmlFor="stockXVal">Enter stock value x: </label>
              <input
                type="number"
                id="stockXVal"
                value={stockXVal}
                onChange={(event) =>
                  setStockXVal(parseFloat(event.target.value))
                }
              />
            </div>
            <button type="submit">Fetch</button>
          </form>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Stock Value</th>
                </tr>
              </thead>
              <tbody>
                {stockValues.slice(0, nStockPoints).map((value, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
