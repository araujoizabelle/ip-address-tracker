import { useState } from 'react';
import './InputSearch.css'


export const InputSearch: React.FC<any>= ({ onSearch }) => {
    const [value, setValue] = useState('');

  return (
    <div className='container-search'>
        <h1 className='title'>IP Address Tracker</h1>
        <input type='text' 
            placeholder='Search for any IP address or domain' 
            value={value} 
            onChange={(e) => {setValue(e.target.value)}}/>
        <button onClick={onSearch}> 
            <img src='src/assets/images/icon-arrow.svg'/> 
        </button>
    </div>
  )
}
