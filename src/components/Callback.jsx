import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile';

const Callback = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [recentlyAddedAlbums, setRecentlyAddedAlbums] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?'));
    const token = params.get('access_token');

    if (token) {
      setAccessToken(token);
      getUserData(token);
      getTopArtists(token);
      getTopTracks(token);
      getPlaylists(token);
      getRecentlyPlayed(token);
      getRecentlyAddedAlbums(token);
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

  const getPlaylists = async (token) => {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setPlaylists(data.items);
    }
  };

  const getRecentlyPlayed = async (token) => {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setRecentlyPlayed(data.items);
    }
  };

  const getRecentlyAddedAlbums = async (token) => {
    const response = await fetch('https://api.spotify.com/v1/me/albums', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setRecentlyAddedAlbums(data.items);
    }
  };

  if (!accessToken || !userData) {
    return <div>Connexion en cours avec Spotify...</div>;
  }

  return (
    <UserProfile
      userData={userData}
      topArtists={topArtists}
      topTracks={topTracks}
      playlists={playlists}
      recentlyPlayed={recentlyPlayed}
      recentlyAddedAlbums={recentlyAddedAlbums}
    />
  );
};

export default Callback;
