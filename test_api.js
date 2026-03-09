async function testScan() {
    try {
        console.log("1. Logging in...");
        const loginRes = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: "adam.smith.@example.com",
                password: "Password123" 
            })
        });
        
        const loginData = await loginRes.json();
        if (!loginData.token) {
            console.error("Login failed:", loginData);
            return;
        }
        
        const token = loginData.token;
        console.log("Token obtained.");

        console.log("2. Performing scan...");
        const scanRes = await fetch('http://localhost:3000/api/scan/analyze', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({
                type: "text",
                text: "URGENT: Your bank account is compromised. Click http://fake-bank.com to verify."
            })
        });
        
        const scanData = await scanRes.json();
        console.log("Scan Result:", scanData);

        console.log("3. Checking stats...");
        const statsRes = await fetch('http://localhost:3000/api/scan/stats', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const statsData = await statsRes.json();
        console.log("User Stats:", statsData);

    } catch (error) {
        console.error("Error Detail:", error.message);
    }
}

testScan();
