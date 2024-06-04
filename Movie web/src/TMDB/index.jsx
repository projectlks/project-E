import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";

export default function Index() {
  const {
    data: tokenData,
  } = useFetch(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=31d6afcc99f364c40d22f14b2fe5bc6e`
  );

  const {
    data: authData,
  } = useFetch(
    tokenData
      ? `https://www.themoviedb.org/authenticate/${tokenData.request_token}`
      : null
  );



  return (
    <div>
      {tokenData && <div>Request Token: {tokenData.request_token}</div>}
      {authData && <div>Authentication Data: {authData}</div>}
    </div>
  );
}
