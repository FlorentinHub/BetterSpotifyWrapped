import React, { useState } from 'react';
import '../style/Home.css';

const Home = () => {
  const [clientId, setClientId] = useState('');
  const [redirectUri, setRedirectUri] = useState('https://betterspotifywrapped.netlify.app/callback'); //http://localhost:5173/callback
  const [generatedUrl, setGeneratedUrl] = useState('');

  const generateSpotifyLoginUrl = (clientId, redirectUri) => {
    return `https://accounts.spotify.com/authorize?client_id=165f9cb248dd4ab599ab4a90edff6767&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=user-library-read%20playlist-read-private%20user-read-email%20user-top-read%20user-read-recently-played`;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const url = generateSpotifyLoginUrl(clientId, redirectUri);
    setGeneratedUrl(url);
    window.location.href = url;
  };

  return (
    <div className="home-container">
      <h1 className="home-title">
        Connexion avec
        <img
          src="https://r2.fivemanage.com/image/IXHdKNyVuzWv.png"
          alt="Spotify Logo"
          className="spotify-logo"
        />
        <span className="spotify-text">Spotify</span>
      </h1>

      <form onSubmit={handleFormSubmit} className="home-form">
        {/* <label htmlFor="clientId" className="form-label">
          Client ID - <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer">Dashboard</a>
        </label> */}
        {/* <p className="info-text">
          Si vous ne disposez pas encore d'un Client ID, vous pouvez l'obtenir dans la 
          <a href="https://developer.spotify.com/documentation/web-api/concepts/apps" target="_blank" rel="noopener noreferrer"> documentation officielle de Spotify</a>.
        </p> */}
        <button type="submit" className="btn">
          Se connecter avec Spotify
        </button>
      </form>

      {/* <div className="callback-section">
        <h5>Callback URL à utiliser :</h5>
        <div className="callback-alert">
          <span>{redirectUri}</span>
          <button
            className="copy-btn"
            onClick={() => navigator.clipboard.writeText(redirectUri)}
          >
            Copier
          </button>
        </div>
        <p className="info-text">
          Ajoutez cette URL dans la section <strong>REDIRECT URLs</strong> du Dashboard de Spotify.
        </p>
      </div> */}

      {generatedUrl && (
        <div className="url-section">
          <h5>URL générée :</h5>
          <div className="url-alert">{generatedUrl}</div>
          <a href={generatedUrl} target="_blank" rel="noopener noreferrer" className="btn">
            Si vous voyez ceci, vous devez cliquez ici pour vous connecter via Spotify
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
