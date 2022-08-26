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

export interface IActionCallApi extends IAction {
  CallAPI: string;
}

export interface ITextbookCardsAction extends IActionCallApi {
  error: unknown | null;
  data: ITextbookWord[] | null;
  page: number;
  group: number;
}

/* export interface ITextbookPageChangeAction extends IAction {
  page: number;
} */
