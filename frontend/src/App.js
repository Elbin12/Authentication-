import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';



function App() {

  const [data, setData] = useState([])

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await fetch('http://127.0.0.1:8000/api/');
      const data = await res.json();
      setData(data)
      console.log('data',data);
      }catch (error) {
        console.error('Error fetching data:', error);
    } 
    }
    fetchData();
  },[data])
    
  console.log(data,'data from django')

  return (
    <div className="App">
      <h2>Hello Everyone</h2>
      {
        data.map((obj, index) => (
          <h3 key={index}>{obj.name}</h3>
        ))
      }
    </div>
  );
}

export default App;
