export interface Data {
  year: number;
  co2?: number;
  population?: number;
  co2_per_capita?: number;
  [key: string]: number | undefined;
}

export interface Country {
  iso_code?: string;
  data: Data[];
}

export type CO2Dataset = Record<string, Country>;
