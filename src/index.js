module.exports = function check(str, bracketsConfig) {
  function isOpeningBracket (bracket = '', bracketsConfig = []) {
  for (let i = 0; i < bracketsConfig.length; i++) {
    if(bracketsConfig[i][0] === bracket){
      return true;
    } else if(bracketsConfig[i][1] === bracket) {
       return false;
    } 
  }
  return 'is not allowed bracket';
}

function isClosingBracket(bracket = '', bracketsConfig = []) {
  for (let i = 0; i < bracketsConfig.length; i++) {
    if(bracketsConfig[i][1] === bracket){
      return true;
    } else if(bracketsConfig[i][0] === bracket) {
       return false;
    } 
  }
  return 'is not allowed bracket';
}

function getClosingBracket (openingBracket, bracketsConfig ) {
  for (let i = 0; i < bracketsConfig.length; i++) {
    if(bracketsConfig[i][0] === bracket) return bracketsConfig[i][1];
  }
    return -1
}

function getOpeningBracket (closingBracket, bracketsConfig ) {
  for (let i = 0; i < bracketsConfig.length; i++) {
    if(bracketsConfig[i][1] === closingBracket) return bracketsConfig[i][0];
  }
    return false;
}

function findFirstClosingBracket (brackets, bracketsConfig) {  
  for (let i = 0; i < brackets.length; i++) {
    if(isClosingBracket(brackets[i], bracketsConfig)) {
      let openingBracket = getOpeningBracket (brackets[i], bracketsConfig )

      if (openingBracket === brackets[i] ){
        let closingEquallyposition = brackets.indexOf(openingBracket, i+1);
        let subBrackes = brackets.slice(i+1,closingEquallyposition);
        if(subBrackes !== '')  {
           findFirstClosingBracket (subBrackes, bracketsConfig);
        } else {
          return closingEquallyposition;
        }     
         continue;
      } ;
      return i;
    }                
  }
  return -1;
}

function findRelatedOpeningBracketPosition (subBrackets, openingBracket, bracketsConfig ) {     
  let position = subBrackets.lastIndexOf(openingBracket);
  return position;
}

function validateType (bracketsString, bracketsConfig) {
  for(let i = 0; i < bracketsString.length; i++) {
    if (isOpeningBracket(bracketsString[i],bracketsConfig) === 'is not allowed bracket') return false;
  }
}

function checkBracketRecursive (brackets, bracketsConfig) {
  
  while (brackets.length !== 0) {

    if((brackets.length & 1)) return false;    
    if(!isOpeningBracket(brackets[0], bracketsConfig)) return false;//throw new Error ('An closing bracket can not be opening!');
    let firstClosingBracketPosition =  findFirstClosingBracket(brackets, bracketsConfig);
    if(firstClosingBracketPosition === -1) return false;
    let firstClosingBracket = brackets[firstClosingBracketPosition];
    let firstRelatedOpeningBracket = getOpeningBracket(firstClosingBracket, bracketsConfig);      
    let firstRelatedOpeningBracketPosition = firstClosingBracketPosition-1; 
    if(brackets[firstRelatedOpeningBracketPosition] !== firstRelatedOpeningBracket) return false;
    brackets = brackets.slice(0,firstRelatedOpeningBracketPosition) +  brackets.slice(firstClosingBracketPosition+1);  
  }
  return true
}

if(str.length & 1)  return false;//throw new Error ('The openning brackets number do not equal the closing number!');
if(validateType(str, bracketsConfig)) return false;
return checkBracketRecursive (str, bracketsConfig);

}

