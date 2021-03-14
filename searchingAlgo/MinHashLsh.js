const {getShingles, getVectors, getRandomArray} = require("./Computer");

const haystacks = [
    "I went to hospital yesterday",
    "Today is a good day to die",
    "I am about to the town, would you come?",
    "Am I talking like that?",
    "I went to the old town about three years ago?",
    "Thinking helps clean your head",
    "We actually are doing a similarity test",
    "See how algo of this could find similar items",
    "So now, I am gonna create small relatively similar items",
    "To see how good this algo could be",
    "This is a sentence ended with a dog",
    "This is a sentence ended with a cat",
    "This is not a similar sentence comparing to former two",
    "A cat is eating a dog at the end of this sentence",
    "Dog went to hospital by the cat",
    "Done"
]

// const haystacks = [
   
//     "This is a sentence ended with a dog",
//     "This is a sentence ended with a cat",
//     "This is not a similar sentence comparing to former two",
//     "a tas is a sentence ended with this a god"
// ]

/**
 * 
 * @param {Vector[]} matrix 
 */
function minHashing(matrix, signatureLength){
    let permutations = new Array(signatureLength);//length of signature eventually
    const permutationLength = matrix[0].length;// single permutation length

    /**
     *  produce n = signatureLength permutations
     */
    for(let i = 0; i < permutations.length; i++){
        permutations[i] = getRandomArray(permutationLength);
    }

    /**
     * Min-hashing
     */

    //Intialize signatures
    let signatures = new Array(matrix.length);
    for(let i = 0; i < signatures.length; i++){
        signatures[i] = new Array(permutations.length).fill(0);
    }

    for(let i = 0; i < permutations.length; i++){
        let result = new Array(matrix.length).fill(Number.MAX_VALUE);
        for(let j = 0; j < permutations[i].length; j++){
            let curVal = permutations[i][j];
            for(let k = 0; k < matrix.length; k++){
                if(matrix[k][j] === 0) continue;
                if(result[k] > curVal) {
                    result[k] = curVal;
                    signatures[k][i] = curVal;
                }
            }
        }
    }

    return signatures;
}

/**
 * 
 * @param {Number[][]} signatures 
 * @param {Number} bands 
 * @param {Number} rows 
 * @return {Map} returns the bucket that contains the candidates that might be similar
 */
function localitySensitiveHashing(signatures, bands, rows){
    const buckets = new Map();

    for(let i = 0; i < signatures.length; i++){
        for(let b = 0; b < bands; b++){
            let key = '';
            for(let r = 0; r < rows; r++){
                if(r != rows - 1) {
                    key += signatures[i][b * rows + r] + '#';
                }
                else {
                    key += signatures[i][b * rows + r];
                }
            }

            if(!buckets.has(key)){
                buckets.set(key, [i]);
            }
            else{
                let val = buckets.get(key);
                val.push(i);
                buckets.set(key, val);
            }
        }
    }

    return buckets;
}

/**
 * 
 * findSimilarItems will use 3-step to compute similar items
 * 1. Shingling
 * 2. Min-hash
 * 3. Locality-sensitive hash
 * Finally, results will be buckets that have indexs of candidates that might be similar
 * 
 * @param {Array[]} haystacks 
 * @param {Number} shingleLength 
 * @param {b val} bands 
 * @param {r val} rows 
 */
function findSimilarItems(haystacks, shingleLength, bands, rows){
    if(!haystacks || !shingleLength || !bands || !rows) {
        throw new Error("All params must not be empty");
    }
    const signatureLength = bands * rows;
    /**
     * 1. Shingling haystacks
     */
    const shinglesArray = new Array(haystacks.length);
    for(let i = 0; i < shinglesArray.length ; i++){
        shinglesArray[i] = getShingles(haystacks[i], shingleLength);
    }

    /**
     * 1.1 Compressing shingles to vectors
     */
    const shingleVectors = getVectors(shinglesArray);//the matrix that has vectors that represent shingles

    /**
     * 2. Min-Hashing
     */
    //min-hash the set of vectors
    const signatureMatrix = minHashing(shingleVectors, signatureLength);

    /**
     * 3. Locality-senstive hashing
     * 
     */
    const buckets = localitySensitiveHashing(signatureMatrix, bands, rows);

    return buckets;
}

function findReapeated(buckets){
    const set = new Set();

    for(let value of buckets.values()){
        if(value.length <= 1) continue;
        const excludeReapteded = new Set(value);
        set.add([...excludeReapteded].join(","));
    }

    return [...set];
}
module.exports = {
    findSimilarItems,
    findReapeated
}
// void function main(){
//     const shingleLength = 5;
//     const bands = 10;
//     const rows = 5;
    
//     const buckets = findSimilarItems(haystacks, shingleLength, bands, rows);
//     console.log(buckets);
// }() 



// void function test(){
//     const matrix = [
//         [1,1,0,0,0,1,1],
//         [0,0,1,1,1,0,0],
//         [1,0,0,0,0,1,1],
//         [0,1,1,1,1,0,0]
//     ]
    
//     const signatures = minHashing(matrix, 3);
//     console.log(signatures);
// }()