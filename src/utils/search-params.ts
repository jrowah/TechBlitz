import { QuestionDifficulty } from '@/types/Questions';

export interface FilterParams {
  // pagination
  page: number;
  // sorting
  ascending: boolean;
  sortBy: string;
  // filters
  difficulty?: QuestionDifficulty;
  completed?: boolean;
  tags: string[];
  questionType?: string;
}

export const parseSearchParams = (searchParams: {
  [key: string]: string | string[] | undefined;
}): FilterParams => {
  return {
    page: parseInt(searchParams.page as string) || 1,
    ascending: searchParams.ascending === 'true',
    sortBy: searchParams.sortBy as string,
    difficulty: searchParams.difficulty as QuestionDifficulty,
    completed:
      'completed' in searchParams
        ? searchParams.completed === 'true'
        : undefined,
    tags: (searchParams.tags as string)?.split(',').filter(Boolean) || [],
    questionType: searchParams.questionType as string,
  };
};

export const validateSearchParams = (params: FilterParams): boolean => {
  if (params.page < 1) return false;
  return true;
};
