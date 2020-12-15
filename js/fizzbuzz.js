'use strict';
{
  const inputNum = document.getElementById('form-fizzbuzz');

  inputNum.addEventListener('submit',(e)=> {
    e.preventDefault();
    const inputNum = document.getElementById('input-fizzbuzz').value;
    
    if(inputNum % 15 === 0){
      console.log('FizzBuzz');
    }else if(inputNum % 5 === 0){
      console.log('Buzz');
    }else if(inputNum % 3 === 0){
      console.log('Fizz');
    }else{
      console.log(inputNum);
    }
  })

}