/**
 * Generate uniq uuid.
 * @returns {String: uuid}
 */
export const uuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
});

/**
 * Map the sessions given by key.
 * @param sessions
 * @param entityKey
 * @param _brorId
 * @returns A array of sessions.
 */
export const mapSessions = (sessions = [], entityKey, _brorId) => sessions.filter(s => s[entityKey] === _brorId);
