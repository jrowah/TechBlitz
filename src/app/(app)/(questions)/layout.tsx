// Components
import BackToDashboard from '@/components/ui/back-to-dashboard';
import CurrentStreak from '@/components/ui/current-streak';
import { Separator } from '@/components/ui/separator';
import FeedbackButton from '@/components/ui/feedback-button';
import SidebarLayoutTrigger from '@/components/global/navigation/sidebar-layout-trigger';
import RandomQuestion from '@/components/global/random-question';

// Actions
import { getQuestion } from '@/utils/data/questions/get';

export default async function QuestionUidLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { slug: string } }>) {
  const { slug } = params;

  const question = await getQuestion(slug);

  return (
    <>
      <div className="flex items-center justify-between py-2 px-6">
        <div className="flex items-center gap-x-5 py-2">
          <SidebarLayoutTrigger />
          {/** Previous question button */}
          <BackToDashboard href="/questions/" />
          {question?.dailyQuestion && question?.questionDate && (
            <div className="font-ubuntu flex gap-x-5 items-center">
              <p>Daily question</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-x-3">
          <CurrentStreak />
          <RandomQuestion currentQuestionSlug={slug} />
          <FeedbackButton reference={question?.slug || undefined} />
        </div>
      </div>
      <Separator className="bg-black-50" />
      {children}
    </>
  );
}
