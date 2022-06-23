//? reference
//? https://bobbyhadz.com/blog/javascript-convert-milliseconds-to-minutes-and-seconds

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export default function convertMsToMinutesSeconds(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.round((milliseconds % 60000) / 1000);

  return seconds === 60
    ? `${padTo2Digits(minutes + 1)}:00`
    : `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}
