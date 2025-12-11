const { useState, useEffect } = React;

const STATIC_DB = [
    { id: 1, title: "Mad Max: Fury Road", genres: [28, 878], keywords: ["desert", "voiture", "survie", "futur"], poster: "/8tZYtuWezpScJiVJpTW84wa3Ft6.jpg", rating: 7.6, year: 2015, overview: "Dans un futur post-apocalyptique, Max s'allie à Furiosa pour fuir un tyran." },
    { id: 2, title: "John Wick 4", genres: [28, 53], keywords: ["tueur", "combat", "vengeance"], poster: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg", rating: 7.8, year: 2023, overview: "John Wick découvre un moyen de vaincre la Grande Table." },
    { id: 3, title: "The Dark Knight", genres: [28, 80], keywords: ["héros", "ville", "chaos", "batman"], poster: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: 8.5, year: 2008, overview: "Batman affronte le Joker qui plonge Gotham dans l'anarchie." },
    { id: 4, title: "Top Gun: Maverick", genres: [28, 12], keywords: ["avion", "pilote", "armée"], poster: "/z2yHg2P7F5z5X7i5J9s5X8d8.jpg", rating: 8.3, year: 2022, overview: "Maverick reprend du service pour former une nouvelle élite." },
    { id: 5, title: "Avatar 2", genres: [28, 12, 878], keywords: ["eau", "famille", "alien", "planète"], poster: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", rating: 7.7, year: 2022, overview: "Jake Sully et sa famille explorent les océans de Pandora." },
    { id: 6, title: "Gladiator", genres: [28, 18], keywords: ["rome", "combat", "épée", "histoire"], poster: "/ty8TGRuvJLPUmAR1HRIgyhvrORr.jpg", rating: 8.2, year: 2000, overview: "Un général romain déchu cherche à se venger de l'empereur corrompu." },
    { id: 7, title: "Inception", genres: [28, 878], keywords: ["rêve", "esprit", "complexe"], poster: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", rating: 8.4, year: 2010, overview: "Un voleur infiltre les rêves pour implanter une idée." },
    { id: 8, title: "Avengers: Endgame", genres: [28, 12, 878], keywords: ["superhéros", "fin", "combat"], poster: "/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg", rating: 8.3, year: 2019, overview: "Les Avengers tentent d'annuler les actions de Thanos." },
    { id: 10, title: "La Ligne Verte", genres: [18, 80], keywords: ["prison", "miracle", "triste"], poster: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg", rating: 8.6, year: 1999, overview: "Un gardien de prison découvre les dons d'un condamné à mort." },
    { id: 11, title: "Interstellar", genres: [18, 878], keywords: ["espace", "père", "temps", "futur"], poster: "/gEU2QniL6E8ahDaX06e8q62bq9.jpg", rating: 8.4, year: 2014, overview: "Un père voyage à travers l'espace pour sauver l'humanité." },
    { id: 12, title: "Forrest Gump", genres: [18, 35], keywords: ["vie", "destin", "histoire"], poster: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", rating: 8.8, year: 1994, overview: "La vie incroyable d'un homme simple d'esprit mais au grand cœur." },
    { id: 13, title: "Titanic", genres: [18, 10749], keywords: ["bateau", "amour", "catastrophe"], poster: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg", rating: 7.9, year: 1997, overview: "Une romance tragique à bord du célèbre paquebot." },
    { id: 14, title: "The Whale", genres: [18], keywords: ["obésité", "fille", "triste", "rédemption"], poster: "/bQ331n3tU5B6aW916f73y6K3qJp.jpg", rating: 7.5, year: 2022, overview: "Un professeur reclus tente de renouer avec sa fille." },
    { id: 15, title: "Parasite", genres: [18, 53], keywords: ["famille", "riche", "pauvre", "corée"], poster: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", rating: 8.5, year: 2019, overview: "Une famille pauvre infiltre une famille riche." },
    { id: 20, title: "Intouchables", genres: [35, 18], keywords: ["amitié", "handicap", "français"], poster: "/323BP0itPxTsO0ESvIQgwgkup3k.jpg", rating: 8.3, year: 2011, overview: "Une amitié improbable entre un aristocrate et un jeune de banlieue." },
    { id: 21, title: "Superbad", genres: [35], keywords: ["ado", "fête", "école", "alcool"], poster: "/3Z50P6O0i0eP5y6iAsxXv6x6y4e.jpg", rating: 7.1, year: 2007, overview: "Deux amis tentent d'acheter de l'alcool pour une fête." },
    { id: 22, title: "Barbie", genres: [35, 12], keywords: ["poupée", "rose", "femme"], poster: "/fNtqD4BTFj0Bgo9lyoAufCaVEjx.jpg", rating: 7.2, year: 2023, overview: "Barbie découvre le monde réel et ses imperfections." },
    { id: 23, title: "The Truman Show", genres: [35, 18], keywords: ["tv", "réalité", "faux"], poster: "/a50S24fTf8f5v0h0h0h0.jpg", rating: 8.1, year: 1998, overview: "Un homme découvre que sa vie est une émission de télé." }, 
    { id: 24, title: "Very Bad Trip", genres: [35], keywords: ["vegas", "mariage", "fête", "alcool"], poster: "/a3yWd6D5h9H7J7f6s4P8k5z4l9.jpg", rating: 7.7, year: 2009, overview: "Un lendemain de fête difficile à Las Vegas." },
    { id: 30, title: "Ça (It)", genres: [27], keywords: ["clown", "enfant", "peur"], poster: "/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg", rating: 7.2, year: 2017, overview: "Un clown terrorise les enfants de Derry." },
    { id: 31, title: "Get Out", genres: [27, 53], keywords: ["racisme", "mystère", "famille"], poster: "/tFXcEccSQMf3lfhfXKSUK47qVA.jpg", rating: 7.6, year: 2017, overview: "Un week-end chez les beaux-parents tourne au cauchemar." },
    { id: 32, title: "Alien", genres: [27, 878], keywords: ["espace", "monstre", "vaisseau"], poster: "/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg", rating: 8.1, year: 1979, overview: "Un équipage affronte une créature parfaite et tueuse." },
    { id: 33, title: "Conjuring", genres: [27, 53], keywords: ["fantôme", "maison", "possédé"], poster: "/wVYREutTvI2tmxr6jaUDQA1wNZQ.jpg", rating: 7.5, year: 2013, overview: "Les Warren enquêtent sur une ferme hantée." },
    { id: 34, title: "Hérédité", genres: [27, 18], keywords: ["famille", "démon", "deuil"], poster: "/p9fopBkYOf5p7MNl0sWjHk3tq.jpg", rating: 7.3, year: 2018, overview: "L'héritage terrifiant d'une famille après un décès." },
    { id: 40, title: "Blade Runner 2049", genres: [878, 18], keywords: ["robot", "futur", "ia", "enquête"], poster: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", rating: 8.0, year: 2017, overview: "Un replicant découvre un secret qui pourrait changer le monde." },
    { id: 41, title: "Dune", genres: [878, 12], keywords: ["désert", "épice", "politique"], poster: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg", rating: 7.9, year: 2021, overview: "Paul Atreides doit survivre sur la planète la plus dangereuse." },
    { id: 42, title: "Arrival", genres: [878, 18], keywords: ["alien", "langue", "communication"], poster: "/h11Rj8Vv0G1P7b8P7b8P7.jpg", rating: 7.9, year: 2016, overview: "Une linguiste tente de communiquer avec des extraterrestres." }
];

const AIService = {
    calculateScore: (movie, moodCriteria, userQuery = "") => {
        let score = 0;
        
        const hasGenre = movie.genres.some(g => moodCriteria.genres.includes(g));
        if (hasGenre) score += 50;

        const queryLower = userQuery.toLowerCase();
        const matchedKeyword = movie.keywords.some(k => queryLower.includes(k) || moodCriteria.tags.includes(k));
        if (matchedKeyword) score += 30;

        if (userQuery && movie.title.toLowerCase().includes(queryLower)) score += 100;
        if (userQuery && movie.keywords.some(k => queryLower.includes(k))) score += 40;

        score += (movie.rating * 2);

        if (movie.year > 2020) score += 10;

        return score;
    },

    search: (moodId, searchQuery) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let criteria = { genres: [], tags: [] };
                
                switch(moodId) {
                    case 'laugh': criteria = { genres: [35], tags: ["fête", "amis"] }; break;
                    case 'adrenaline': criteria = { genres: [28, 12], tags: ["combat", "voiture"] }; break;
                    case 'cry': criteria = { genres: [18], tags: ["triste", "amour", "mort"] }; break;
                    case 'scare': criteria = { genres: [27, 53], tags: ["peur", "monstre"] }; break;
                    case 'think': criteria = { genres: [878, 9648], tags: ["ia", "futur", "esprit"] }; break;
                    default: criteria = { genres: [], tags: [] };
                }

                const results = STATIC_DB.map(movie => ({
                    ...movie,
                    matchScore: AIService.calculateScore(movie, criteria, searchQuery)
                }))
                .filter(m => m.matchScore > 40)
                .sort((a, b) => b.matchScore - a.matchScore);

                resolve(results);
            }, 800);
        });
    }
};

const App = () => {
    const [query, setQuery] = useState("");
    const [activeMood, setActiveMood] = useState(null);
    const [movies, setMovies] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [view, setView] = useState("home"); 
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleSearch = async (moodId, customQuery = "") => {
        setIsAnalyzing(true);
        setActiveMood(moodId);
        setView("results");
        setMovies([]); 

        const results = await AIService.search(moodId, customQuery);
        setMovies(results);
        setIsAnalyzing(false);
    };

    const handleManualSearch = (e) => {
        e.preventDefault();
        handleSearch(activeMood || 'all', query);
    };

    return (
        <div className="min-h-screen bg-ai-bg text-gray-100 flex flex-col font-sans">
            <nav className="border-b border-white/10 bg-ai-bg/80 backdrop-blur-md sticky top-0 z-40">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView("home"); setActiveMood(null); }}>
                        <div className="w-8 h-8 rounded bg-gradient-to-tr from-ai-accent to-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        </div>
                        <span className="font-bold text-xl tracking-tight">CinéMatch <span className="text-ai-accent">AI</span> <span className="text-xs text-gray-500 font-normal border border-gray-700 px-1 rounded">v3.0</span></span>
                    </div>
                    
                    <form onSubmit={handleManualSearch} className="hidden md:flex relative group">
                        <input 
                            type="text" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Décrivez votre envie (ex: 'Espace', 'Triste')..." 
                            className="bg-ai-card border border-gray-700 rounded-full py-2 px-5 pl-10 w-80 text-sm focus:border-ai-accent focus:ring-1 focus:ring-ai-accent outline-none transition-all placeholder-gray-600"
                        />
                        <svg className="w-4 h-4 absolute left-3.5 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </form>
                </div>
            </nav>

            <main className="flex-grow container mx-auto px-4 py-8 relative">
                {view === "home" && (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
                        <div className="mb-8 relative">
                            <div className="absolute inset-0 bg-ai-accent/20 blur-3xl rounded-full"></div>
                            <h1 className="relative text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
                                L'IA qui connaît <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-accent to-blue-400">vos émotions.</span>
                            </h1>
                        </div>
                        <p className="text-gray-400 max-w-xl mb-12 text-lg">
                            Notre algorithme analyse +50 points de données pour trouver le film parfait. Dites-nous simplement ce que vous ressentez.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-4xl">
                            {[
                                {id: 'laugh', label: 'Rire', icon: '🤣', color: 'hover:border-yellow-500 hover:shadow-yellow-500/20'},
                                {id: 'adrenaline', label: 'Adrénaline', icon: '🔥', color: 'hover:border-red-500 hover:shadow-red-500/20'},
                                {id: 'cry', label: 'Émotion', icon: '😭', color: 'hover:border-blue-500 hover:shadow-blue-500/20'},
                                {id: 'scare', label: 'Frisson', icon: '👻', color: 'hover:border-gray-500 hover:shadow-gray-500/20'},
                                {id: 'think', label: 'Réfléchir', icon: '🧠', color: 'hover:border-purple-500 hover:shadow-purple-500/20'},
                            ].map(mood => (
                                <button 
                                    key={mood.id}
                                    onClick={() => handleSearch(mood.id)}
                                    className={`bg-ai-card border border-white/5 p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-[#202025] flex flex-col items-center gap-3 group ${mood.color}`}
                                >
                                    <span className="text-3xl group-hover:scale-110 transition-transform">{mood.icon}</span>
                                    <span className="font-medium text-gray-300 group-hover:text-white">{mood.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {view === "results" && (
                    <div className="w-full">
                        <div className="flex items-center justify-between mb-8">
                            <button onClick={() => setView("home")} className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                                Retour
                            </button>
                            <h2 className="text-xl font-semibold">
                                {isAnalyzing ? "Analyse en cours..." : <span className="flex items-center gap-2">Résultats <span className="bg-ai-accent/20 text-ai-accent text-xs px-2 py-0.5 rounded border border-ai-accent/30">{movies.length} films</span></span>}
                            </h2>
                        </div>

                        {isAnalyzing ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="relative w-24 h-24 mb-6">
                                    <div className="absolute inset-0 border-4 border-ai-card rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-t-ai-accent rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-ai-accent animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                                    </div>
                                </div>
                                <div className="font-mono text-sm text-ai-accent">
                                    > Initializing Neural Net...<br/>
                                    > Matching keywords: {activeMood || "Custom"}...<br/>
                                    > Calculating relevance scores...
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {movies.length > 0 ? (
                                    movies.map((movie, idx) => (
                                        <div 
                                            key={movie.id} 
                                            onClick={() => setSelectedMovie(movie)}
                                            className="group relative bg-ai-card rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-ai-accent/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] animate-[fadeIn_0.5s_ease-out_forwards]"
                                            style={{animationDelay: `${idx * 50}ms`}}
                                        >
                                            <div className="absolute top-2 right-2 z-20 bg-black/70 backdrop-blur text-xs font-bold px-2 py-1 rounded text-ai-accent border border-ai-accent/30">
                                                {movie.matchScore} pts
                                            </div>

                                            <div className="aspect-[2/3] w-full relative overflow-hidden bg-gray-900">
                                                <img 
                                                    src={`https://image.tmdb.org/t/p/w500${movie.poster}`} 
                                                    alt={movie.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className="hidden absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 items-center justify-center flex-col p-4 text-center">
                                                    <span className="text-4xl mb-2">🎬</span>
                                                    <span className="text-xs text-gray-500">{movie.title}</span>
                                                </div>
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90">
                                                <div className="absolute bottom-0 p-4 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <h3 className="font-bold text-white text-lg leading-tight mb-1">{movie.title}</h3>
                                                    <p className="text-xs text-gray-400 line-clamp-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{movie.overview}</p>
                                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                                                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded">{movie.year}</span>
                                                        <span className="text-[10px] bg-ai-accent/20 text-ai-accent px-2 py-0.5 rounded border border-ai-accent/20">Recommandé</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-20 text-gray-500">
                                        Aucun résultat ne correspond à cette recherche neurale.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </main>

            {selectedMovie && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60" onClick={() => setSelectedMovie(null)}>
                    <div className="bg-ai-card w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row max-h-[90vh]" onClick={e => e.stopPropagation()}>
                        <div className="w-full md:w-1/3 aspect-[2/3] md:aspect-auto relative">
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster}`} 
                                className="w-full h-full object-cover" 
                                onError={(e) => e.target.src = 'https://via.placeholder.com/500x750/111/fff?text=No+Image'}
                            />
                        </div>
                        <div className="flex-1 p-8 flex flex-col overflow-y-auto">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-1">{selectedMovie.title}</h2>
                                    <div className="flex gap-3 text-sm text-gray-400">
                                        <span>{selectedMovie.year}</span>
                                        <span>•</span>
                                        <span className="text-ai-accent">Score IA: {selectedMovie.matchScore}/100</span>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedMovie(null)} className="p-2 hover:bg-white/10 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
                            </div>

                            <div className="mb-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {selectedMovie.keywords.map(k => (
                                        <span key={k} className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">#{k}</span>
                                    ))}
                                </div>
                                <p className="text-gray-300 leading-relaxed text-lg">{selectedMovie.overview}</p>
                            </div>

                            <div className="mt-auto grid gap-3">
                                <a href={`https://www.youtube.com/results?search_query=Bande+annonce+${selectedMovie.title}+VF`} target="_blank" className="bg-ai-accent hover:bg-violet-600 text-white font-bold py-3 px-4 rounded-xl text-center transition-colors flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                                    Regarder la bande-annonce
                                </a>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 rounded-xl font-medium border border-gray-700">Déjà vu</button>
                                    <button className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 rounded-xl font-medium border border-gray-700">À voir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);