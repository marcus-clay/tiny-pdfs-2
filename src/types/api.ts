export interface CompressionSettings {
  imageQuality: number;
  imageResolutionDpi: number;
}

export interface ApiResponse {
  error?: string;
  status: number;
  url?: string;
  taskId?: string;
}

export interface TaskStatus {
  status: 'processing' | 'success' | 'error';
  percent: number;
  downloadUrl?: string;
}