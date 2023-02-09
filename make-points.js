const fs = require("fs");
const LineReaderSync = require("line-reader-sync");
const output_file = "./output/points.json";

function round(val) {
  return Math.round(val * 1e6) / 1e6;
}

function readFile(path) {
  const lrs = new LineReaderSync(path);
  return lrs.toLines();
}

let files = [];
fs.readdirSync("./input").forEach(file => {
  if (file.slice(-3) === "asc") files.push(file);
});

fs.writeFileSync(output_file, "");
let fcount = 0;

files.forEach((file, i) => {
  console.log(`Reading file ${i + 1} of ${files.length}. ${file}...`);
  // const data = fs.readFileSync(`./input/${file}`, {encoding:'utf8', flag:'r'});
  // const rows = data.split("\n");
  const rows = readFile(`./input/${file}`);
  const nrows = +rows[1].slice(14);
  const xllcorner = +rows[2].slice(14);
  const yllcorner = +rows[3].slice(14);
  const cellsize = +rows[4].slice(14);
  // const nodata = +rows[5].slice(14);
  rows.slice(6, 6 + nrows).reverse().forEach((row, y) => {
    if (y % 100 === 0) console.log(`File ${i + 1} of ${files.length}. ${y} of ${rows.length - 6} lines read. ${fcount} features written...`)
    row.split(" ").forEach((col, x) => {
      let coordinates = [
        round(xllcorner + ((x + 0.5) * cellsize)),
        round(yllcorner + ((y + 0.5) * cellsize))
      ];
      let value = round(+col);
      if (value > 0 && Math.abs(coordinates[1]) <= 85.0511) {
        fcount +=1;
        let feature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates
          },
          properties: {
            value
          }
        };
        fs.appendFileSync(output_file, `${JSON.stringify(feature)}\n`);
      };
    });
  });
});