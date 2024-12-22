import { API_CONFIG } from '../../config/api';
import { ApiError } from '../../utils/errors';

export class PDFCoClient {
  private validateApiKey() {
    if (!API_CONFIG.apiKey) {
      throw new ApiError('PDF.co API key is not configured');
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    
    if (!response.ok || data.error) {
      console.error('PDF.co API Error:', {
        status: response.status,
        error: data.error,
        data
      });
      throw new ApiError(data.message || data.error || `API request failed with status ${response.status}`);
    }
    
    return data;
  }

  async uploadFile(file: File): Promise<string> {
    this.validateApiKey();
    
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_CONFIG.baseUrl}/file/upload`, {
      method: 'POST',
      headers: {
        'x-api-key': API_CONFIG.apiKey
      },
      body: formData
    });

    const data = await this.handleResponse<{ url?: string }>(response);
    
    if (!data.url) {
      throw new ApiError('Upload response missing URL');
    }
    
    return data.url;
  }

  async startCompression(fileUrl: string, settings: { imageQuality: number; imageResolutionDpi: number }): Promise<string> {
    this.validateApiKey();
    
    const payload = {
      url: fileUrl,
      async: false,
      name: `compressed_${Date.now()}.pdf`,
      reduceMemoryUsage: true,
      compressImages: true,
      imageQuality: settings.imageQuality,
      maxResolution: settings.imageResolutionDpi,
      recompressImages: true
    };

    const response = await fetch(`${API_CONFIG.baseUrl}/pdf/optimize`, {
      method: 'POST',
      headers: {
        'x-api-key': API_CONFIG.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await this.handleResponse<{ url?: string }>(response);
    
    if (!data.url) {
      throw new ApiError('Compression response missing URL');
    }
    
    return data.url;
  }

  async downloadFile(url: string): Promise<Blob> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new ApiError(`Failed to download file: ${response.status}`);
    }
    return response.blob();
  }
}