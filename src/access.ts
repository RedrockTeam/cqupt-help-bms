import { UserInfo, UserToolAuth } from './interfaces/user';

export interface InitialState extends UserInfo {
  toolAuth: UserToolAuth,
}

export default function(initialState: InitialState) {
  const { toolAuth } = initialState
  // const auths = toolAuth.map(t => t.route)
  const auths = ['/user', '/activity', '/identity', '/cinema', '/volunteer', '/team']
  console.log(auths)

  return {
    canEnterUser: true,
    canEnterActivity: auths.includes('/activity'),
    canEnterId: auths.includes('/identity'),
    canEnterTicket: auths.includes('/cinema'),
    canEnterVolunteer: auths.includes('/volunteer'),
    canEnterOrganization: auths.includes('/team'),
  }
}
