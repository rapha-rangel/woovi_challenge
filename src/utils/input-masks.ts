export const cpfMask =(v:string)=>{
  v=v.replace(/\D/g,"")                    
  v=v.replace(/(\d{3})(\d)/,"$1.$2")       
  v=v.replace(/(\d{3})(\d)/,"$1.$2")       
  v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") 
  return v
}

export const cardMask =(v: string)=>{
  v = v.replace(/\D/g,"");
  v = v.replace(/(\d{4})/g, "$1."); 
  v = v.replace(/\.$/, ""); 
  v = v.substring(0, 19)
  return v;
}

export const venciMask =(v: string)=>{
  v = v.replace(/\D/g,"");
  v = v.replace(/(\d{2})(\d)/, "$1/$2"); 
  v=  v.replace(/(\d{2})(\d)/,"$1")  
  return v;
}

export const cvvMask =(v: string)=>{
  v = v.replace(/\D/g,"");
  return v;
}