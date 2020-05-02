import { UserInfo, UserToolAuth } from './interfaces/user';

export interface InitialState extends UserInfo {
  toolAuth: UserToolAuth,
}

export default function(initialState: InitialState) {
  const { toolAuth } = initialState
  const auths = toolAuth.map(t => t.route)
 
  return {
    canEnterUser: auths.includes('/user'),
    canEnterActivity: auths.includes('/activity'),
    canEnterId: auths.includes('/identity'),
    canEnterTicket: auths.includes('/cinema'),
    canEnterVolunteer: auths.includes('/volunteer'),
    canEnterOrganization: auths.includes('/team'),
  }
}
