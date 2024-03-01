const https = require('https');

const siteId = process.env.SITE_ID; // Site ID від Netlify
const accessToken = process.env.NETLIFY_ACCESS_TOKEN; // Access Token для Netlify API
const deployPreviewCustomDomain = process.env.DEPLOY_PREVIEW_CUSTOM_DOMAIN; // Кастомний домен для deploy previews

const data = JSON.stringify({
    deploy_preview_custom_domain: deployPreviewCustomDomain
});

const options = {
    hostname: 'api.netlify.com',
    port: 443,
    path: `/api/v1/sites/${siteId}`,
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
};

const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
