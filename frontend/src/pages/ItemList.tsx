import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchItems } from '../services/api';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchItems();
      setItems(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item: any) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Link to={`/items/${item.id}`} className="block p-4 hover:bg-gray-100">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-gray-600">{item.description}</p>
              <p className="mt-2 text-gray-800 font-bold">Starting Bid: ${item.starting_bid}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
