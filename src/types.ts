export interface Investor {
  id: number;
  name: string;
  title: string;
  type: string | string[];
  location: string;
  email: string;
  phone?: string;
  investmentStages: string[];
  investmentFocuses: string[];
  pastInvestments?: string[];
  verified: boolean;
}

export interface Filters {
  phoneRequired: boolean;
  investorTypes: string[];
  investmentFocuses: string[];
}