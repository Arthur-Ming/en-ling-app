import { SprintGameAnswer, SprintGamePoints, ISprintResult } from '../../interfaces';

export const getResult = (
  answers: SprintGameAnswer[],
  gamePoints: SprintGamePoints[]
): ISprintResult[] => {
  return answers.map((item, index) => ({
    ...item,
    points: gamePoints[index],
  }));
};
