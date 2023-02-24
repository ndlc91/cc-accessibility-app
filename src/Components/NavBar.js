import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import image from "./logo.jpeg";
import "../App.scss";

export function NavBar() {
    return (
        <>
            <Navbar fixed="top" bg="light" variant="light"className="nav">
                <Container >
                    <Navbar.Brand href="#home" className='brand'>
                        <img className='logo'
                            alt=""
                            src={image}
                        /> {' '}
                        Subtitles Generator
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}
