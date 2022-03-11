//Компонент
import { Container } from '../components';
//

const Error = ({ id }) => {
    if(id === '404'){
        return(
            <Container>
                <h1>404 - Not Fround</h1>
            </Container>
        );
    }
};

export default Error;