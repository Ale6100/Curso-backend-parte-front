import React from 'react';
import { InfinitySpin } from  'react-loader-spinner'

const Loading = () => {
    return (
        <div className='flex justify-center items-center'>
            <InfinitySpin width='200' color="rgb(29, 78, 216)"/>
        </div>
    );
}

export default Loading;
