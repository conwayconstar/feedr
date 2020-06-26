declare module 'feedr' {
  export type Dietary = 'v' | 've' | 'df' | 'gf' | 'n!' | 'rsf';

  export type DietarySelection = {
    [T in Dietary]?: number;
  };

  export type ID = number;

  export type Item = {
    id: ID;
    name: string;
    dietaries: Array<Dietary>;
  };

  export type Items = Array<Item>;

  export type AppError = Error | undefined;

  export interface MenuHookInterface {
    menu: Items;
    items: Items;
    toggleItem: (item: Item) => void;
    error: AppError;
    loading: boolean;
    dietarySelection: DietarySelection;
    search: string;
    setSearch: (search: string) => void;
  }
}
