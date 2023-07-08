import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface MarketingStrategyInterface {
  id?: string;
  strategy: string;
  business_id: string;
  created_at?: any;
  updated_at?: any;

  business?: BusinessInterface;
  _count?: {};
}

export interface MarketingStrategyGetQueryInterface extends GetQueryInterface {
  id?: string;
  strategy?: string;
  business_id?: string;
}
