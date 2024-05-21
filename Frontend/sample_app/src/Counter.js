import { useState, useEffect } from 'react';
 
function Sample(props) {
  const [counter, setCounter] = useState(0);
  const [total, setTotal] = useState(counter);
 
  const doit = ()=>{
    setCounter(counter + 1);
  }
 
  useEffect(()=> {
    let n = 0;
    for (let i = 1;i <= counter;i++) {
      n += i;
    }
    setTotal(n);
  })
 
  return (
    <div className="alert alert-info">
      <h2>Counter</h2>
      <p>Number: {counter}. Total: {total}.</p>
      <button className="btn btn-info"
        onClick={doit}>click
      </button>
    </div>
  );
}
 
export default Sample;
