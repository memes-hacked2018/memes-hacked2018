const FILE_PATH = '/'

export default class fileFunctions {

    // file name = 'topicName' + 'IDs.txt'



    // read from topic file
    //      return array of IDs
    static readFile = ( topicName) => {
        const fName = topicName + 'IDs.txt';
        var fs = require('fs');
   
        return  fs.readFileSync(FILE_PATH + fName).split('\n');
       
        
    }


    // write to topic file
    //      takes in an array
    static writeFile = ( topicName, itemArr) => {
        const fName = topicName = 'IDs.txt';

        const outpt = itemArr.join('\n');

        var fs = require('fs');
        fs.writeFileSync(FILE_PATH + fName, outpt); 


    }


}