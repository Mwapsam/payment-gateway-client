import React from 'react';
import { Nav } from '../components';

type Props = {}

const HomeWrapper = (Component: any) => ({...props}) => {
  return (
    <>
        <Nav />
        <Component {...props} />
    </>
  )
}

export default HomeWrapper