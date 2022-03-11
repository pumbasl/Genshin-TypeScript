import React, { useState, lazy, Suspense } from 'react';

//components
import { ButtonGroup, Button } from 'react-bootstrap';
import { Preloader } from '../../components';
import SelectFormLoading from './Components/SelectFormLoading';
//

//lazy form
const AddPromo = lazy(() => import('./Components/AddPromo'));
const AddNews = lazy(() => import('./Components/AddNews'));
const AddWebEvent = lazy(() => import('./Components/AddWebEvent'));
//

const FormButtons = ({ id }) => {
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
};

export default function ActionButtons(){
    const [ form, setForm ] = useState(false);
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

            <Suspense fallback={<Preloader fetch />}>
                <div className="mt-2 text-start">
                    <FormButtons id={form} />
                </div>
            </Suspense>
        </div>
    );
}