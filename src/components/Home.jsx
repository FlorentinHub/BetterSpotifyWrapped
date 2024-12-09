import React, { useState } from 'react';

const Home = () => {
  const [clientId, setClientId] = useState('');
  const [redirectUri, setRedirectUri] = useState('https://regal-paletas-d2b26d.netlify.app/callback');
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
      <h1 className="mt-5">
        Connexion avec
        <img
          src="/src/assets/Spotify_Primary_Logo_RGB_Green.png"
          style={{
            height: '1em',
            width: 'auto',
            verticalAlign: 'middle',
            marginLeft: '8px',
          }}
        />
        <span
          style={{
            color: '#1DB954', 
          }}
        >
          Spotify
        </span>
      </h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="clientId" className="form-label">
            Client ID - <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer">Dashboard</a>.
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

        <p>
          Si vous ne disposez pas encore d'un Client ID, vous pouvez l'obtenir en suivant les instructions
          dans la <a href="https://developer.spotify.com/documentation/web-api/concepts/apps" target="_blank" rel="noopener noreferrer">documentation officielle de Spotify</a>.
        </p>

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
