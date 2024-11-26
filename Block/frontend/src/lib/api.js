const BASE_URL = 'http://localhost:3000';

export const issueCertificate = async (certificateData) => {
    const response = await fetch(`${BASE_URL}/admin/issue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certificateData),
    });
    return response.json();
};

export const verifyCertificate = async (hash) => {
    const response = await fetch(`${BASE_URL}/user/verify/${hash}`);
    return response.json();
};
