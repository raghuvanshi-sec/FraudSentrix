const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

const testScans = [
    {
        name: 'Text Scan (Scam)',
        payload: {
            type: 'text',
            text: 'Urgent: Your bank account is blocked. Verify OTP now to win lottery!',
            domain: 'secure-bank-login.com'
        }
    },
    {
        name: 'Vishing Scan (Audio)',
        payload: {
            type: 'audio',
            vishingMetadata: {
                callerId: '+1234567890',
                transcript: 'Hello, this is your bank. We need you to verify your account immediately.',
                duration: 45
            }
        }
    },
    {
        name: 'Deepfake Scan (Video)',
        payload: {
            type: 'video',
            deepfakeMetadata: {
                videoUrl: 'https://cdn.fraudsentrix.com/v/deepfake1.mp4',
                manipulationType: 'face-swap',
                confidenceScore: 85
            }
        }
    }
];

async function runTests() {
    console.log('🚀 Starting Backend Verification Tests...\n');

    for (const test of testScans) {
        try {
            console.log(`Testing: ${test.name}`);
            const response = await axios.post(`${BASE_URL}/analyze`, test.payload);
            console.log('Response:', JSON.stringify(response.data, null, 2));
            console.log('✅ Success\n');
        } catch (error) {
            console.error(`❌ Failed: ${test.name}`);
            if (error.response) {
                console.error('Error Data:', error.response.data);
            } else {
                console.error('Error Message:', error.message);
            }
            console.log('\n');
        }
    }
}

runTests();
