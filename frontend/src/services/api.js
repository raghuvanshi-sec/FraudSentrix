import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeScam = async (text) => {
  try {
    // For the MVP, we utilize the single /analyze endpoint present on the current backend
    const response = await apiClient.post('/scan/analyze', { text, domain: '' });
    return {
      success: true,
      message: response.data.message,
      data: {
        risk: response.data.level,
        score: response.data.riskScore,
        flags: [] 
      }
    };
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to analyze text');
  }
};

export const analyzePhishing = async (emailContent, senderEmail) => {
  // Simulating response for the MVP based on the design request
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
  // Simulating response for the prototype
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate checking string match
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
  // Simulating document hashing for the prototype
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
  // Simulating document verification
  return new Promise((resolve) => {
    setTimeout(() => {
      // Hardcode one authentic hash simulation, treat others as tampered
      const isAuthentic = hash === 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
      
      resolve({
        success: true,
        status: isAuthentic ? 'AUTHENTIC' : 'TAMPERED',
        message: isAuthentic ? 'Document matched blockchain record.' : 'Warning: Document hash does not match original.'
      });
    }, 1500);
  });
};
