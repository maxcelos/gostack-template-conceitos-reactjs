import React, { useEffect, useState } from "react";
import api from "services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('repositories').then(response => {
          setRepositories(response.data);
      })
  }, []);

  async function handleAddRepository() {
      api.post('repositories', {
          title: 'repo ' + Date.now(),
          url: 'http://someurl.test',
          techs: ['node', 'react']
      }).then(response => {
          setRepositories([...repositories, response.data])
      })
  }


  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
        const repoIndex = repositories.findIndex(repository => repository.id === id);

        const newRepositories = [...repositories];

        newRepositories.splice(repoIndex, 1);

        setRepositories(newRepositories);
    })
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
