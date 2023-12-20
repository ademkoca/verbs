export interface Option {
  title: string;
  description: string;
}

export interface Progress {
  name: string;
  used: string[];
  totalGuesses: number;
  correctGuesses: number;
}
