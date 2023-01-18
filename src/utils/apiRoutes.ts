export const apiRoutes = {
  root: 'http://localhost:8000',

  files: (file: string) => `${apiRoutes.root}/${file}`,
  words: (page: number, group: number) => `${apiRoutes.root}/words?page=${page}&group=${group}`,
  usersWords: (userId: string) => `${apiRoutes.root}/users/${userId}/words`,
  usersWordsById: (userId: string, wordId: string) =>
    `${apiRoutes.root}/users/${userId}/words/${wordId}`,
  usersAggregatedWords: (userId: string) =>
    `${apiRoutes.root}/users/${userId}/aggregatedWords?filter={"$or":[{"userWord.difficulty":"easy"},{"userWord.difficulty":"hard"}]}`,

  signin: () => `${apiRoutes.root}/signin`,
  userById: (userId: string) => `${apiRoutes.root}/users/${userId}`,
};
