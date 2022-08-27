export const apiRoutes = {
  root: 'https://react-learnwords-example.herokuapp.com',

  files: (file: string) => `${apiRoutes.root}/${file}`,
  words: (page: number, group: number) => `${apiRoutes.root}/words?page=${page}&group=${group}`,
};
