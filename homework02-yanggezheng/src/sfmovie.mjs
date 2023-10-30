// sfmovie.js

export const longestFunFact = function(data){
    return data.reduce((max, obj) =>{
        if (obj["Fun Facts"] === undefined || obj["Fun Facts"] === null){
            return max;
        }else if (obj["Fun Facts"].length > max["Fun Facts"].length){
            max = obj;
        }
        return max;
    }, {"Fun Facts": ""});
};

export const getMovies2021 = function(data){
    return data.reduce((uniqueName, obj) =>{
        if (obj["Release Year"] === '2021'){
            if (!uniqueName.includes(obj["Title"])){
                if (obj["Title"] !== undefined && obj["Title"] !== null && obj["Title"] !== ""){
                    uniqueName.push(obj["Title"]);
                }
            }
        }
        return uniqueName;
    }, []);
};

export const getProductionCompany = function(data){
    return data.reduce((uniqueName, obj) =>{
        if (!uniqueName.includes(obj["Production Company"])){
            if (obj["Production Company"] !== undefined && obj["Production Company"] !== null && obj["Production Company"] !== ""){
                uniqueName.push(obj["Production Company"]);
            }
        }
        return uniqueName;
    }, []);
};

export const mostPopularActors = function(data){
    const nameArr = data.reduce((uniqueName, obj) =>{
        if (!uniqueName.includes(obj["Actor 1"])){
            if (obj["Actor 1"] !== undefined && obj["Actor 1"] !== null && obj["Actor 1"] !== ""){
                uniqueName.push(obj["Actor 1"]);
            }
        }else if (!uniqueName.includes(obj["Actor 2"])){
            if (obj["Actor 2"] !== undefined && obj["Actor 2"] !== null && obj["Actor 2"] !== ""){
                uniqueName.push(obj["Actor 2"]);
            }
        }else if (!uniqueName.includes(obj["Actor 3"])){
            if (obj["Actor 3"] !== undefined && obj["Actor 3"] !== null && obj["Actor 3"] !== ""){
                uniqueName.push(obj["Actor 3"]);
            }
        }
        return uniqueName;
    }, []);
    const countArr = [];
    for (let i = 0; i < nameArr.length; i++){
        const count = data.reduce((num, obj) =>{
            if (nameArr[i] === obj["Actor 1"]){
                num++;
            }else if (nameArr[i] === obj["Actor 2"]){
                num++;
            }else if (nameArr[i] === obj["Actor 3"]){
                num++;
            }
            return num;
        }, 0);
        countArr.push(count);
    }
    
    const returnArr = [];
    for (let i = 0; i < 3; i++){
        const countNum = Math.max(...countArr);
        const index = countArr.indexOf(countNum);
        const actorName = nameArr[index];
        countArr.splice(index, 1);
        nameArr.splice(index, 1);
        returnArr.push({actorName, countNum});
    }
    return returnArr;
};