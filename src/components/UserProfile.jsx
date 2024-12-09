import React, { useState, useEffect } from 'react';
import '../style/UserProfile.css'; // Ajoutez ce fichier pour styliser le composant

const UserProfile = ({ userData, topArtists, topTracks, playlists, recentlyAddedAlbums, onBack }) => {
    const [category, setCategory] = useState('artists'); // Basculer entre artistes et chansons
    const [itemsToShow, setItemsToShow] = useState({
        artists: 10,
        tracks: 10,
        albums: 10,
        playlists: 10,
    });
    const [isDarkMode, setIsDarkMode] = useState(true); // Mode sombre
    const [searchTerm, setSearchTerm] = useState(''); // Terme de recherche

    // Fonction pour basculer entre Dark et Light Mode
    useEffect(() => {
        document.body.style.backgroundColor = isDarkMode ? '#121212' : '#fff';
        document.body.style.color = isDarkMode ? 'white' : 'black';
    }, [isDarkMode]);

    const handleItemsToShowChange = (category, value) => {
        setItemsToShow((prev) => ({
            ...prev,
            [category]: Number(value),
        }));
    };

    const filteredResults = (items, categoryKey) => {
        if (!searchTerm) return items;
        return items.filter((item) => {
            const name = categoryKey === 'albums' || categoryKey === 'playlists'
                ? item.name || item.album?.name || ''
                : item.name;
            return name.toLowerCase().includes(searchTerm.toLowerCase());
        });
    };

    const handleBackToHome = () => {
        window.location.href = '/'; // Redirige vers la page principale
    };

    return (
        <div className="container">
            <h1 className="text-center">Bienvenue, {userData?.display_name}</h1>

            <div className="header">
                <button className="btn" onClick={handleBackToHome}>
                    Retour à l'accueil
                </button>
                <button className="btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? 'Passer au mode clair' : 'Passer au mode sombre'}
                </button>
            </div>

            {/* Barre de recherche */}
            <div className="search-bar">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <br></br>

            {/* Menu de navigation */}
            <div className="nav-tabs">
                {['artists', 'tracks', 'albums', 'playlists'].map((cat) => (
                    <button
                        key={cat}
                        className={`nav-link ${category === cat ? 'active' : ''}`}
                        onClick={() => setCategory(cat)}
                    >
                        {cat === 'artists'
                            ? 'Top Artistes'
                            : cat === 'tracks'
                            ? 'Top Chansons'
                            : cat === 'albums'
                            ? 'Albums Récemment Ajoutés'
                            : 'Playlists'}
                    </button>
                ))}
            </div>

            {/* Section d'affichage des résultats */}
            <div className="content">
                {['artists', 'tracks', 'albums', 'playlists'].map(
                    (cat) =>
                        category === cat && (
                            <div key={cat}>
                                <div className="section-header">
                                    <h3>
                                        {cat === 'artists'
                                            ? 'Top Artistes'
                                            : cat === 'tracks'
                                            ? 'Top Chansons'
                                            : cat === 'albums'
                                            ? 'Albums Récemment Ajoutés'
                                            : 'Vos Playlists'}
                                    </h3>
                                    <select
                                        className="form-select"
                                        value={itemsToShow[cat]}
                                        onChange={(e) => handleItemsToShowChange(cat, e.target.value)}
                                    >
                                        {[10, 15, 20, 25].map((num) => (
                                            <option key={num} value={num}>
                                                {num}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid">
                                    {filteredResults(
                                        cat === 'artists'
                                            ? topArtists
                                            : cat === 'tracks'
                                            ? topTracks
                                            : cat === 'albums'
                                            ? recentlyAddedAlbums
                                            : playlists,
                                        cat
                                    )
                                        .filter((item) => item !== null)
                                        .slice(0, itemsToShow[cat])
                                        .map((item, index) => (
                                            <div className="card" key={index}>
                                                <img
                                                    src={
                                                        item.images?.[0]?.url ||
                                                        item.album?.images?.[0]?.url ||
                                                        'https://via.placeholder.com/200'
                                                    }
                                                    alt={item.name}
                                                    className="card-img"
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        {item.name || item.album?.name}
                                                    </h5>
                                                    {cat === 'artists' && (
                                                        <p>
                                                            Followers: {item.followers?.total.toLocaleString()}
                                                        </p>
                                                    )}
                                                    {cat === 'tracks' && (
                                                        <p>
                                                            {item.artists.map((a) => a.name).join(', ')}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default UserProfile;
