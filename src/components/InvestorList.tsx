import React from 'react';
import { Investor } from '../types';
import InvestorCard from './InvestorCard';
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';

interface InvestorListProps {
  investors: Investor[];
  currentPage: number;
  investorsPerPage: number;
  setCurrentPage: (page: number) => void;
  setInvestorsPerPage: (count: number) => void;
  sortBy: keyof Investor;
  sortOrder: 'asc' | 'desc';
  onSort: (key: keyof Investor) => void;
}

const InvestorList: React.FC<InvestorListProps> = ({
  investors,
  currentPage,
  investorsPerPage,
  setCurrentPage,
  setInvestorsPerPage,
  sortBy,
  sortOrder,
  onSort,
}) => {
  const indexOfLastInvestor = currentPage * investorsPerPage;
  const indexOfFirstInvestor = indexOfLastInvestor - investorsPerPage;
  const currentInvestors = investors.slice(indexOfFirstInvestor, indexOfLastInvestor);

  const totalPages = Math.ceil(investors.length / investorsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderSortIcon = (key: keyof Investor) => {
    if (sortBy === key) {
      return sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
    }
    return null;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Investors: {investors.length}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Show</span>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={investorsPerPage}
            onChange={(e) => setInvestorsPerPage(Number(e.target.value))}
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-600">per page</span>
        </div>
      </div>
      <div className="mb-4 flex justify-end space-x-2">
        <button
          className="px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
          onClick={() => onSort('name')}
        >
          Name {renderSortIcon('name')}
        </button>
        <button
          className="px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
          onClick={() => onSort('type')}
        >
          Type {renderSortIcon('type')}
        </button>
      </div>
      <div className="space-y-4">
        {currentInvestors.map((investor) => (
          <InvestorCard key={investor.id} investor={investor} />
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-600">
            Showing {indexOfFirstInvestor + 1} to {Math.min(indexOfLastInvestor, investors.length)} of {investors.length} investors
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border border-gray-300 rounded text-sm font-medium ${
                currentPage === page ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestorList;