import React from 'react';
import { Investor } from '../types';
import { MapPin, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';

interface InvestorCardProps {
  investor: Investor;
}

const InvestorCard: React.FC<InvestorCardProps> = ({ investor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={`https://ui-avatars.com/api/?name=${investor.name}&background=random`}
            alt={investor.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold flex items-center">
              {investor.name}
              {investor.verified && (
                <svg className="w-5 h-5 text-blue-500 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </h3>
            <p className="text-gray-600">{investor.title}</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          + Add to CRM
        </button>
      </div>
      <div className="mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <MapPin size={16} />
          <span>{investor.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail size={16} />
          <span>{investor.email}</span>
        </div>
      </div>
      <div className="flex space-x-2 mb-4">
        {Array.isArray(investor.type) ? (
          investor.type.map((type, index) => (
            <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
              {type}
            </span>
          ))
        ) : (
          <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
            {investor.type}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <div>
          <h4 className="text-sm font-semibold mb-1">Investment stages:</h4>
          <div className="flex flex-wrap gap-2">
            {investor.investmentStages.map((stage, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {stage}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-1">Investment focuses:</h4>
          <div className="flex flex-wrap gap-2">
            {investor.investmentFocuses.map((focus, index) => (
              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {focus}
              </span>
            ))}
          </div>
        </div>
        {investor.pastInvestments && (
          <div>
            <h4 className="text-sm font-semibold mb-1">Past investments:</h4>
            <div className="flex flex-wrap gap-2">
              {investor.pastInvestments.map((investment, index) => (
                <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {investment}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex space-x-2">
        <Facebook className="text-gray-400 hover:text-blue-600 cursor-pointer" size={20} />
        <Twitter className="text-gray-400 hover:text-blue-400 cursor-pointer" size={20} />
        <Linkedin className="text-gray-400 hover:text-blue-700 cursor-pointer" size={20} />
      </div>
    </div>
  );
};

export default InvestorCard;