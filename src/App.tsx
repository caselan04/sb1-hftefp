import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Sidebar from './components/Sidebar';
import InvestorList from './components/InvestorList';
import { Investor, Filters } from './types';

const mockInvestors: Investor[] = [
  // ... (keep existing mock data)
];

function App() {
  const [investors, setInvestors] = useState<Investor[]>(mockInvestors);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInvestors, setFilteredInvestors] = useState<Investor[]>(investors);
  const [filters, setFilters] = useState<Filters>({
    phoneRequired: false,
    investorTypes: [],
    investmentFocuses: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [investorsPerPage, setInvestorsPerPage] = useState(15);
  const [sortBy, setSortBy] = useState<keyof Investor>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    let filtered = investors.filter((investor) =>
      investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof investor.type === 'string' && investor.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (Array.isArray(investor.type) && investor.type.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      investor.investmentFocuses.some(focus => focus.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Apply filters
    if (filters.phoneRequired) {
      filtered = filtered.filter(investor => investor.phone !== undefined);
    }
    if (filters.investorTypes.length > 0) {
      filtered = filtered.filter(investor => 
        (typeof investor.type === 'string' && filters.investorTypes.includes(investor.type)) ||
        (Array.isArray(investor.type) && investor.type.some(t => filters.investorTypes.includes(t)))
      );
    }
    if (filters.investmentFocuses.length > 0) {
      filtered = filtered.filter(investor => 
        investor.investmentFocuses.some(focus => filters.investmentFocuses.includes(focus))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredInvestors(filtered);
    setCurrentPage(1);
  }, [searchTerm, investors, filters, sortBy, sortOrder]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Search is already handled by the useEffect hook
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleSort = (key: keyof Investor) => {
    setSortBy(key);
    setSortOrder(current => current === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar filters={filters} onFilterChange={handleFilterChange} />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Investor database</h1>
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Find investors in your niche"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>
        </div>
        <InvestorList 
          investors={filteredInvestors}
          currentPage={currentPage}
          investorsPerPage={investorsPerPage}
          setCurrentPage={setCurrentPage}
          setInvestorsPerPage={setInvestorsPerPage}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </main>
    </div>
  );
}

export default App;