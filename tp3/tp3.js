function generateStrings(length, currentString = "") {
  const characters = ["1", "2", "X"];
  const result = [];

  if (length === 0) {
    result.push(currentString);
  } else {
    for (const char of characters) {
      result.push(...generateStrings(length - 1, currentString + char));
    }
  }

  return result;
}

function getCoteTotalFromCombination(tableauDeCotes, combination) {
  const combinationArray = combination.split("");
  return combinationArray.reduce(
    (acc, curr, index) =>
      acc * getCoteFromMatchAndBet(tableauDeCotes[index], curr),
    1
  );
}

function getCoteFromMatchAndBet(match, bet) {
  console.log(bet);
  let betIndex;
  betIndex = bet === "1" ? 0 : bet === "X" ? 1 : 2;
  return match[betIndex];
}

function getGainFromCombination() {}

function associatedGains(combinations) {
  const indexTranslator = {
    1: 0,
    X: 1,
    2: 2,
  };
  const tableauDeCotes = [
    [2.45, 3.1, 2.8],
    [1.8, 3.4, 4.2],
    [2.2, 3.0, 3.5],
  ];

  let potentialCombinationGains = [];

  combinations.forEach((combination, index) => {
    potentialCombinationGains = [
      {
        key: combination,
        gain: getCoteTotalFromCombination(tableauDeCotes, combination),
      },
      ...potentialCombinationGains,
    ];
  });

  console.log(potentialCombinationGains);
}

let allCombinatedBets = generateStrings(3);
associatedGains(allCombinatedBets);
