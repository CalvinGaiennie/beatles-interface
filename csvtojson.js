import csvtojson from "csvtojson";
import { writeFileSync } from "fs";

csvtojson()
  .fromFile("public/The Beatles songs dataset, v1, no NAs.csv")
  .then((jsonObj) => {
    jsonObj.forEach((obj) => delete obj.Top);
    writeFileSync("public/beatles.json", JSON.stringify(jsonObj, null, 2));
  })
  .catch((error) => {
    console.error("Error converting CSV to JSON:", error);
  });
