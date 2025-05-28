export type BuildingType = {
  building_id: number;
  name: string;
  level: number;
  base_price: number;
  multiplier: number;
  income_per_second: number;
};
export type GetUserDataResponse = {
  userData: {
    user: {
      id: number;
      currency: number;
      currency_per_second: number;
      currency_per_click: number;
    };
    buildings: BuildingType[];
  };
};

export type TgUser = {
  first_name?: string;
  last_name?: string;
  id?: number;
  username?: string;
};
