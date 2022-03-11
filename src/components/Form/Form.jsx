import React from 'react';

//components
import Control from './Control/Control';
//

function Form({ children, ...props }){
    return(
        <form {...props}>
            {children}
        </form>
    );
}


export default Object.assign(Form, {
    Control
});