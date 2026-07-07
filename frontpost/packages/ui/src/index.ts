export { frontpostTokens } from './tokens';
export type { FrontpostTokens } from './tokens';

export type PaperCardProps = {
  title: string;
  source: string;
  summary: string;
  topics: string[];
  saved?: boolean;
};
