import { join } from 'path-browserify';

export const apiRoutes = {
  root: 'https://react-learnwords-example.herokuapp.com',

  img: {
    relative: '',
    absolute: (image: string) => `${apiRoutes.root}/${image}`,
  },
};
