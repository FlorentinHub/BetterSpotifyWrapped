import React from 'react';

const UserProfile = ({ userData, topArtists, onBack }) => {
  return (
    <div className="container mt-5">
      <h1>Bienvenue {userData?.display_name}</h1>
      <button className="btn btn-secondary mb-3" onClick={onBack}>
        Retour à l'accueil
      </button>

      <h3>Top Artistes</h3>
      {topArtists.length > 0 ? (
        <div className="row">
          {topArtists.slice(0, 5).map((artist) => (
            <div className="col-12 col-md-4" key={artist.id}>
              <div className="card">
                <img src={artist.images[0]?.url} alt={artist.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{artist.name}</h5>
                  <p className="card-text">Followers: {artist.followers.total}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Chargement des top artistes...</p>
      )}
    </div>
  );
};

export default UserProfile;
