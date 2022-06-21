// The Page type is used as an input for a query
export interface Page {
  limit: number;
  offset: number;
}

// The PageInfo type is used as a part of the output from a query
export interface PageInfo {
  limit: number;
  offset: number;
}
