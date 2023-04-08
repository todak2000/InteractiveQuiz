import {sortBy} from 'lodash'

export const maskEmail = (email: string)=> {
    const splitEmail = email.split('@');
    const maskedEmail = splitEmail[0].replace(/.(?=.{2})/g, '*') + '@' + splitEmail[1];
    return maskedEmail;
  }
  
export  const sortDataFunc = (data: object[]) => {
    const sortedDat = sortBy(data, 'total').reverse().slice(0, 20);
    return sortedDat
}

export const topThreeValues =(data: object[])=>{ 
    const topThree = sortBy(data, 'total').reverse().slice(0, 3);
    return topThree
}

export const sortFilterPosition = (arr: object[]) => {
    //sort array in descending order
    arr.sort((a: any,b: any) => b?.total - a?.total);

    //get position of each object based on email
    return arr.map((item:any, index: number) => {
    
        return {
            ...item,
            position: index+1
        }
    });
}

export const checkPlayerId = (arr: any[], playerId:string) => {
    let isPlayed: boolean = false;
    let isPlayer:boolean = false;
    // use the filter method to create a new array of objects with matching playerIds
    const filteredArr = arr?.filter((obj) => obj?.playerId === playerId);
    // if the new array is not empty, return true
    if (filteredArr?.length > 0) {
      isPlayer =  true;
      isPlayed = filteredArr[0].isPlayed;
    }
    // if the new array is empty, return false
    return {isPlayer, isPlayed};
  };