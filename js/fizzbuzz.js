'use strict';
{
  const inputNum = document.getElementById('form-fizzbuzz');

  inputNum.addEventListener('submit',(e)=> {
    e.preventDefault();
    const inputNum = document.getElementById('input-fizzbuzz').value;
    const fizzbuzzAns = document.getElementById('fizzbuzz-ans')
    
    if(inputNum % 15 === 0){
      console.log('FizzBuzz');
      // const createAns = document.createElement('')
      fizzbuzzAns.textContent = "FizzBuzz";

    }else if(inputNum % 5 === 0){
      console.log('Buzz');
      fizzbuzzAns.textContent = "Buzz";

    }else if(inputNum % 3 === 0){
      console.log('Fizz');
      fizzbuzzAns.textContent = "Fizz";

    }else{
      console.log(inputNum);
      fizzbuzzAns.textContent = "どちらでもないです";

    }
  })

}