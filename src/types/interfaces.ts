export interface Option {
  title: string;
  description: string;
}

export type Article = 'der' | 'die' | 'das';

export interface Verb {
  original: string;
  preterite: string;
  pastParticiple: string;
  translation: string;
}

export interface Noun {
  article: Article;
  original: string;
  translation: string;
}

export interface PossibleTranslation {
  possibleTranslation: string;
  isCorrectTranslation: boolean;
}

export interface DictionaryWord {
  article: Article;
  original: string;
  translation: PossibleTranslation[];
}

export interface Sentence {
  original: string;
  translation: string;
  // other correct word orders built from the same words (capitalisation may differ)
  alternatives?: string[];
}

export type ProgressName = 'verbs' | 'articles' | 'sentences' | 'dictionary';

export interface Progress {
  name: ProgressName;
  used: string[];
  totalGuesses: number;
  correctGuesses: number;
}

export interface IChat {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IMessage {
  chatId: string;
  senderId: string;
  text: string;
  isRead: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export type ButtonColors =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'home'
  | 'verbs'
  | 'articles'
  | 'sentences'
  | 'dictionary';
