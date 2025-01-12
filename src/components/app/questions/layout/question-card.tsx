import { QuestionWithoutAnswers } from '@/types/Questions';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import TagDisplay from '@/components/app/questions/previous/tag-display';
import { getQuestionStats } from '@/utils/data/questions/get-question-stats';
import Link from 'next/link';
import Chip from '@/components/ui/chip';
import { Suspense } from 'react';
import { ChevronRight } from 'lucide-react';
import { Circle } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { Answer } from '@/types/Answers';

// separate async component for stats to avoid blocking render
async function QuestionStats({
  identifier,
  value,
}: {
  identifier: 'slug' | 'uid';
  value: string;
}) {
  const stats = await getQuestionStats(identifier, value);
  return (
    <div className="text-start text-[10px]">
      <p className="font-ubuntu text-sm">
        Submissions:{' '}
        <span className="font-medium">{stats.totalSubmissions}</span>
      </p>
    </div>
  );
}

export default function QuestionCard(opts: {
  questionData: QuestionWithoutAnswers & { userAnswers: Answer[] };
  showSubmissions?: boolean;
  numberOfTags?: number;
  showcaseTag?: string;
  identifier: 'slug' | 'uid';
  customQuestion?: boolean;
}) {
  const {
    questionData,
    showSubmissions = true,
    numberOfTags = 3,
    showcaseTag,
    identifier = 'slug',
    customQuestion = false,
  } = opts;

  // if identifier is uid, this is a custom question
  const href =
    identifier === 'uid'
      ? `/question/custom/${questionData[identifier]}`
      : `/question/${questionData[identifier]}`;

  return (
    <Link
      href={href}
      key={questionData.uid}
      className="flex flex-col space-y-5 items-start bg-black-75 border border-black-50 hover:border-accent duration-300 p-5 rounded-lg group w-full relative overflow-hidden"
    >
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex w-full justify-between items-center">
          <h6 className="text-base text-wrap text-start line-clamp-2 flex-grow">
            {questionData?.question}
          </h6>
        </div>
        {showSubmissions && (
          <Suspense
            fallback={
              <div className="text-start text-[10px]">
                <p className="font-ubuntu text-sm">Loading stats...</p>
              </div>
            }
          >
            <QuestionStats
              identifier={identifier}
              value={questionData[identifier] || ''}
            />
          </Suspense>
        )}
      </div>
      <div className="flex items-center gap-x-2">
        {questionData.userAnswers && questionData.userAnswers.length > 0 ? (
          <div>
            {questionData.userAnswers[0].correctAnswer ? (
              <CheckCircle className="flex-shrink-0 size-5 text-green-500" />
            ) : (
              <Circle className="flex-shrink-0 size-5 text-black-50" />
            )}
          </div>
        ) : (
          <Circle className="flex-shrink-0 size-5 text-black-50" />
        )}
        <div className="text-sm font-medium">
          {questionData.userAnswers && questionData.userAnswers.length > 0 ? (
            questionData.userAnswers[0].correctAnswer ? (
              <p>Correct</p>
            ) : (
              <p>Incorrect</p>
            )
          ) : (
            <div className="relative">
              <p className="group-hover:opacity-0 transition-opacity duration-300">
                Not Answered
              </p>
              <div className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap flex items-center gap-x-1">
                <p>Learn Now</p>
                <ChevronRight className="flex-shrink-0 size-4 text-white group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 w-full flex justify-between items-end z-10 relative">
        {!customQuestion && (
          <div className="flex gap-4 items-end">
            {questionData?.tags?.length && questionData?.tags?.length > 0 && (
              <div className="flex items-center gap-1 space-y-0.5 text-start">
                <TagDisplay
                  tags={questionData?.tags || []}
                  numberOfTags={numberOfTags}
                  showcaseTag={showcaseTag}
                />
              </div>
            )}
          </div>
        )}
        <div className="flex items-center gap-x-3">
          {questionData?.difficulty && (
            <Chip
              text={capitalise(questionData.difficulty)}
              color={getQuestionDifficultyColor(questionData.difficulty).bg}
              textColor={
                getQuestionDifficultyColor(questionData.difficulty).text
              }
              border={
                getQuestionDifficultyColor(questionData.difficulty).border
              }
              small
            />
          )}
          {questionData?.questionDate && questionData?.dailyQuestion && (
            <Chip
              color="bg-black-100"
              text={questionData.questionDate}
              border="border-black-50"
            />
          )}
        </div>
      </div>
    </Link>
  );
}
