import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [pages, setPages] = useState([])
  const [limit, setLimin] = useState(3)
  const [curentPage, setCurentPage] = useState(1)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/page?limit=${limit}&page=${curentPage}`)
      .then(res => res.json())
      .then(data => {
        setPages(data?.pages)
        setData(data?.data)
      })
  }, [limit, curentPage])


  const handleChange = e => {
    setLimin(parseInt(e.target.value))
  }

  const handleClick = page => {
    setCurentPage(page)
  }


  return <>

    <select onChange={handleChange}>
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="10">10</option>
    </select>

    {
      pages && pages.map((e, i) => (
        <button onClick={() => handleClick(e)} key={i}>{e}</button>
      ))
    }

    <ul>
      {
        data && data.map((e) => (
          <li>
            {console.log(e.book_name)}
            <h3>{e.book_name}</h3>
            <p>{e.book_price}</p>
          </li>
        ))
      }
    </ul>
  </>
}

export default App;
