import { refreshAccessToken } from "@/app/_components/authSlice";

export const fetchDataWithAuth = async (url, dispatch, getState) => {
  const state = getState();
  let accessToken = state.auth.accessToken;
  const refreshToken = state.auth.refreshToken;

  // Eğer accessToken mevcut değilse, otomatik olarak bir hata döner.
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  // API isteği Access Token ile yapılır
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    // Access Token süresi dolmuş, refresh token ile yeni access token alalım
    const refreshResponse = await dispatch(refreshAccessToken(refreshToken));

    if (refreshResponse.type === "auth/refreshAccessToken/fulfilled") {
      // Yeni accessToken geldi, tekrar dene
      accessToken = refreshResponse.payload.accessToken;

      // API isteğini tekrar yapalım
      response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else {
      throw new Error("Unable to refresh token");
    }
  }

  return response;
};
