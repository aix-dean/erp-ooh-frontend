"use client";

import React, { useState, useEffect } from 'react';

interface SearchResult {
  id: string;
  title: string;
  type: string;
  href: string;
}

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  results?: SearchResult[];
  className?: string;
}

const Search: React.FC<SearchProps> = ({
  placeholder = "Search...",
  onSearch,
  results = [],
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Mock search results - in a real app, this would come from an API
  const mockResults: SearchResult[] = [
    { id: '1', title: 'Dashboard Overview', type: 'Page', href: '/' },
    { id: '2', title: 'Active Campaigns', type: 'Module', href: '/campaigns' },
    { id: '3', title: 'Client Management', type: 'Module', href: '/clients' },
    { id: '4', title: 'Financial Reports', type: 'Module', href: '/financials' },
    { id: '5', title: 'Inventory Management', type: 'Module', href: '/inventory' },
  ];

  const filteredResults = mockResults.filter(result =>
    result.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (query.length > 0) {
      setIsOpen(true);
      onSearch?.(query);
    } else {
      setIsOpen(false);
    }
  }, [query, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery('');
    setIsOpen(false);
    // In a real app, you would navigate to the result.href
    console.log('Navigate to:', result.href);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {isOpen && (filteredResults.length > 0 || results.length > 0) && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none">
          {(results.length > 0 ? results : filteredResults).map((result) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{result.title}</span>
                <span className="text-xs text-gray-500">{result.type}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;