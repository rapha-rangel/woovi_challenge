export function FormatMoney(money:number){
  return (Math.round(money* 100) / 100).toLocaleString('pt-br', {minimumFractionDigits: 2});
}