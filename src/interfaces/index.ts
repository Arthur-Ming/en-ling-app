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

export interface IAction {
  type: string;
}

export interface ITextbookCardsAction extends IAction {
  error?: unknown | null;
  data?: ITextbookWord[] | null;
  page?: number;
  group?: number;
}

export interface IAudioAction extends IAction {
  error?: null | unknown;
  path?: string | null;
  wordId?: string | null;
}

export type SprintGameAnswer = Pick<ITextbookWord, 'id' | 'word' | 'wordTranslate' | 'audio'> & {
  isCorrectAnswer: boolean;
};

export type SprintGameStep = Pick<SprintGameAnswer, 'id' | 'word' | 'wordTranslate' | 'audio'> & {
  mockWordTranslate: string;
  isTrue: boolean;
};
