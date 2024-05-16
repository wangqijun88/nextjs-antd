

import {Metadata} from 'next'
import UIComponents from './components'

export const metadata: Metadata = {
  title: 'next ui',
  description: '这是一个nextjs构建的ui页面',
  keywords: 'React、Nextjs'
}

function ShadcnPage(props: any) {
  
  return (
    <>
      <UIComponents/>
    </>
  );
}
export default ShadcnPage;
