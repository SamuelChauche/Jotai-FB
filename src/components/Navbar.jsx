// import { Link } from 'react-router-dom';
// import { useAtom } from 'jotai';
// import { isAuthenticatedAtom, userAtom, jwtAtom } from '../atoms/auth';

// const Navbar = () => {
//     const [isAuthenticated] = useAtom(isAuthenticatedAtom);
//     const [user] = useAtom(userAtom);
//     const [, setJwt] = useAtom(jwtAtom);

//     const handleLogout = () => {
//         setJwt(null);
//         localStorage.removeItem('jwt');
//     };

//     return (
//         <nav>
//             <Link to="/">Accueil</Link>
//             {isAuthenticated ? (
//                 <>
//                     <span>Bonjour, {user?.username}</span>
//                     <button onClick={handleLogout}>Déconnexion</button>
//                 </>
//             ) : (
//                 <Link to="/auth">Connexion</Link>
//             )}
//         </nav>
//     );
// };

// export default Navbar;