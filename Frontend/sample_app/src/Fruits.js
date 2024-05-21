import React, { useState, useEffect } from 'react';
import './Fruits.css';

function Fruits() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("call useEffect START");
    fetch('http://localhost:8080/fruits')
      .then(response => response.json())
      .then(value => {
        console.log(value);
        setData(value);
      })
      .catch(error => {
        console.log(error);
        setData([]);
      });

    console.log("call useEffect END");
    return () => {};
  }, []);

  const fetchFruitData = () => {
    fetch('http://localhost:8080/fruits')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching fruit data:', error);
        setData([]);
      });
  };

  const addStock = (formData) => {
    fetch('http://localhost:8080/fruits/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          return fetchFruitData();
        } else {
          console.error('Failed to add stock');
        }
      })
      .catch(error => {
        console.error('Error adding stock:', error);
      });
  };

  const deleteFruit = (fruit) => {
    fetch('http://localhost:8080/fruits/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fruit)
    })
      .then(response => {
        if (response.ok) {
          return fetchFruitData();
        } else {
          console.error('Failed to delete fruit');
        }
      })
      .catch(error => {
        console.error('Error deleting fruit:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newStock = {
      name: formData.get('name'),
      price: parseInt(formData.get('price')),
      stock: parseInt(formData.get('stock'))
    };
    addStock(newStock);
  };

  const fruitData = data && data.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.stock}</td>
        <td>
          <button onClick={() => deleteFruit(item)}>削除</button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h3>フルーツ在庫情報</h3>
      <table border="1">
        <thead>
          <tr>
            <th>商品コード</th>
            <th>商品名</th>
            <th>単価</th>
            <th>在庫数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {fruitData}
        </tbody>
      </table>
      <h3>在庫情報追加</h3>
      <form onSubmit={handleSubmit}>
        <label>
          商品名:
          <input type="text" name="name" required />
        </label>
        <label>
          単価:
          <input type="number" name="price" required />
        </label>
        <label>
          在庫数:
          <input type="number" name="stock" required />
        </label>
        <button type="submit">追加</button>
      </form>
    </div>
  );
}

export default Fruits;
