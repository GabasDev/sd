import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.api-futebol.com.br/v1/campeonatos', {
          headers: {
            'Authorization': 'Bearer live_d1c364833a7e8e5d4a9827eaac7bec',
          },
        });
        setTeams(response.data);
      } catch (error) {
        setError('Erro ao buscar dados');
      }
      setLoading(false);
    };

    fetchTeams();
  }, []);

  return (
    <div className="app">
      <h1 className="title">Campeonatos de Futebol</h1>
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="team-container">
          {teams.map((team, index) => (
            <div key={index} className="team-card">
              <div className="team-info">
                <h2 className="team-name">{team.nome}</h2>
                <p className="team-year">Ano: {team.ano}</p>
              </div>
              <button className="view-button">Ver Detalhes</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
