import { Pic } from './pic';
export interface PicList {
  total: number;
  totalHits: number;
  hits?: Pic[];
}
