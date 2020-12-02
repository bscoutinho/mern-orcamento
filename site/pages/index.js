import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Jumbotron,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert
} from 'reactstrap';

function Home() {
    const [orcamento, setOrcamento] = useState({
        name: '',
        email: '',
        phone: '',
        whatsApp: '',
        msg: ''
    });

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const onChangeInput = e => setOrcamento({ ...orcamento, [e.target.name]: e.target.value});

    const sendOrcamento = async e => {
        e.preventDefault();
        setResponse({formSave: true});
        try{
            const res = await fetch('http://localhost:8080/orcamento', {
                method: 'POST',
                body: JSON.stringify(orcamento),
                headers: {'Content-Type': 'application/json'}
            });

            const responseEnv = await res.json();

            //console.log(responseEnv.error);
            if(responseEnv.error){
                setResponse({
                    formSave: false,
                    type: 'error',
                    message: responseEnv.message
                });
            }else{
                setResponse({
                    formSave: false,
                    type: 'success',
                    message: responseEnv.message
                });
            }
            
        } catch(err){
            setResponse({
                formSave: false,
                type: 'error',
                message: 'Erro: Solicitação de orçamento não enviado com sucesso, tente mais tarde!'
            });
        }
    }
    

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="info" dark expand="md">
                <Container>
                    <NavbarBrand href="/">Celke</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Orçamento</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>

            <Jumbotron className="pg-orcamento">
                <style>
                    {`.pg-orcamento{
                        background-color: #f5fbfa;
                        color: #17a2b8;
                        padding-top: 50px;
                        padding-bottom: 100px;
                        margin-bottom: 0rem !important;
                    }`}
                </style>
                <Container>
                    <h1 className="display-4 text-center">Nossos consultores estão prontos para lhe ajudar!</h1>
                    <p className="lead text-center mb-4">Deixe seus contatos abaixo que retornaremos com uma proposta específica para sua necessidade.</p>

                    {response.type === 'error'? <Alert color="danger">{response.message}</Alert> : ""}
                    {response.type === 'success'? <Alert color="success">{response.message}</Alert> : ""}

                    <Form onSubmit={sendOrcamento}>
                        <FormGroup>
                            <Label for="name">Nome</Label>
                            <Input type="text" name="name" id="name" placeholder="Preencha com o nome completo" onChange={onChangeInput} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">E-mail</Label>
                            <Input type="email" name="email" id="email" placeholder="Preencha com o seu melhor" onChange={onChangeInput} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="phone">Telefone</Label>
                            <Input type="text" name="phone" id="phone" placeholder="(XX) XXXX-XXXX" onChange={onChangeInput} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="whatsApp">WhatsApp</Label>
                            <Input type="text" name="whatsApp" id="whatsApp" placeholder="(XX) XXXX-XXXX" onChange={onChangeInput} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="msg">Conteúdo</Label>
                            <Input type="textarea" name="msg" id="msg" placeholder="Fale um pouco do seu projeto" onChange={onChangeInput} />
                        </FormGroup>

                        {response.formSave ? <Button type="submit" outline color="info" disabled>Enviando...</Button> : <Button type="submit" outline color="info">Enviar</Button>}
                        
                    </Form>
                </Container>
            </Jumbotron>

            <Jumbotron fluid className="rodape bg-info">
                <style>
                    {`.rodape{
                        color: #fff;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        margin-bottom: 0rem !important;
                    }`}
                </style>
                <Container>
                    <h1 className="lead text-center">Rodapé</h1>
                </Container>
            </Jumbotron>
        </div>
    );
}

export default Home;