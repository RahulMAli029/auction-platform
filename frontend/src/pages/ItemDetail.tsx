import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemDetails, placeBid } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Item {
  id: string;
  title: string;
  description: string;
  starting_bid: number;
  image:string;
  auction_start:string;
  auction_end:string;
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

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

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
    <div className="flex items-center justify-center my-40 bg-gray-100">
    <div className="max-w-7xl w-full bg-white shadow-md p-8 flex flex-col lg:flex-row">
      <div className="lg:w-1/2 pr-8">
        <img src={item.image} alt={item.title} className="w-full h-auto rounded-lg" />
      </div>
      <div className="lg:w-1/2 mt-6 lg:mt-0">
        <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
        <p className="text-gray-700 mb-4">{item.description}</p>
        <p className="text-gray-600">Starting Bid: ${item.starting_bid}</p>
        <p className="text-gray-600">Bid Start Date: {formatDate(item.auction_start)}</p>
        <p className="text-gray-600">Bid End Date: {formatDate(item.auction_end)}</p>
        {isAuthenticated ? (
          <div className="mt-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter your bid"
              className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button onClick={handleBid} className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
              Place Bid
            </button>
          </div>
        ) : (
          <a href='/login'>
            <p className="mt-4 semi-bold underline">Please login to place a bid.</p>
          </a>
        )}
      </div>
    </div>
  </div>
  );
};

export default ItemDetail;
