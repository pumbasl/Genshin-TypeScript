import React, { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import SelectFormLoading from './Components/SelectFormLoading';
import AddPromo from './Components/AddPromo';
import AddNews from './Components/AddNews';
import AddWebEvent from './Components/AddWebEvent';

interface IPropsFormButtons {
    id: number | null;
};

const FormButtons = ({ id }: IPropsFormButtons) => {
    if(!id) return <SelectFormLoading />;

    if(id === 1){
        return <AddPromo />;
    }

    if(id === 2){
        return <AddNews />;
    }

    if(id === 3) {
        return <AddWebEvent />;
    }

    return null;
};

export default function ActionButtons(){
    const [ form, setForm ] = useState<number | null>(null);
    return(
        <div className="text-center">
            <ButtonGroup>

                <Button variant="dark-custom" onClick={() => setForm(1)}>
                    Добавить промокод
                </Button>

                <Button variant="dark-custom" onClick={() => setForm(2)}>
                    Добавить новость
                </Button>

                <Button variant="orange" className="text-light" onClick={() => setForm(3)}>
                    Добавить веб-ивент
                </Button>

            </ButtonGroup>

            <div className="mt-2 text-start">
                <FormButtons id={form} />
            </div>
        </div>
    );
}