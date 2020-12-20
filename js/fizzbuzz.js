'use strict';
{
  const formEuclid = document.getElementById('form-euclid');

  formEuclid.addEventListener('submit',(e)=> {
    e.preventDefault();
    let euclidNum1 = parseFloat(document.getElementById('euclid1').value);
    let euclidNum2 = parseFloat(document.getElementById('euclid2').value);
    const commonEuclidAns = document.getElementById('euclid-ans');
    
    let modEuclid = 0

    while((modEuclid = euclidNum1 % euclidNum2) !== 0){

    euclidNum1 = euclidNum2;
    euclidNum2 = modEuclid;
    }
    console.log(euclidNum2);
    commonEuclidAns.textContent = euclidNum2;
  })



  const formNum = document.getElementById('form-fizzbuzz');

  formNum.addEventListener('submit',(e)=> {
    e.preventDefault();
    const inputNum = parseFloat(document.getElementById('input-fizzbuzz').value);
    const fizzbuzzAns = document.getElementById('fizzbuzz-ans');
    
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

  
  const formFermat = document.getElementById('form-fermat');
  formFermat.addEventListener('submit',(e)=> {
    e.preventDefault();
    const inputFermat = parseFloat(document.getElementById('input-fermat').value);
    const fermatAns = document.getElementById('fermat-ans');
    const pseudoprime = [341, 561, 645, 1105, 1387, 1729, 1905, 2047, 2465, 2701, 2821, 3277, 4033, 4369, 4371, 4681, 5461, 6601, 7957, 8321, 8481, 8911];

    let AA = (inputFermat - 1) ** inputFermat % inputFermat;
    console.log(AA);
    for(let i = 1; i <= inputFermat; i++){


      if(pseudoprime.includes(inputFermat)){
        fermatAns.textContent = "擬素数だよ";
        break;
      }else if((inputFermat - i) ** inputFermat % inputFermat !== (inputFermat - i)){
        fermatAns.textContent = "合成数だね";

        break;
      }else{
        fermatAns.textContent = "素数だね";
        // console.log(i);
      }

    }

  
  })
}