export interface Exhibition {
  id: string;
  title: string;       
  ticketPrice: number; 
  isInterregional: boolean; 
  description?: string; 
  createdAt: string;
  updatedAt: string;
}

export interface Exhibit {
  id: string;
  title: string;
  author: string;
  creationYear?: number;
  exhibitionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}
