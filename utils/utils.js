export const select = (e) => document.querySelector(e);
export const selectAll = (e) => document.querySelector(e);
export const getPlaceValue = (numberString, place) => {
    const reversedNumber = numberString.split('').reverse().join('');
    const placeValue = reversedNumber[place - 1];
    return parseInt(placeValue, 10);
}
