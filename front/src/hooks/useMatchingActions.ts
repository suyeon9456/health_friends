import { UpdateCancellationProps } from '@/../@types/action';
import { Me } from '@/../@types/user';
import {
  ButtonTypeT,
  detailActions,
  reqCancelActions,
  resCancelActions,
  waitCancelActions,
} from '@/../@types/utils';
import {
  addCancelAPI,
  updateCancelAPI,
  updatePermissionAPI,
} from '@/api/schedule';
import { useCallback } from 'react';
import { useMutation } from 'react-query';

interface Props {
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

export const matchingActions = (
  onCancel: () => void,
  schedule: Props,
  me?: Me
):
  | ReadonlyArray<{
      id: string;
      title?: string;
      type?: ButtonTypeT;
      onClick: () => void;
    }>
  | readonly [] => {
  if (!schedule) return [];
  const { isPermitted, permission, isLast, Requester } = schedule;
  const scheduleMutation = useMutation(
    (data: { scheduleId?: number; permission: boolean; friendId?: number }) =>
      updatePermissionAPI(data),
    {
      onSuccess: () => onCancel(),
    }
  );

  const cancelMutation = useMutation(
    (data: { id?: number }) => addCancelAPI(data),
    {
      onSuccess: () => {
        onCancel();
      },
    }
  );

  const updateCancelMutation = useMutation(
    (data: UpdateCancellationProps) => updateCancelAPI(data),
    {
      onSuccess: () => onCancel(),
    }
  );

  const onAccept = useCallback(() => {
    if (!schedule) return;
    const { id } = schedule;

    if (!isPermitted) {
      scheduleMutation.mutate({
        scheduleId: id,
        permission: true,
        friendId: schedule?.Requester?.id,
      });
    }
  }, [schedule]);

  const onRefuse = useCallback(() => {
    if (!schedule) return;
    scheduleMutation.mutate({
      scheduleId: schedule.id,
      permission: false,
      friendId: schedule?.Requester?.id,
    });
  }, [schedule]);

  const onCancelRequest = useCallback(() => {
    cancelMutation.mutate({ id: schedule.id });
  }, [schedule]);

  const onCancelResponse = useCallback(() => {
    if (!schedule) return;
    const { id, Cancel } = schedule;

    updateCancelMutation.mutate({
      id,
      friendId: schedule?.Requester?.id,
      cancelId: Cancel?.id,
    });
  }, [schedule]);
  if (!me) return [];
  if (!isLast && !isPermitted && Requester?.id !== me?.id)
    return detailActions(onRefuse, onAccept);
  if (permission && !schedule?.Cancel) return reqCancelActions(onCancelRequest);
  if (permission && schedule?.Cancel) {
    const { RequestId } = schedule?.Cancel;
    if (RequestId === me?.id) return waitCancelActions(onCancel);
    if (RequestId !== me?.id) return resCancelActions(onCancelResponse);
  }
  return [];
};
