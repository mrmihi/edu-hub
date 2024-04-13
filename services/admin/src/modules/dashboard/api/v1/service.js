import { traced } from '@sliit-foss/functions';
import { getCollectionTotals, getProfits } from '../../repository';

export const getSystemTotalsSvc = () => {
  return traced(getCollectionTotals)();
};

export const getProfitsSvc = () => {
  return traced(getProfits)();
};
