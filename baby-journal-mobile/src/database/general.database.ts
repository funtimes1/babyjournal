import { useUser } from '../backend/Auth.backend';

type EntityCollectionName = 'journal-entries' | 'user-profiles';

export function useFirestoreCollectionPath(entity: EntityCollectionName) {
  const user = useUser();
  return user ? `users/${user.uid}/${entity}` : null;
}
