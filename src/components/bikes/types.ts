export interface Vehicle {
  vehicleId: string;
  vehicleNumber: string;
}

export interface ModelInfo {
  brand: string;
  model: string;
  imageUrl: string;
  transmission: string;
}

export interface Counters {
  available: number;
  total: number;
}

export interface BikeData {
  bikeId: string;
  modelInfo: ModelInfo;
  vehicles: Vehicle[];
  counters: Counters;
  price: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    data: BikeData[];
    pagination: {
      currentPage: number;
      limit: number;
      totalDocuments: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      totalFiltered: number;
    };
  };
}

export interface SearchFilters {
  minVehicles: number;
  page: number;
  limit: number;
  category?: string;
  location?: string;
  transmission?: string;
  brand?: string;
}
