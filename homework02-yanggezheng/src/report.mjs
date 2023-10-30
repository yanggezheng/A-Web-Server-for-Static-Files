// report.js
import fs from 'fs';
import * as hoffy from '../src/hoffy.mjs';
import * as sfmovie from '../src/sfmovie.mjs';
import * as drawing from '../src/drawing.mjs';

let obj;
fs.readFile("data/Film_Locations_in_San_Francisco.csv", 'utf8', (err, data) => { 
    const rowArr = data.split('\n');
    const header = rowArr[0].split(/,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/);
    rowArr.splice(0, 1);
    const parsedData = rowArr.reduce((parsedArr, line) =>{
        const parsedLine = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/);
        parsedArr.push(parsedLine);
        return parsedArr;
    }, []);
    const objArr = hoffy.rowsToObjects({headers: header, rows: parsedData});
    const movieList = sfmovie.getMovies2021(objArr);
    const companyList = sfmovie.getProductionCompany(objArr);
    const longObj = sfmovie.longestFunFact(objArr);
    const actorList = sfmovie.mostPopularActors(objArr);
    console.log(actorList);
    console.log(`* The movie ${longObj["Title"]} has the longest fun facts, it was filmed in ${longObj["Release Year"]}
* The movies filmed in 2021 are ${movieList.join(", ")}.
* Three of production Companies are: ${companyList.splice(0, 3).join(", ")}`);

    const root = new drawing.RootElement();
    const rect1 = new drawing.RectangleElement(0, 0, 100, actorList[0]["countNum"], 'blue');
    root.addChild(rect1);
    const rect2 = new drawing.RectangleElement(250, 0, 100, actorList[1]["countNum"], 'yellow');
    root.addChild(rect2);
    const rect3 = new drawing.RectangleElement(500, 0, 100, actorList[2]["countNum"], 'black');
    root.addChild(rect3);

    const text1 = new drawing.TextElement(0, 250, 20, 'black', actorList[0]["actorName"]);
    root.addChild(text1);
    const text2 = new drawing.TextElement(250, 250, 20, 'black', actorList[1]["actorName"]);
    root.addChild(text2);
    const text3 = new drawing.TextElement(500, 250, 20, 'black', actorList[2]["actorName"]);
    root.addChild(text3);

    console.log(root.toString());

    root.write('test.svg', () => console.log('done writing!'));

});
console.log(obj);