type Param = string | number;

const clientRoutes = {
  root: '/',

  main: () => clientRoutes.root,
  textbook: {
    relative: () => 'textbook',
    absolute: () => `${clientRoutes.root}${clientRoutes.textbook.relative()}`,
    words: {
      relative: (page: Param = ':page', group: Param = ':group') => `${page}/${group}`,
      absolute: (page?: Param, group?: Param) =>
        `${clientRoutes.textbook.absolute()}/${clientRoutes.textbook.words.relative(page, group)}`,
    },
  },
  games: {
    relative: () => 'games',
    absolute: () => `${clientRoutes.root}${clientRoutes.games.relative()}`,
  },
  sprint: {
    relative: () => 'sprint',
    absolute: () => `${clientRoutes.root}${clientRoutes.sprint.relative()}`,
    round: {
      relative: (group: Param = ':group') => `${group}`,
      absolute: (group?: Param) =>
        `${clientRoutes.sprint.absolute()}/${clientRoutes.sprint.round.relative(group)}`,
    },
  },
};

export default clientRoutes;
