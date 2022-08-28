type TextbookParam = string | number;

const clientRoutes = {
  root: '/',

  main: () => clientRoutes.root,
  textbook: {
    relative: 'textbook',
    absolute: () => `${clientRoutes.root}${clientRoutes.textbook.relative}`,
  },
  textbookWords: {
    relative: (page: TextbookParam = ':page', group: TextbookParam = ':group') =>
      `${page}/${group}`,
    absolute: (page?: TextbookParam, group?: TextbookParam) =>
      `${clientRoutes.textbook.absolute()}/${clientRoutes.textbookWords.relative(page, group)}`,
  },
};

export default clientRoutes;
