import { useSelector } from 'react-redux';
import { useHistory } from'react-router-dom';

function User() {
  const history = useHistory();
  const sessionUser = useSelector(state =>  state.session.user);
  // const [user, setUser] = useState({});
  // const { userId }  = useParams();

  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const user = await response.json();
  //     setUser(user);
  //   })();
  // }, [userId]);

  if (!sessionUser) {
    history.push('/');
  }

  return (
    <ul>
      <li>
        <strong>User Id</strong> {sessionUser.id}
      </li>
      <li>
        <strong>Username</strong> {sessionUser.username}
      </li>
      <li>
        <strong>Email</strong> {sessionUser.email}
      </li>
    </ul>
  );
}
export default User;
