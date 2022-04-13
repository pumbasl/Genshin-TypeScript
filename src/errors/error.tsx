//Компонент
import { Container } from '../components';
//

interface PropsTypes {
    id: number;
};

const Error = ({ id }: PropsTypes) => {
    if(id === 404){
        return(
            <Container>
                <h1>404 - Not Fround</h1>
            </Container>
        );
    }

    return(null);
};

export default Error;