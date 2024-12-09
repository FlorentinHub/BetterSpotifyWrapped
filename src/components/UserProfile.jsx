import React, { useState, useEffect } from 'react';

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

    const cardStyle = { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' };
    const imageStyle = { height: '200px', objectFit: 'cover' };
    const handleBackToHome = () => {
        window.location.href = '/';  // Redirige vers la page principale
      };
    return (
        <div className="container mt-5">
            <h1 className="text-center">Bienvenue, {userData?.display_name}</h1>

            <div className="d-flex justify-content-between my-3">
                <button className="btn btn-secondary" onClick={handleBackToHome}>Retour à l'accueil</button>

                <button
                    className="btn btn-outline-light"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                >
                    {isDarkMode ? 'Passer au mode clair' : 'Passer au mode sombre'}
                </button>
            </div>

            {/* Barre de recherche */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Menu de navigation */}
            <ul className="nav nav-tabs">
                {['artists', 'tracks', 'albums', 'playlists'].map((cat) => (
                    <li className="nav-item" key={cat}>
                        <button
                            className={`nav-link ${category === cat ? 'active' : ''}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat === 'artists' ? 'Top Artistes' :
                                cat === 'tracks' ? 'Top Chansons' :
                                    cat === 'albums' ? 'Albums Récemment Ajoutés' : 'Playlists'}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Section d'affichage des résultats */}
            <div className="mt-4">
                {['artists', 'tracks', 'albums', 'playlists'].map((cat) => (
                    category === cat && (

                        <div key={cat}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3>{cat === 'artists' ? 'Top Artistes' :
                                cat === 'tracks' ? 'Top Chansons' :
                                    cat === 'albums' ? 'Albums Récemment Ajoutés' : 'Vos Playlists'}</h3>

                            {/* Contrôle pour le nombre d'éléments */}
                            <div className="mb-3">
                                <label>
                                    <select
                                        className="form-select w-auto form-select"
                                        value={itemsToShow[cat]}
                                        onChange={(e) => handleItemsToShowChange(cat, e.target.value)}
                                    >
                                        {[10, 15, 20, 25].map((num) => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            </div>

                            <div className="row g-3">
                                {filteredResults(
                                    cat === 'artists' ? topArtists :
                                        cat === 'tracks' ? topTracks :
                                            cat === 'albums' ? recentlyAddedAlbums :
                                                playlists,
                                    cat
                                )
                                .filter((item) => item !== null)
                                .slice(0, itemsToShow[cat]).map((item, index) => (
                                    <div className="col-12 col-md-4 col-lg-3" key={index}>
                                        <div className="card" style={cardStyle}>
                                            <img
                                                src={item.images?.[0]?.url || item.album?.images?.[0]?.url || 'https://via.placeholder.com/200'}
                                                alt={item.name}
                                                className="card-img-top"
                                                style={imageStyle}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title text-truncate">{item.name || item.album?.name}</h5>
                                                {cat === 'artists' && <p className="card-text">{item.followers?.total.toLocaleString()}</p>}
                                                {cat === 'tracks' && <p className="card-text">{item.artists.map((a) => a.name).join(', ')}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default UserProfile;
