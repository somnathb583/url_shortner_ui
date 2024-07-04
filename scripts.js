document.getElementById('urlInput').style.display = 'none';
document.getElementById('analytics').style.display = 'none';
document.getElementById('result').style.display = 'none';
document.getElementById("protectedContent").style.display = "none";

function showTextbox() {
    document.getElementById('urlInput').style.display = 'block';
    document.getElementById('analytics').style.display = 'none';
    document.getElementById('result').style.display = 'none';
}


function displayResult(data) {
    document.getElementById('result').style.display = 'block';
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = JSON.stringify(data, null, 2);
}


async function createUrl(id) {

    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value;

    if (!url) {
        alert('Please enter a URL');
        return;
    }

    const newURL = 'http://localhost:3000/url/getNewURL/';

    const data = {
        "url": url
    };

    try {
        const response = await fetch(newURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const responseData = await response.json();
        displayResult(responseData);
        urlInput.value = '';
        hideTextbox();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function hideResult() {
    document.getElementById('result').style.display = 'none';
}

function hideTextbox() {
    document.getElementById('urlInput').style.display = 'none';
}


function getAnalytics() {
    // hideTextbox();
    document.getElementById('analytics').style.display = 'block';
    document.getElementById('urlInput').style.display = 'none';
    hideResult();
}

async function getAnalysis() {
    const idInput = document.getElementById('analytics');
    const id = idInput.value;

    if (!id) {
        alert('Please enter a URL');
        return;
    }

    const newURL = `http://localhost:3000/url/analyticsURL/?id=${id}`;

    try {
        const response = await fetch(newURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const responseData = await response.json();
        console.log(responseData);
        displayResult(responseData);
        urlInput.value = '';
        hideTextbox();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


//  Singup Functionality comes here.
function openSignupPage() {
    const width = 400;
    const height = 400;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    window.open('signup.html', 'Signup', `width=${width},height=${height},top=${top},left=${left}`);
}

function openLoginPage() {
    const width = 600;
    const height = 600;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    window.open('login.html', 'Login', `width=${width},height=${height},top=${top},left=${left}`);
}

async function receiveSignupData(data) {
    console.log('Received signup data:', data);

    const newURL = 'http://localhost:3000/UserDetails/createUser/';

    try {
        const response = await fetch(newURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const responseData = await response.json();
        alert('Signup Successful');
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function receiveLoginData(data) {
    console.log('Received signup data:', data);

    const newURL = 'http://localhost:3000/UserDetails/userLogin/';

    try {
        const response = await fetch(newURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const responseData = await response.json();
        if (responseData) {
            localStorage.setItem('isLoggedIn', 'true');
            return responseData;
            
        } else {
            alert('Incorrect details');
        }

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// async function submitLoginData() {
//     console.log('hello')
//     document.getElementById('loginForm').addEventListener('submit', function(event) {
//         event.preventDefault();

//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;

//         const loginData = { email, password };

//         await window.opener.receiveLoginData(loginData);
//         window.close();
//     });
// }

async function submitLoginData() {
    let result;
    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const loginData = { email, password };

        if (window.opener !== null) {
            result = await receiveLoginData(loginData);
        } else {
            console.error('Window opener is null');
        }

        if (result) {
            window.opener.location.reload(); // this helps the reload the parent window.
            window.close();
        } else {
            alert('incorrect detaiils')
        }
    });
}
