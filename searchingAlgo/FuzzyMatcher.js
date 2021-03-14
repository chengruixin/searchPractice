// const {getShingles} = require("./Computer");
// const {getCosDistance, getLvstnDistance} = require("./DistanceCalculator");
const DistanceCalculator = require("./DistanceCalculator");

class FuzzyMatcher extends DistanceCalculator {

    static #instance = new FuzzyMatcher();
    static getInstance = () => this.#instance;

    /**
     * 
     * @param {String[]} haystacks 
     * @param {String} pattern
     * @return {Object} {
     *      String : "str1xxxx",
     *      Similarity : 0 - 100
     * } 
     */
    
    produceSimilarItems(haystacks, pattern, extraParams = {}){
        const {isCaseSensitive, toUseSecond} = extraParams;
        const similarItems = [];
        
        
        if(!isCaseSensitive) pattern = pattern.toLowerCase();

        for(let i = 0; i < haystacks.length; i++){
            
            const haystack = isCaseSensitive && isCaseSensitive === true 
                ? haystacks[i] 
                : haystacks[i].toLowerCase();

            const sim = this.getSimilarity(haystack, pattern);

            similarItems.push({
                string : haystacks[i],//needs to be original string
                similarity : sim
            })
        }
        similarItems.sort((obj1, obj2) => obj2.similarity - obj1.similarity);// decreasing order
        return similarItems;
    }

   
    getSimilarity(string1, string2){
        const shingleLenth = 2;
        const cosSimWeight = 50;
        let cosSim = this.getCosDistance( this.getShingles(string1, shingleLenth) , this.getShingles(string2, shingleLenth));
        let lvstnSim = 1 - this.getLvstnDistance(string1, string2) / (Math.max(string1.length, string2.length));

        return cosSim * cosSimWeight + lvstnSim * (100 - cosSimWeight);
    }

    getSimilarity2(string1, string2){
        
        const shingles = this.getShingles(string1, string2.length);

        let samllest = Number.MAX_SAFE_INTEGER;
        for(let i = 0; i < shingles.length; i++){
            let tempMin = this.getLvstnDistance(shingles[i], string2);
            samllest = Math.min(tempMin, samllest);
            
        }

        return samllest;
    }
}

const produceSimilarItems = function(...arguments){
    
    const matcher = FuzzyMatcher.getInstance();

    return matcher.produceSimilarItems(...arguments);
}

module.exports = produceSimilarItems;