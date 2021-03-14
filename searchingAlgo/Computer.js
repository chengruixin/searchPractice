

module.exports = class Computer {

    /**
     * 
     * @param {String} str 
     * @param {Number} len
     * @return {Array} 
     */

    getShingles(str, len) {
        if(len >= str.length) return [str];
    
        const arr = [];
        for(let i = 0 ; i + len - 1 < str.length; i++){
            arr.push(str.substring(i, i + len));
            
        }
    
        return arr;
    }

    /**
     * 
     * @param {Array[][]}  
     *  
     */
    getVectors(matrix){

        const lines = new Array(matrix.length);;
        const union = new Set();
        

        for(let i = 0; i < matrix.length; i++){

            lines[i] = new Set();
            for(let j = 0; j < matrix[i].length; j++){
                //each element will be added to union
                union.add(matrix[i][j]);

                //the set representing the current line also will add this new element
                lines[i].add(matrix[i][j]);

            
            }

            
        }

        const vectorsMatrix = new Array(lines.length);
        for(let i = 0; i < lines.length ; i++){
            vectorsMatrix[i] = [];
            for(let el of union){
                if(lines[i].has(el)) vectorsMatrix[i].push(1);
                else vectorsMatrix[i].push(0);
            }
        }

        return vectorsMatrix;
    }


    getRandomArray(arrayLength){
        const arr = new Array(arrayLength);

        for(let i = 0; i < arrayLength; i++){
            arr[i] = i;
        }

        for(let i = 0; i < arrayLength; i++){
            let swapIndex = Math.floor(Math.random() * (arrayLength - i));

            //swap
            let temp = arr[i];
            arr[i] = arr[swapIndex + i];
            arr[swapIndex + i] = temp;
        }

        return arr;
    }
}

