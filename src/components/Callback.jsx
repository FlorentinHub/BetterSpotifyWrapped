import React, { useEffect } from 'react';

const Callback = () => {
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?'));
    const accessToken = params.get('access_token');

    if (accessToken) {
      console.log('Spotify Access Token:', accessToken);
    } else {
      console.log('Aucun token trouvé.');
    }
  }, []);

  return <div>Connexion en cours avec Spotify...</div>;
};

export default Callback;
