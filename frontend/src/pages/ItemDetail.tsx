import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemDetails, placeBid } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Item {
  id: string;
  title: string;
  description: string;
  starting_bid: number;
}

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const data = await fetchItemDetails(id);
          setItem(data);
        } catch (error) {
          console.error('Error fetching item details', error);
        }
      }
    };
    fetchData();
  }, [id]);

  const handleBid = async () => {
    if (id) {
      try {
        await placeBid(id, amount);
        alert('Bid placed successfully');
      } catch (error) {
        console.error('Error placing bid', error);
      }
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <p>Starting Bid: {item.starting_bid}</p>
      {isAuthenticated ? (
        <>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter your bid"
          />
          <button onClick={handleBid}>Place Bid</button>
        </>
      ) : (
        <p>Please login to place a bid.</p>
      )}
    </div>
  );
};

export default ItemDetail;
