import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchItems } from '../services/api';

interface Item {
  id: string;
  title: string;
  description: string;
  starting_bid: number;
  image: string;
  auction_start: string;
  auction_end: string;
}

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRangeFilter, setPriceRangeFilter] = useState({ min: '', max: '' });
  const [auctionEndTimeFilter, setAuctionEndTimeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchItems();
      setItems(data);
      setFilteredItems(data); // Initially set both items and filteredItems to all items
    };
    fetchData();
  }, []);

  // Apply filters and search when any of the filter states change
  useEffect(() => {
    const applyFiltersAndSearch = () => {
      let filtered = [...items];

      // Filter by title search term
      if (searchTerm.trim() !== '') {
        filtered = filtered.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by price range
      if (priceRangeFilter.min && priceRangeFilter.max) {
        filtered = filtered.filter(
          (item) =>
            item.starting_bid >= Number(priceRangeFilter.min) &&
            item.starting_bid <= Number(priceRangeFilter.max)
        );
      }

      // Filter by auction end time
      if (auctionEndTimeFilter) {
        filtered = filtered.filter(
          (item) => new Date(item.auction_end) <= new Date(auctionEndTimeFilter)
        );
      }

      setFilteredItems(filtered);
    };

    applyFiltersAndSearch();
  }, [searchTerm, priceRangeFilter, auctionEndTimeFilter, items]);

  // Handle changes in search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Handle changes in price range filter
  const handlePriceRangeFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = e.target.value.trim();
    setPriceRangeFilter((prev) => ({
      ...prev,
      [type]: value,
    }));
    setCurrentPage(1); // Reset to first page when price range filter changes
  };

  // Handle changes in auction end time filter
  const handleAuctionEndTimeFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAuctionEndTimeFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when auction end time filter changes
  };

  // Logic to paginate items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <header className="flex items-center justify-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to the Auction Platform
        </h1>
      </header>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Search */}
        <div className="flex-1">
          <label htmlFor="search" className="text-gray-700">
            Search by Title/Description:
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Enter search term"
          />
        </div>

        {/* Price Range Filter */}
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label htmlFor="minPrice" className="text-gray-700">
              Min Price:
            </label>
            <input
              type="number"
              id="minPrice"
              value={priceRangeFilter.min}
              onChange={(e) => handlePriceRangeFilterChange(e, 'min')}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Min"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="maxPrice" className="text-gray-700">
              Max Price:
            </label>
            <input
              type="number"
              id="maxPrice"
              value={priceRangeFilter.max}
              onChange={(e) => handlePriceRangeFilterChange(e, 'max')}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Auction End Time Filter */}
        <div>
          <label htmlFor="auctionEndTime" className="text-gray-700">
            Auction End Time:
          </label>
          <input
            type="datetime-local"
            id="auctionEndTime"
            value={auctionEndTimeFilter}
            onChange={handleAuctionEndTimeFilterChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={() => {
            setSearchTerm('');
            setPriceRangeFilter({ min: '', max: '' });
            setAuctionEndTimeFilter('');
            setCurrentPage(1); // Reset to first page when clearing filters
          }}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Clear Filters
        </button>
      </div>

      {/* Item List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Link
              to={`/items/${item.id}`}
              className="block p-4 hover:bg-gray-100"
            >
              <div className="h-48 w-full bg-gray-200 rounded mb-4 overflow-hidden flex items-center justify-center">
                {item.image ? (
                  <img
                    src={`${item.image}`}
                    alt={item.title}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-gray-600">{item.description}</p>
              <p className="mt-2 text-gray-800 font-bold">
                Starting Bid: ${item.starting_bid}
              </p>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="flex items-center space-x-2">
          {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded-md focus:outline-none ${
                currentPage === index + 1
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ItemList;
