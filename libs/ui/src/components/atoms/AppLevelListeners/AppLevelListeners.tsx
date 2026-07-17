import { useNotification } from '@parkora-org/hooks/src/notifications'
import { useUserListener } from '@parkora-org/hooks/src/user'

export interface IAppLevelListenersProps {}

export const AppLevelListeners = () => {
  useUserListener()
  useNotification()
  return null
}
