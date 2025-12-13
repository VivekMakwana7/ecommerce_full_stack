import Container from "./container"
import Logo from "./logo"

const Header = () => {
    return (
        <header className="bg-white py-5">
            <Container>
                <Logo />
                {/* { Nav Button} */}
                {/* {Nav Admin} */}
            </Container>
        </header>
    )
}

export default Header