type Key = 'view' | 'remove';
type Id = string;

/* get local storage state */
const getLocalState = (key: Key): string[] => JSON.parse( localStorage.getItem(key) || '[]');

/* add local storage state */
const addLocalState = (key: Key, id: Id) => {
  const oldState = getLocalState(key);
  /* if id does not already exist */
  if (!oldState.includes(id)) {
    const newState = [...oldState, id];
    localStorage.setItem(key, JSON.stringify(newState))
  }
};

/* remove local storage state */
const removeLocalState = (key: Key, id: Id) => {
  const newState = getLocalState(key).filter( localId => localId !== id );
  localStorage.setItem(key, JSON.stringify(newState))
};

/* reset local storage state */
const resetLocalState = (key: Key) => localStorage.removeItem(key);

export { getLocalState, addLocalState, removeLocalState, resetLocalState }
