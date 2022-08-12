import * as SecureStore from 'expo-secure-store';

const urlAddress = 'https://sarzhevsky.com/movies-api';

async function getBearerTokenFromStore() {
    const tokenValue = await SecureStore.getItemAsync('tokenKey');
    if (!tokenValue) {
        return {
            validToken: false,
            token: tokenValue
        };
    }

    return {
        validToken: true,
        token: tokenValue
    };
};

export async function authenticatePostAsync(userName, password) {
    const response = await fetch(`${urlAddress}/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': userName,
            'password': password,
            'grant_type': 'password'
        })
    });

    const result = await response.json();
    if (result.error) {
        return {
            statusOk: false,
            message: result.errorMessage
        };
    }

    return {
        statusOk: true,
        token: result.access_token
    };
};

export async function getMoviesAsync() {
    const { validToken, token } = await getBearerTokenFromStore();
    if (!validToken) {
        return {
            statusOk: false,
            invalidToken: true,
            message: 'Session expired! You have to log In again!'
        }
    }
    
    const response = await fetch(`${urlAddress}/Movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });


    const result = await response.json();
    if (result.error) {
        return {
            statusOk: false,
            message: result.errorMessage
        };
    }

    return {
        statusOk: true,
        data: result
    };
};