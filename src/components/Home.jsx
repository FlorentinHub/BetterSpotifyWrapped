import React, { useState } from 'react';

const Home = () => {
  // États pour le formulaire
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [redirectUri, setRedirectUri] = useState('http://localhost:5173/callback');
  const [generatedUrl, setGeneratedUrl] = useState('');

  // Fonction pour générer l'URL de connexion Spotify
  const generateSpotifyLoginUrl = (clientId, redirectUri) => {
    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=user-library-read%20playlist-read-private%20user-read-email`;
  };

  // Fonction pour soumettre le formulaire et rediriger l'utilisateur
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (clientId && clientSecret) {
      // Génère l'URL de connexion avec les informations saisies
      const url = generateSpotifyLoginUrl(clientId, redirectUri);
      setGeneratedUrl(url);
      // Redirige l'utilisateur vers Spotify
      window.location.href = url;
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Connexion avec Spotify</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="clientId" className="form-label">
            Client ID
          </label>
          <input
            type="text"
            id="clientId"
            className="form-control"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="clientSecret" className="form-label">
            Client Secret
          </label>
          <input
            type="text"
            id="clientSecret"
            className="form-control"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Se connecter avec Spotify
        </button>
      </form>

      {generatedUrl && (
        <div className="mt-3">
          <h5>URL générée :</h5>
          <p>{generatedUrl}</p>
          <a href={generatedUrl} target="_blank" rel="noopener noreferrer">
            Cliquer ici pour vous connecter à Spotify
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
