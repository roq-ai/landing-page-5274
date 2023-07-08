import { LandingPageInterface } from 'interfaces/landing-page';
import { MarketingStrategyInterface } from 'interfaces/marketing-strategy';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BusinessInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  landing_page?: LandingPageInterface[];
  marketing_strategy?: MarketingStrategyInterface[];
  user?: UserInterface;
  _count?: {
    landing_page?: number;
    marketing_strategy?: number;
  };
}

export interface BusinessGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
