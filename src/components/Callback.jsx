import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';

const Callback = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?'));
    const token = params.get('access_token');

    if (token) {
      setAccessToken(token);
      getUserData(token);
      getTopArtists(token);
      getTopTracks(token);
    }
  }, []);

  const getUserData = async (token) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUserData(data);
    }
  };

  const getTopArtists = async (token) => {
    const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setTopArtists(data.items);
    }
  };

  const getTopTracks = async (token) => {
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setTopTracks(data.items);
    }
  };

  const redirectToHomePage = () => {
    navigate('/');
  };

  if (!accessToken || !userData) {
    return <div>Connexion en cours avec Spotify...</div>;
  }

  return (
    <UserProfile
      userData={userData}
      topArtists={topArtists}
      topTracks={topTracks}
      onBack={redirectToHomePage}
    />
  );
};

export default Callback;
