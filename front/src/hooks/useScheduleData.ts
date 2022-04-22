import { MatchingCardProps, RecordScheduleAPI } from '@/../@types/schedule';
import { Profile } from '@/../@types/user';
import { useCallback, useState } from 'react';

type ReturnTypes = [
  MatchingCardProps | null,
  (data: RecordScheduleAPI, profile: Profile) => void
];

const useScheduleData = (): ReturnTypes => {
  const [value, setValue] = useState<MatchingCardProps | null>(null);
  const handler = useCallback((schedule: RecordScheduleAPI, profile) => {
    setValue({
      ...schedule,
      start: new Date(schedule.startDate),
      end: new Date(schedule.endDate),
      Friend:
        schedule.Receiver.id === profile.id
          ? schedule.Requester
          : schedule.Receiver,
    });
  }, []);
  return [value, handler];
};

export default useScheduleData;
