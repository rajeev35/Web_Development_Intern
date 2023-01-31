document.getElementById('f').onclick = setCelsiusReadOnly;
document.getElementById('c').onclick = setFaReadOnly;

function setCelsiusReadOnly(){ 
  // remove value from Fa 
  document.getElementById('c').value = ''; 
}

function setFaReadOnly(){ 
  // remove value from Fa 
  document.getElementById('f').value = ''; 
}


document.getElementById('convert').onclick = convert;
function convert(){
  var C = document.getElementById('c').value;
  var F = document.getElementById('f').value;
  
  
  if(C){
    // convert F to C
    var Fa = 9/5 * C + 32; 
    // set value of celcius input to C. 
    document.getElementById('f').value = Fa;  
  } else {
    // convert to Fa.
     // convert F to C
    var Ce = (F - 32) * 5/9;  
    // set value of celcius input to C. 
    document.getElementById('c').value = Ce;  

  }
  
  
} 