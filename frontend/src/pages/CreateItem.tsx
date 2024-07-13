import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CreateItem: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startingBid, setStartingBid] = useState<number>(0);
  const [bidIncrement, setBidIncrement] = useState<number>(0);
  const [auctionStart, setAuctionStart] = useState<string>('');
  const [auctionEnd, setAuctionEnd] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const {isAuthenticated} = useAuth();
  const user = localStorage.getItem('token')
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('starting_bid', startingBid.toString());
    formData.append('bid_increment', bidIncrement.toString());
    formData.append('auction_start', auctionStart);
    formData.append('auction_end', auctionEnd);
    if(user){
      formData.append('user_id', user);
    }
    if (image) {
      formData.append('image', image);
    }
    console.log(formData);
    try {
      await createItem(formData);
      navigate('/'); // Redirect to the home page after item creation
    } catch (error) {
      console.error('Failed to create item', error);
    }
  };

  // Form validation functions
  const isFutureDate = (dateString: string) => {
    const currentTime = new Date().getDate().toLocaleString();
    return auctionStart > currentTime
  };

  const isValidBidAmount = (amount: number) => {
    return amount >= 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFutureDate(auctionStart)) {
      alert('Auction start date must be in the future.');
      return;
    }

    if (!isFutureDate(auctionEnd)) {
      alert('Auction end date must be in the future.');
      return;
    }

    if (auctionStart >= auctionEnd) {
      alert('Auction end date must be after auction start date.');
      return;
    }

    if (!isValidBidAmount(startingBid)) {
      alert('Starting bid must be a positive number.');
      return;
    }

    if (!isValidBidAmount(bidIncrement)) {
      alert('Bid increment must be a positive number.');
      return;
    }

    handleCreate(e);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  if(!isAuthenticated){
    return(
      <div className="my-10 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 flex rounded shadow-md w-full max-w-sm">
          <p>You Need to Login First to create Listing</p>
          <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={()=>navigate('/login')}>
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full my-10 bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Create Item</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Starting Bid</label>
          <input
            type="number"
            value={startingBid}
            onChange={(e) => setStartingBid(Number(e.target.value))}
            placeholder="Starting Bid"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bid Increment</label>
          <input
            type="number"
            value={bidIncrement}
            onChange={(e) => setBidIncrement(Number(e.target.value))}
            placeholder="Bid Increment"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Auction Start</label>
          <input
            type="datetime-local"
            value={auctionStart}
            onChange={(e) => setAuctionStart(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Auction End</label>
          <input
            type="datetime-local"
            value={auctionEnd}
            onChange={(e) => setAuctionEnd(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Item
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
