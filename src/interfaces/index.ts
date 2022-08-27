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

/* export interface ITextbookPageChangeAction extends IAction {
  page: number;
} */
