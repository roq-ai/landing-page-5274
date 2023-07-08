import axios from 'axios';
import queryString from 'query-string';
import { MarketingStrategyInterface, MarketingStrategyGetQueryInterface } from 'interfaces/marketing-strategy';
import { GetQueryInterface } from '../../interfaces';

export const getMarketingStrategies = async (query?: MarketingStrategyGetQueryInterface) => {
  const response = await axios.get(`/api/marketing-strategies${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMarketingStrategy = async (marketingStrategy: MarketingStrategyInterface) => {
  const response = await axios.post('/api/marketing-strategies', marketingStrategy);
  return response.data;
};

export const updateMarketingStrategyById = async (id: string, marketingStrategy: MarketingStrategyInterface) => {
  const response = await axios.put(`/api/marketing-strategies/${id}`, marketingStrategy);
  return response.data;
};

export const getMarketingStrategyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/marketing-strategies/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMarketingStrategyById = async (id: string) => {
  const response = await axios.delete(`/api/marketing-strategies/${id}`);
  return response.data;
};
