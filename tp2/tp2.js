function tirerPenalty() {
  return Math.random() < 0.8 ? 1 : 0;
}

function isRecoverable(history) {
  const ecartDePoints = Math.abs(
    history[history.length - 1][0] - history[history.length - 1][1]
  );
  return ecartDePoints <= 5 - history.length;
}

function isEnd(history) {
  return (
    history.length === 5 &&
    history[history.length - 1][0] !== history[history.length - 1][1]
  );
}

function getWinner(history) {
  return history[history.length - 1][0] > history[history.length - 1][1]
    ? 1
    : 2;
}

function isEmptyHistory(history) {
  return history.length === 0 ? true : false;
}

function seancePenalty() {
  let history = [];

  while (history.length === 0 || (isRecoverable(history) && !isEnd(history))) {
    history[history.length] = [
      isEmptyHistory(history)
        ? 0
        : history[history.length - 1][0] + tirerPenalty(),
      isEmptyHistory(history)
        ? 0
        : history[history.length - 1][1] + tirerPenalty(),
    ];

    console.log(history);
  }

  console.log(`Equipe ${getWinner(history)} won !`);
  console.log(`Scores : ${history[history.length - 1]}`);
  console.log(`Tirs restants : ${5 - history.length}`);
}

seancePenalty();
