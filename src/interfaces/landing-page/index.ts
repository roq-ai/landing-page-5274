import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface LandingPageInterface {
  id?: string;
  design: string;
  business_id: string;
  created_at?: any;
  updated_at?: any;

  business?: BusinessInterface;
  _count?: {};
}

export interface LandingPageGetQueryInterface extends GetQueryInterface {
  id?: string;
  design?: string;
  business_id?: string;
}
