const fs = require('fs')

const readFileContent = (filePath) => {
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath, 'utf8' , (err, data) => {
            if (err) {
              reject(err);
            }
            else{
                resolve(data);
            }
          })
    })
}

const convertTextToArray = (rawText) => {
    let jsString = "const codes = [";

    const lines = rawText.split("\n");
    for(let i = 0; i < lines.length; i++ ){
        let tempStr = `"${lines[i].trim()}"`;
        if(i != lines.length -1) tempStr += ",";
        else tempStr += "];\n";

        jsString += tempStr;
    }

    jsString += "module.exports = codes;";

    return jsString;
}


const writeContentToFile = (filePath, content) => {
    return new Promise((resolve, reject)=>{
        fs.writeFile(filePath, content, err => {
            if(err){
                reject(err);
            }
            else{
                resolve('success');
            }
        })
    })
}
//services.txt
//case.10000.16.txt
readFileContent('../data/services.txt')
    .then( data => {
        const toBeWritten = convertTextToArray(data);
        // console.log(toBeWritten);
        return writeContentToFile('../data/test.js', toBeWritten);
    })
    .catch( err => console.log(err));