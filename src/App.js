import './App.css';
import { gql, useQuery } from '@apollo/client';

const profileQuery = gql`
  query ProfileQuery($username: String = "lisaweilguni") {
    user(login: $username) {
      name
      avatarUrl
      repositories(first: 10) {
        edges {
          node {
            name
            id
            url
          }
        }
      }
    }
  }
`;

function App() {
  const locations = window.location.href.split('/');
  let username = locations[locations.length - 1];
  if (username.length === 0) {
    username = undefined;
  }
  const { loading, error, data } = useQuery(profileQuery, {
    variables: { username },
  });

  if (loading) {
    return <h1>Hold your horses, I'm loading</h1>;
  }

  return (
    <div id="App">
      <h1>{data.user.name}</h1>
      <img src={data.user.avatarUrl} alt="profile" />
      <ul>
        {data.user.repositories.edges.map(({ node: { name, id, url } }) => (
          <li key={id}>
            <a href={url}>{name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
