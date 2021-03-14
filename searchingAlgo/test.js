const produceSimilarItems = require("./FuzzyMatcher");
// console.log(produceSimilarItems);

const haystacks = ["ABC", "defsad", "123"];
const res = produceSimilarItems(haystacks, "de",{
    isCaseSensitive : true
});

console.log(res);