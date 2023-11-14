import React from 'react';

export function Headline({familyName}) {
    return (
        <div className='headline'>{`Welcome `}
            <br/>
            <div>
                <h1>{ familyName }</h1>
                <span>{` family`}</span>
            </div>
        </div>
    );
}