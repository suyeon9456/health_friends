import { MatchingCardProps, ScheduleAPI } from '@/../@types/schedule';
import { Profile } from '@/../@types/user';
import { useCallback, useState } from 'react';

type ReturnTypes = [
  MatchingCardProps | null,
  (data: ScheduleAPI, profile: Profile) => void
];

const useScheduleData = (): ReturnTypes => {
  const [value, setValue] = useState<MatchingCardProps | null>(null);
  const handler = useCallback((fetchSchedule: ScheduleAPI, profile) => {
    const { schedule, userMatching, friendMatching } = fetchSchedule;
    const userTotalCount = userMatching?.[0]?.matchingCount || 0;
    const userReCount = userMatching?.[0]?.rematchingCount || 0;
    const friendTotalCount = friendMatching?.[0]?.matchingCount || 0;
    const friendReCount = friendMatching?.[0]?.rematchingCount || 0;
    setValue({
      ...schedule,
      start: new Date(schedule.startDate),
      end: new Date(schedule.endDate),
      userMathcing: userMatching.map(
        ({ FriendId }: { FriendId: number }) => FriendId
      ),
      userTotalCount,
      userReCount,
      friendMathcing: friendMatching.map(
        ({ FriendId }: { FriendId: number }) => FriendId
      ),
      friendTotalCount,
      friendReCount,
      Friend:
        schedule.Receiver.id === profile.id
          ? schedule.Requester
          : schedule.Receiver,
    });
  }, []);
  return [value, handler];
};

export default useScheduleData;
