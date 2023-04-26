export default function Ship(len) {
  let length = len;
  let numberOfHit = 0;

  const hit = () => numberOfHit++;
  const isSunk = () => numberOfHit >= length;

  return {
    hit,
    isSunk
  };
}