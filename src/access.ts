import { UserInfo, UserToolAuth } from './interfaces/user';

export interface InitialState extends UserInfo {
  toolAuth: UserToolAuth;
}

export default function(initialState: InitialState) {
  if (window.location.hash.slice(0, 6) === '#/bind')
    return {
      canEnterUser: false,
      canEnterActivity: false,
      canEnterId: false,
      canEnterTicket: false,
      canEnterVolunteer: false,
      canEnterYoung: false,
      canEnterOrganization: false,
    };

  const { toolAuth } = initialState;
  const auths = toolAuth.map(t => t.route);
  // const auths = [
  //   '/user',
  //   '/activity',
  //   '/identity',
  //   '/cinema',
  //   '/volunteer',
  //   '/team',
  // ];
  // console.log(auths);

  return {
    canEnterUser: true,
    canEnterActivity: auths.includes('/activity'),
    canEnterId: auths.includes('/identity'),
    canEnterTicket: auths.includes('/cinema'),
    canEnterVolunteer: auths.includes('/volunteer'),
    canEnterYoung: auths.includes('/team/apply'),
    canEnterOrganization: auths.includes('/team'),
  };
}
