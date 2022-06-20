import React from 'react';

import { RuxProgress } from '@astrouxds/react';

const Loading = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <RuxProgress></RuxProgress>
    </div>
  )
}

export default Loading;