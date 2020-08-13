import React from 'react'
import { connect } from 'umi'

const Change = () => {
  return (
    <div>hbh</div>
  )
}

export default connect(
  ({
    activity,
    loading,
  }) => ({
    activity,
    loading: loading.effects['activity/fetchActivityDetailInfos'],
  }),
)(Change);
