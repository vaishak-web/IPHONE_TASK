import {useState} from 'react';

const ProductInput = () => {
  const [enteredInput, setEnteredInput] = useState('');
  const [inputIsValid, setInputIsValid] = useState(false);
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);

  const [resultMsg, setResultMsg] = useState('');
  const [sumOfProduct, setSumOfProduct] = useState(0);
  const [perProduct, setPerProduct] = useState([]);

  const inputChangeHandler = event => {
    // input trim to ignore space
    setEnteredInput(event.target.value.trim());
  }

  const formSubmitHandler = event => {
    event.preventDefault();

    setFormIsSubmitted(true);
    setPerProduct([]);
    setSumOfProduct(0);


    // Validation start
    
    if(enteredInput.trim() === ''){
      setInputIsValid(false);
      setResultMsg('Input is empty');
      return;
    }

    // check if not numeric or length not mod of 2 (as [11,12,13] are all two digits)
    if (isNaN(enteredInput) || enteredInput.length%2 !== 0) {
      setInputIsValid(false);
      setResultMsg('Input is invalid');
      return;
    }

    setInputIsValid(true);

    // Validation end

    // Logic start

    // Create array of two digits
    let product_arr=[];
    for (let i =0; i<enteredInput.length-1; i=i+2) {
      let key = enteredInput[i]+''+enteredInput[i+1];
      if(!(key in product_arr)){
        product_arr[key] = 0;
      }
      product_arr[key]++;
    }

    // Calculate sum and per product value
    let sum = 0;
    for( var key in product_arr ) {
      // const per_product = product_arr.map((value, arr_key) => {
      let value = product_arr[key];
      let temp = 0;
      if(key === '11'){
        if(value >= 3){
          temp = value*8000;
        }else if(value === 2){
          temp = value*9000;
        }else{
          temp = value*10000;
        }
      }
  
      if(key === '12'){
        if(value >= 3){
          temp = value*18000;
        }else if(value === 2){
          temp = value*19000;
        }else{
          temp = value*20000;
        }
      }
  
      if(key === '13'){
        temp = value*30000;
      }
      sum += temp;
      const perProductLi = <p key={key}>{key+' * '+value+' = '+temp}</p>;
      setPerProduct(oldArray => [...oldArray, perProductLi]);
      setSumOfProduct(sum);

    };

    setResultMsg('Total:');
    // setSumOfProduct(sum);
    // Logic end

    //resetting the input field
    setEnteredInput('');
  }

  return (
    <>
      <form onSubmit={formSubmitHandler}>
          <input type='text' id='prod_input' onChange={inputChangeHandler} value={enteredInput} />
          <button>Submit</button>
      </form>
      {(!inputIsValid && formIsSubmitted) && <p>{resultMsg}</p>}  
      {(inputIsValid && formIsSubmitted) && <div>{perProduct}<p>{resultMsg+sumOfProduct}</p></div>}
    </>
  );
};

export default ProductInput;
