import React, { useState, useEffect } from 'react';

const UserProfile = ({ userData, topArtists, topTracks, onBack }) => {
  const [category, setCategory] = useState('artists'); // Basculer entre artistes et chansons
  const [itemsToShow, setItemsToShow] = useState(5); // Nombre d'éléments à afficher
  const [isDarkMode, setIsDarkMode] = useState(true); // Mode sombre

  // Fonction pour basculer entre Dark et Light Mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = 'white';
    } else {
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = 'black';
    }
  }, [isDarkMode]);

  const cardStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const imageStyle = {
    height: '200px',
    objectFit: 'cover',
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Bienvenue {userData?.display_name}</h1>

      <div className="d-flex justify-content-between my-3">
        {/* Bouton retour */}
        <button className="btn btn-secondary" onClick={onBack}>
          Retour à l'accueil
        </button>

        {/* Menu déroulant pour choisir le nombre d'éléments */}
        <select
          className="form-select w-auto"
          value={itemsToShow}
          onChange={(e) => setItemsToShow(Number(e.target.value))}
        >
          {[5, 10, 15].map((num) => (
            <option key={num} value={num}>
              Afficher {num} éléments
            </option>
          ))}
        </select>

        {/* Bouton de changement de thème */}
        <button
          className="btn btn-outline-light"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? 'Passer au mode clair' : 'Passer au mode sombre'}
        </button>
      </div>

      {/* Menu de navigation */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${category === 'artists' ? 'active' : ''}`}
            onClick={() => setCategory('artists')}
          >
            Top Artistes
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${category === 'tracks' ? 'active' : ''}`}
            onClick={() => setCategory('tracks')}
          >
            Top Chansons
          </button>
        </li>
      </ul>

      <div className="mt-4">
        {category === 'artists' ? (
          <>
            <h3>Top Artistes</h3>
            {topArtists.length > 0 ? (
              <div className="row g-3">
                {topArtists.slice(0, itemsToShow).map((artist) => (
                  <div className="col-12 col-md-4 col-lg-3" key={artist.id}>
                    <div className="card" style={cardStyle}>
                      <img
                        src={artist.images[0]?.url || 'https://via.placeholder.com/200'}
                        alt={artist.name}
                        className="card-img-top"
                        style={imageStyle}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-truncate">{artist.name}</h5>
                        <p className="card-text">Followers : {artist.followers.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Chargement des top artistes...</p>
            )}
          </>
        ) : (
          <>
            <h3>Top Chansons</h3>
            {topTracks.length > 0 ? (
              <div className="row g-3">
                {topTracks.slice(0, itemsToShow).map((track) => (
                  <div className="col-12 col-md-4 col-lg-3" key={track.id}>
                    <div className="card" style={cardStyle}>
                      <img
                        src={track.album.images[0]?.url || 'https://via.placeholder.com/200'}
                        alt={track.name}
                        className="card-img-top"
                        style={imageStyle}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-truncate">{track.name}</h5>
                        <p className="card-text">
                          Artiste : {track.artists.map((artist) => artist.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Chargement des top chansons...</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
