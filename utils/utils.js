export const select = (e) => document.querySelector(e);
export const selectAll = (e) => document.querySelectorAll(e);
export const selectFrom = (e, el) => el.querySelector(e);
export const selectAllFrom = (e, el) => el.querySelectorAll(e);
export const getPlaceValue = (numberString, place) => {
  const reversedNumber = numberString.split("").reverse().join("");
  const placeValue = reversedNumber[place - 1];
  return parseInt(placeValue, 10);
};
export const resetInlineStyles = (elements) => {
  elements.forEach((selector) => {
    selectAll(selector).forEach((el) => (el.style.transform = ""));
  });
};
export const lerp = (start, stop, amount) => (stop - start) * amount;
export const isEven = (number) => number % 2 === 0;
export const getBounding = (el) => el.getBoundingClientRect();
export const elementHasWidth = (el) => el.clientWidth > 1;
