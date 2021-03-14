const haystacks = require("./../data/test");
const {findSimilarItems, findReapeated} = require("./MinHashLsh");
const {getSimilarity} = require("./FuzzyMatcher");

const shingleLength = 3;
const bands = 10;
const rows = 3;
console.time("a");
const buckets = findSimilarItems(haystacks, shingleLength, bands , rows);

const reapeated = findReapeated(buckets);

for(let i = 0; i < reapeated.length ; i++){
    let arr = reapeated[i].split(",");
    console.log("print similar items:")
    for(let j = 0; j < arr.length; j++){
        console.log(haystacks[arr[Number(j)]]);
    }
    console.log("\n");
}
console.timeEnd("a");