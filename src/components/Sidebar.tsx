import React, { useState } from 'react';
import { Phone, User, Target, ChevronDown, ChevronUp } from 'lucide-react';
import { Filters } from '../types';

const investorTypes = [
  { name: 'Angel/Individual', count: 65000 },
  { name: 'Investor', count: 23674 },
  { name: 'VC', count: 22884 },
  { name: 'Private Equity Firm', count: 16661 },
  { name: 'Venture Capital', count: 11786 },
];

const investmentFocuses = [
  { name: 'Software', count: 25931 },
  { name: 'Information Technology', count: 19985 },
  { name: 'SaaS', count: 19348 },
  { name: 'Mobile', count: 18518 },
  { name: 'E-Commerce', count: 17652 },
];

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  items: { name: string; count: number }[];
  selectedItems: string[];
  onItemToggle: (item: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, icon, items, selectedItems, onItemToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="flex items-center justify-between w-full text-sm font-medium text-gray-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </div>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isExpanded && (
        <div className="mt-2 space-y-2">
          {items.map((item) => (
            <label key={item.name} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedItems.includes(item.name)}
                onChange={() => onItemToggle(item.name)}
              />
              <span className="text-sm">{item.name}</span>
              <span className="text-xs text-gray-500">({item.count})</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange }) => {
  const handlePhoneRequiredChange = () => {
    onFilterChange({ ...filters, phoneRequired: !filters.phoneRequired });
  };

  const handleInvestorTypeToggle = (type: string) => {
    const updatedTypes = filters.investorTypes.includes(type)
      ? filters.investorTypes.filter(t => t !== type)
      : [...filters.investorTypes, type];
    onFilterChange({ ...filters, investorTypes: updatedTypes });
  };

  const handleInvestmentFocusToggle = (focus: string) => {
    const updatedFocuses = filters.investmentFocuses.includes(focus)
      ? filters.investmentFocuses.filter(f => f !== focus)
      : [...filters.investmentFocuses, focus];
    onFilterChange({ ...filters, investmentFocuses: updatedFocuses });
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={filters.phoneRequired}
              onChange={handlePhoneRequiredChange}
            />
            <Phone size={16} />
            <span>Phone required</span>
          </label>
        </div>
        <FilterSection
          title="Investor type"
          icon={<User size={16} />}
          items={investorTypes}
          selectedItems={filters.investorTypes}
          onItemToggle={handleInvestorTypeToggle}
        />
        <FilterSection
          title="Investment focus"
          icon={<Target size={16} />}
          items={investmentFocuses}
          selectedItems={filters.investmentFocuses}
          onItemToggle={handleInvestmentFocusToggle}
        />
      </div>
    </aside>
  );
};

export default Sidebar;