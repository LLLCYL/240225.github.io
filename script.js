document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');
    const responseText = document.getElementById('responseText');

    submitButton.addEventListener('click', async function() {
        const inputText = document.getElementById('inputText').value;
        if (inputText.trim() === '') {
            alert('Please enter some text.');
            return;
        }

        try {
            const responseData = await sendTextToGPTAPI(inputText);
            responseText.textContent = responseData;
        } catch (error) {
            console.error('Error occurred:', error);
            responseText.textContent = 'Error: Could not retrieve response.';
        }
    });
});

async function sendTextToGPTAPI(text) {
    const API_URL = 'https://api.example.com/gptapi'; // 替换成你的GPT API URL

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add other headers if needed, for example, Authorization header for API keys
        },
        body: JSON.stringify({ text: text }) // 发送的数据
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.responseText; // 假设返回的数据中包含一个responseText字段
}
