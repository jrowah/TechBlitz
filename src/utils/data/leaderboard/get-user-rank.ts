import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';
import { unstable_cache as NextCache } from 'next/cache';

export const getUserAnswerRank = NextCache(async (opts: { questionUid: string }) => {
  const { questionUid } = opts;

  const user = await getUser();

  const result = await prisma.$queryRaw<{ rank: number }[]>`
    SELECT CAST(rank AS INTEGER) as rank
    FROM (
      SELECT
        "userUid",
        RANK() OVER (ORDER BY "timeTaken" ASC) AS rank
      FROM "Answers"
      WHERE "questionUid" = ${questionUid}
    ) AS ranked_answers
    WHERE "userUid" = ${user?.uid}
  `;

  return result.length > 0 ? result[0].rank : null;
});

/**

export const getUserAnswerRank = async (opts: {
  questionUid: string;
  userUid: string;
}) => {
  const { questionUid, userUid } = opts;

  // Find the time taken by the user's answer
  const userAnswer = await prisma.answers.findFirst({
    where: { userUid, questionUid },
    select: { timeTaken: true },
  });

  if (!userAnswer || userAnswer.timeTaken === null) {
    throw new Error('User answer not found or time taken is missing');
  }

  // Count answers with a lower timeTaken for the same question
  const fasterAnswersCount = await prisma.answers.count({
    where: {
      questionUid,
      timeTaken: { lt: userAnswer.timeTaken },
    },
  });

  // Rank is number of faster answers plus one
  return fasterAnswersCount + 1;
};

 */
