import { MatchingCardProps, UpdateCancelAPI } from '@/../@types/schedule';
import { Me } from '@/../@types/user';
import {
  ButtonTypeT,
  detailActions,
  reqCancelActions,
  resCancelActions,
  waitCancelActions,
} from '@/../@types/constant';
import {
  addCancelAPI,
  updateCancelAPI,
  updatePermissionAPI,
} from '@/api/schedule';
import { isLastDate } from '@/../@utils/date';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';

interface CustomScheduleType {
  id?: number;
  isPermitted?: boolean;
  permission?: boolean;
  isLast?: boolean;
  Requester?: {
    id?: number;
  };
  Cancel?: {
    id?: number;
    RequestId?: number;
  };
}

interface Props {
  schedule: MatchingCardProps;
  profileId: number;
  me: Me;
}
type StateType =
  | ReadonlyArray<{
      id: string;
      title?: string;
      type?: ButtonTypeT;
      onClick: () => void;
    }>
  | readonly [];

type ReturnType = [StateType, (prop: Props) => void];

const useMatchingActions = (
  defaultValues: [],
  callback: () => void
): ReturnType => {
  const [actions, setActions] = useState<StateType>(defaultValues);
  const [customSchedule, setCustomSchedule] =
    useState<CustomScheduleType | null>(null);
  const scheduleMutation = useMutation(
    (data: { scheduleId?: number; permission: boolean; friendId?: number }) =>
      updatePermissionAPI(data),
    {
      onSuccess: () => callback(),
    }
  );

  const cancelMutation = useMutation(
    (data: { id?: number }) => addCancelAPI(data),
    {
      onSuccess: () => callback(),
    }
  );

  const updateCancelMutation = useMutation(
    (data: UpdateCancelAPI) => updateCancelAPI(data),
    {
      onSuccess: () => callback(),
    }
  );

  const onAccept = useCallback(() => {
    if (!customSchedule) return;
    const { id, isPermitted } = customSchedule;

    if (!isPermitted) {
      scheduleMutation.mutate({
        scheduleId: id,
        permission: true,
        friendId: customSchedule?.Requester?.id,
      });
    }
  }, [customSchedule]);

  const onRefuse = useCallback(() => {
    if (!customSchedule) return;
    scheduleMutation.mutate({
      scheduleId: customSchedule.id,
      permission: false,
      friendId: customSchedule?.Requester?.id,
    });
  }, [customSchedule]);

  const onCancelRequest = useCallback(() => {
    if (!customSchedule) return;
    cancelMutation.mutate({ id: customSchedule.id });
  }, [customSchedule]);

  const onCancelResponse = useCallback(() => {
    if (!customSchedule) return;
    const { id, Cancel } = customSchedule;

    updateCancelMutation.mutate({
      id,
      friendId: customSchedule?.Requester?.id,
      cancelId: Cancel?.id,
    });
  }, [customSchedule]);

  const onChangeActions = useCallback(
    ({ schedule, profileId, me }: Props) => {
      setCustomSchedule(schedule);
      const { start } = schedule;
      const isLast = isLastDate(start);
      if (!me) {
        setActions([]);
        return;
      }
      if (profileId !== me.id) {
        setActions([]);
        return;
      }
      if (!isLast) {
        if (!schedule.isPermitted && schedule.Requester?.id !== me?.id) {
          setActions(detailActions(onRefuse, onAccept));
          return;
        }
        if (schedule.permission && !schedule?.Cancel) {
          setActions(reqCancelActions(onCancelRequest));
          return;
        }
      }
      if (schedule.permission && schedule?.Cancel) {
        const { RequestId, isCanceled } = schedule?.Cancel;
        if (isCanceled) {
          setActions([]);
          return;
        }
        if (RequestId === me?.id) {
          setActions(waitCancelActions(callback));
          return;
        }
        if (RequestId !== me?.id) {
          setActions(resCancelActions(onCancelResponse));
        }
      }
    },
    [actions]
  );
  return [actions, onChangeActions];
};

export default useMatchingActions;
