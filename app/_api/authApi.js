import { refreshAccessToken } from "@/app/_store/slices/authSlice";

export const fetchDataWithAuth = async (url, dispatch, getState) => {
  const state = getState();
  let accessToken = state.auth.accessToken;
  const refreshToken = state.auth.refreshToken;

  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    const refreshResponse = await dispatch(refreshAccessToken(refreshToken));

    if (refreshResponse.type === "auth/refreshAccessToken/fulfilled") {
      accessToken = refreshResponse.payload.accessToken;

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
