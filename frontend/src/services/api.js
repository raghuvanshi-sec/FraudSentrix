import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token from localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const analyzeScam = async (text, type = "text", metadata = {}) => {
  try {
    const payload = {
      type,
      text: type === "text" ? text : (metadata.transcript || ""),
      domain: metadata.domain || "",
      vishingMetadata: type === "audio" ? metadata : {},
      deepfakeMetadata: type === "video" ? metadata : {}
    };

    const response = await apiClient.post('/scan/analyze', payload);
    
    return {
      success: true,
      message: response.data.message,
      data: {
        risk: response.data.level,
        score: response.data.riskScore,
        type: response.data.type,
        hash: response.data.hash,
        flags: []
      }
    };
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to analyze content');
  }
};

export const getScanStats = async () => {
    try {
        const response = await apiClient.get('/scan/stats');
        return response.data;
    } catch (error) {
        console.error("Failed to fetch scan stats:", error);
        return { totalScans: 0, highRiskScans: 0, textScans: 0, audioScans: 0, videoScans: 0 };
    }
};

export const getScanHistory = async () => {
    try {
        const response = await apiClient.get('/scan/history');
        return response.data;
    } catch (error) {
        console.error("Failed to fetch scan history:", error);
        return [];
    }
};

export const analyzeDeepfake = async (videoUrl, manipulationType = "unknown") => {
  try {
    const mockConfidence = Math.floor(Math.random() * 60) + 40; 
    
    return await analyzeScam("", "video", {
      videoUrl,
      manipulationType,
      confidenceScore: mockConfidence
    });
  } catch (error) {
    throw new Error(error.message || 'Deepfake analysis failed');
  }
};

// ... other existing simulated methods can stay as they are if not yet backend-provided
export const analyzePhishing = async (emailContent, senderEmail) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isRisky = emailContent.toLowerCase().includes('urgent') || emailContent.toLowerCase().includes('password');
      resolve({
        success: true,
        message: 'Email analysis complete',
        data: {
          risk: isRisky ? 'HIGH' : 'LOW',
          score: isRisky ? 92 : 12,
          keywordHits: isRisky ? ['urgent', 'password', 'verify'] : [],
          domainMismatch: senderEmail.includes('gmail.com') && isRisky
        }
      });
    }, 1500);
  });
};

export const checkDomain = async (officialDomain, suspectedDomain) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const officialClean = officialDomain.replace('www.', '').replace('https://', '');
      const suspectedClean = suspectedDomain.replace('www.', '').replace('https://', '');
      const isMatch = officialClean.toLowerCase() === suspectedClean.toLowerCase();
      resolve({
        success: true,
        message: 'Domain check complete',
        data: {
          similarity: isMatch ? 100 : 45,
          risk: isMatch ? 'SAFE' : 'HIGH',
          classification: isMatch ? 'Authentic' : 'Likely Impersonation',
          warning: isMatch ? null : 'This domain uses character substitution commonly found in typosquatting.'
        }
      });
    }, 1200);
  });
};

export const uploadDocument = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        hashType: 'SHA-256',
        hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      });
    }, 2000);
  });
};

export const verifyDocument = async (hash) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isAuthentic = hash === 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
      resolve({
        success: true,
        status: isAuthentic ? 'AUTHENTIC' : 'TAMPERED',
        message: isAuthentic ? 'Document matched blockchain record.' : 'Warning: Document hash does not match original.'
      });
    }, 1500);
  });
};
