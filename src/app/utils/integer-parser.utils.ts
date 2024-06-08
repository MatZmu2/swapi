export const parseStringToInt = (str: string): number => {
    if (str.toLowerCase() === 'n/a' || str === '') {
      return 0;
    }
  
    const cleanedStr = str.replace(/,/g, ''); 
    return parseInt(cleanedStr, 10);
};
  
export const compareStrings = (str1 = '', str2 = '') => {
    if (str1 === '' || str2 === '') {
      return -1;
    }
  
    const value1 = parseStringToInt(str1);
    const value2 = parseStringToInt(str2);
  
    if (value1 > value2) return 1;
    else if (value1 < value2) return 0;
    else return -1;
};