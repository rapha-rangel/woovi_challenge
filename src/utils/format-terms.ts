export function FormatTerms(value: number[]| undefined, index: number, total: number|undefined){
  if(total && value){
    var calc=0
    var firstNum =value[0];
    calc =(total-firstNum)/(index+1);
    console.log(total, calc, index)
    const newArr = Array(index+1).fill(calc);
    newArr.unshift(value[0]);
    console.log(newArr);
    return newArr
  }
  

}