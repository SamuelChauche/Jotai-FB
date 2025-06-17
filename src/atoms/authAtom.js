import { atom } from 'jotai';

// Charger l'utilisateur depuis le localStorage au démarrage
const initialUser = JSON.parse(localStorage.getItem('user')) || null;

export const userAtom = atom(initialUser);
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);