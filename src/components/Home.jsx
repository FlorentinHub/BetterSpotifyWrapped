import React, { useState } from 'react';

const Home = () => {
  const [clientId, setClientId] = useState('');
  const [redirectUri, setRedirectUri] = useState('http://localhost:5173/callback');
  const [generatedUrl, setGeneratedUrl] = useState('');

  const generateSpotifyLoginUrl = (clientId, redirectUri) => {
    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=user-library-read%20playlist-read-private%20user-read-email%20user-top-read%20user-read-recently-played`;
  };
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!clientId) {
      alert('Veuillez renseigner votre Client ID');
      return;
    }
    const url = generateSpotifyLoginUrl(clientId, redirectUri);
    setGeneratedUrl(url);
    window.location.href = url;
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
        <button type="submit" className="btn btn-primary">
          Se connecter avec Spotify
        </button>
      </form>

      {generatedUrl && (
        <div className="mt-3">
          <h5>URL générée :</h5>
          <div className="alert alert-success">
            <strong>{generatedUrl}</strong>
          </div>
          <a
            href={generatedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success mt-2"
          >
            Cliquez ici pour vous connecter à Spotify
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
