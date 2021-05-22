import { EntityName, userDataEntityCollectionPath } from '@easy-expense/data-schema-v2';

import { currentUser, useUser } from './Auth.backend';
import { fuego } from './General.backend';

export function firestoreCollectionRef(entity: EntityName) {
  const userId = currentUser()?.uid ?? `none`;
  return fuego.db.collection(userDataEntityCollectionPath(userId, entity));
}

export function firestoreCollectionPath(entity: EntityName) {
  const userId = currentUser()?.uid ?? null;
  return userId ? userDataEntityCollectionPath(userId, entity) : null;
}

export function useFirestoreCollectionPath(entity: EntityName) {
  const user = useUser();
  return user ? userDataEntityCollectionPath(user.uid, entity) : null;
}

export function useFirestoreDocumentPath(entity: EntityName, key: string) {
  const user = useUser();
  return user ? `${userDataEntityCollectionPath(user.uid, entity)}/${key}` : null;
}

// TODO: get personal user data
