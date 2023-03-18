export interface ITextbookWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export type DifficultyUserWord = 'easy' | 'hard' | null;

export interface IUser {
  name: string;
  id: string;
  token: string;
  email: string;
}

export interface ITextbookUserWord {
  difficulty: DifficultyUserWord;
  optional?: unknown;
  wordId: string;
  id: string;
}

export interface IPaginatedResult extends Omit<ITextbookWord, 'id'> {
  _id: string;
  userWord?: {
    difficulty: DifficultyUserWord;
  };
}

interface ITotalCount {
  count: number;
}

export interface IAggregatedWord {
  paginatedResults: IPaginatedResult[];
  totalCount: ITotalCount[];
}

export interface IAction {
  type: string;
}

export interface ITextbookCardsAction extends IAction {
  error?: unknown | null;
  data?: ITextbookWord[] | null;
  page?: number;
  group?: number;
}

export interface IUpdateUsersWordsAction extends IAction {
  wordId: string;
  userWord?: {
    difficulty: DifficultyUserWord;
  };
}

export interface IDeleteUsersWordsAction extends IAction {
  wordId: string;
}
export interface IAddUsersWordsAction extends IAction {
  word: IPaginatedResult;
  userWord?: {
    difficulty: DifficultyUserWord;
  };
}

export interface ITextbookUserWordAction extends IAction {
  error?: unknown | null;
  data?: IPaginatedResult[] | null;
}

export interface IAudioAction extends IAction {
  error?: null | unknown;
  path?: string | null;
  wordId?: string | null;
}

export interface ISignInAction extends IAction {
  userName?: string;
  error?: null | unknown;
}

export type SprintGameAnswer = Pick<ITextbookWord, 'id' | 'word' | 'wordTranslate' | 'audio'> & {
  isCorrectAnswer: boolean;
};

export type SprintGameStep = Pick<SprintGameAnswer, 'id' | 'word' | 'wordTranslate' | 'audio'> & {
  mockWordTranslate: string;
  isTrue: boolean;
};

type DefaultPoints = 0;
type PointsForCorrectAnswer = 10 | 20;
type PointsForWrongAnswer = -10 | -20;
export type SprintGamePoints = DefaultPoints | PointsForCorrectAnswer | PointsForWrongAnswer;

export interface ILoginBody {
  email: string;
  password: string;
}

export interface ISuccessfulLogin {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface ISuccessfulUserById {
  name: string;
  email: string;
  password: string;
}
