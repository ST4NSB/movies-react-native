import * as SecureStore from "expo-secure-store";

const urlAddress = "https://sarzhevsky.com/movies-api";

export async function getBearerTokenFromStoreAsync() {
  const tokenValue = await SecureStore.getItemAsync("tokenKey");
  if (!tokenValue) {
    return {
      validToken: false,
      token: tokenValue,
    };
  }

  return {
    validToken: true,
    token: tokenValue,
  };
}

export async function authenticatePostAsync(userName, password) {
  const response = await fetch(`${urlAddress}/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userName,
      password: password,
    }),
  });

  const result = await response.json();
  if (result.error) {
    return {
      statusOk: false,
      message: result.errorMessage,
    };
  }

  return {
    statusOk: true,
    token: result.access_token,
  };
}

export async function getMoviesAsync() {
  const { validToken, token } = await getBearerTokenFromStoreAsync();
  if (!validToken) {
    return {
      statusOk: false,
      invalidToken: true,
      message: "Session expired! You have to log In again!",
    };
  }

  const response = await fetch(`${urlAddress}/Movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (result.error) {
    return {
      statusOk: false,
      message: result.errorMessage,
    };
  }

  return {
    statusOk: true,
    data: result,
  };
}

export async function getMovieDetailsAsync(id) {
  const { validToken, token } = await getBearerTokenFromStoreAsync();
  if (!validToken) {
    return {
      statusOk: false,
      invalidToken: true,
      message: "Session expired! You have to log In again!",
    };
  }

  const responseInfo = await fetch(`${urlAddress}/Movies/${id}/Info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const resultInfo = await responseInfo.json();
  if (resultInfo.error) {
    return {
      statusOk: false,
      message: resultInfo.errorMessage,
    };
  }

  const responseCast = await fetch(`${urlAddress}/Movies/${id}/Cast`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const resultCast = await responseCast.json();
  if (resultCast.error) {
    return {
      statusOk: false,
      message: resultCast.errorMessage,
    };
  }

  return {
    statusOk: true,
    details: resultInfo,
    cast: resultCast,
  };
}

export async function getCommentsAsync(id) {
  const { validToken, token } = await getBearerTokenFromStoreAsync();
  if (!validToken) {
    return {
      statusOk: false,
      invalidToken: true,
      message: "Session expired! You have to log In again!",
    };
  }

  const response = await fetch(`${urlAddress}/Movies/${id}/Comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (result.error) {
    return {
      statusOk: false,
      message: result.errorMessage,
    };
  }

  return {
    statusOk: true,
    data: result,
  };
}

export async function submitCommentPostAsync(id, message) {
  const { validToken, token } = await getBearerTokenFromStoreAsync();
  if (!validToken) {
    return {
      statusOk: false,
      invalidToken: true,
      message: "Session expired! You have to log In again!",
    };
  }

  const response = await fetch(`${urlAddress}/Movies/${id}/Comments/Post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: message,
    }),
  });

  const result = await response.json();
  if (result.error) {
    return {
      statusOk: false,
      message: result.errorMessage,
    };
  }

  return {
    statusOk: true,
    data: result,
  };
}
