import getAverage from "./average.js";

var scores = [76, 87, 92, 91,64]
// average
// max
// min
// sum

let avg = getAverage(scores)
console.log("Average score: "+avg);


var scoresB = [93, 87, 92]
let avg2 = getAverage(scoresB)
console.log("Average score for class B: "+avg2);
