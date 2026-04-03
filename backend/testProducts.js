// using built-in fetch

async function testProducts() {
    try {
        console.log('Testing GET http://localhost:5000/api/products ...');
        const response = await fetch('http://localhost:5000/api/products');
        console.log('Status:', response.status);

        if (response.ok) {
            const data = await response.json();
            console.log('Success! Found', data.length, 'products.');
            if (data.length > 0) {
                console.log('First product:', JSON.stringify(data[0], null, 2));
            }
        } else {
            console.log('Error:', await response.text());
        }
    } catch (e) {
        console.log('Fetch failed:', e.message);
        console.log('Is the server running on port 5000?');
    }
}

testProducts();
