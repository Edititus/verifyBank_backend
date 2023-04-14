import { get } from "fast-levenshtein";

export const compare = (userInput: string, account_name: string) => {
    let number = get(userInput, account_name)
  if (number <= 2) {
    return true;
  }
    return false
};
