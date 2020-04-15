import React from 'react'
import { connect, ConnectProps } from 'umi'
import { OrganizationModelState } from '@/models/organization'
import PageHeader from '@/components/pageHeader'
import Member from '@/components/organizationMember'
import OrganizationPerson from '@/components/organizationPerson'
import StyleSheet from '@/assets/styles.css'

type ConnectState = {
  organization: OrganizationModelState,
}

type Props = ConnectProps & ConnectState

const OrganizationMenber = ({ organization, dispatch }: Props) => {
  return (
    <div>
      <PageHeader title="部门成员" />
      <div className={StyleSheet.wrapper}>
        {organization.members.map(group =>
          <Member key={group.job.job_id} title={group.job.job_name}>
            {group.TeamPersons.map(person => 
              <OrganizationPerson
                onClick={() => dispatch!({
                  type: 'organization/deleteMember',
                  // TODO: 等后端改成通过 id 更新
                  payload: { stuNum: person.id },
                })}
                key={person.id}
                person={person}
              />
            )}
          </Member>
        )}
      </div>
    </div>
  )
}

export default connect((state: ConnectState) => ({
  organization: state.organization,
}))(OrganizationMenber)
