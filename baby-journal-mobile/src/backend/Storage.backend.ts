import { currentUser, useUser } from './Auth.backend';
import { fuego } from './General.backend';

type EntityName = 'journal-entries' | 'user-profiles';

function userDataEntityCollectionPath(userId: string, entity: EntityName) {
  return `users/${userId}/${entity}`;
}

export function storageCollectionRef(entity: EntityName, path?: string) {
  const userId = currentUser()?.uid ?? `none`;
  return fuego
    .storage()
    .ref(`${userDataEntityCollectionPath(userId, entity)}${path ? `/${path}` : ``}`);
}
