import { sortBy } from "lodash";

// export const maskEmail = (email: string) => {
//   const splitEmail = email?.split("@");
//   const maskedEmail =
//     splitEmail[0].replace(/.(?=.{2})/g, "*") + "@" + splitEmail[1];
//   return maskedEmail;
// };

export const maskEmail = (email: string)=> {
  var splitEmail = email.split("@")
  if (splitEmail[0].length > 7) {
    return splitEmail[0].slice(0, 7) + "...";
  } else {
    return splitEmail[0]
  }
}


export const sortDataFunc = (data: object[]) => {
  const sortedDat = sortBy(data, "total").reverse().slice(0, 20);
  return sortedDat;
};
export const sortResultFunc = (data: object[]) => {
  const sortedDat = sortBy(data, "score").reverse();
  return sortedDat;
};

export const topThreeValues = (data: object[]) => {
  const topThree = sortBy(data, "total").reverse().slice(0, 3);
  return topThree;
};

export const sortFilterPosition = (arr: object[]) => {
  //sort array in descending order
  arr.sort((a: any, b: any) => b?.total - a?.total);

  //get position of each object based on email
  return arr.map((item: any, index: number) => {
    return {
      ...item,
      position: index + 1,
    };
  });
};

export const checkPlayerId = (arr: any[], playerId: string) => {
  let isPlayed: boolean = false;
  let isPlayer: boolean = false;
  // use the filter method to create a new array of objects with matching playerIds
  const filteredArr = arr?.filter((obj) => obj?.playerId === playerId);
  // if the new array is not empty, return true
  if (filteredArr?.length > 0) {
    isPlayer = true;
    isPlayed = filteredArr[0].isPlayed;
  }
  // if the new array is empty, return false
  return { isPlayer, isPlayed };
};

export const updatePlayerScoreFunc = (
  arr: any[],
  playerId: string,
  score: number,
  isPlayed: boolean
) => {
  arr.map((item) => {
    const players = item.playersArray;
    players.map((player: any) => {
      if (player.playerId === playerId) {
        player.score = score;
        player.isPlayed = isPlayed;
      }
    });
  });
  let noOfPlayed = arr[0].playersArray.filter(
    (player: any) => player.isPlayed === true
  ).length;
  let noOfPlayers = arr[0].noOfPlayers;
  if (noOfPlayed === noOfPlayers) {
    arr[0].isClosed = true;
  }
  return arr;
};

export const getWinner = (arr: any[]) => {
  let maxScore = 0;
  let playerId = 0;

  arr.forEach((item) => {
    if (item.score > maxScore) {
      maxScore = item.score;
      playerId = item.playerId;
    }
  });
  return playerId;
};
