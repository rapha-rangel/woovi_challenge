export function FormatPaymentLimitDate(){
  const date = new Date( );
  const zeroBefore=(num: number)=>{
    if(num< 10) return "0"+num
    return num
  }
  return `${zeroBefore(date.getDate()+1)}/${zeroBefore(date.getMonth())}/${date.getFullYear()} - ${zeroBefore(date.getHours())}:${zeroBefore(date.getMinutes())}`
}