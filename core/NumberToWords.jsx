import React from "react";

const NumberToWords = (number) => {
  const wholePart = Math.floor(number);
  const decimal = Math.round((number - wholePart) * 100);
  const digits_length = wholePart.toString().length;
  let i = 0;
  const str = [];
  const words = {
    0: "",
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
    10: "Ten",
    11: "Eleven",
    12: "Twelve",
    13: "Thirteen",
    14: "Fourteen",
    15: "Fifteen",
    16: "Sixteen",
    17: "Seventeen",
    18: "Eighteen",
    19: "Nineteen",
    20: "Twenty",
    30: "Thirty",
    40: "Forty",
    50: "Fifty",
    60: "Sixty",
    70: "Seventy",
    80: "Eighty",
    90: "Ninety",
    // ... rest of the words ...
  };
  const digits = ["", "Hundred", "Thousand", "Lakh", "Crore"];

  let no = wholePart; // Copy the wholePart to a variable that can be modified

  while (i < digits_length) {
    const divider = i === 2 ? 10 : 100;
    const currentNumber = Math.floor(no % divider);
    no = Math.floor(no / divider);
    i += divider === 10 ? 1 : 2;

    if (currentNumber) {
      const counter = str.length;
      const plural = counter && currentNumber > 9 ? "s" : null;

      if (currentNumber < 21) {
        str.push(words[currentNumber] + " " + digits[counter] + plural);
      } else {
        str.push(
          words[Math.floor(currentNumber / 10) * 10] +
            " " +
            words[currentNumber % 10] +
            " " +
            digits[counter] +
            plural
        );
      }
    } else {
      str.push(null);
    }
  }

  const Rupees = str.reverse().join(" ");
  const ansu = decimal
    ? "and " +
      words[decimal - (decimal % 10)] +
      " " +
      words[decimal % 10] +
      " ansu"
    : "";

  return (Rupees ? "" + Rupees : "") + ansu + " takka";
};

const AmountInWords = ({ amount }) => {
  const amountWords = NumberToWords(amount);

  return (
    <div>
      <b>{amountWords}</b>
    </div>
  );
};

export default AmountInWords;
