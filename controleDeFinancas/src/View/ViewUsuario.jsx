import { useEffect, useState } from "react";
import CabecalhoPrincipal from "../Components/CabecalhoPrincipal"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from "../context/AuthProvider";
import { buscaUserAPI } from "../service/Services";


const ViewUsuario = () => {

    const {user} = useAuth()
    const [usuario, setUsuario] = useState({})
    const [novaSenha, setNovaSenha] = useState("")
    const [novoUsuario, setNovoUsuario] = useState("")
    const [mensagem, setMensagem] = useState("")

    useEffect(() =>{
        const buscarUser = async () => {
            let userBuscado = await buscaUserAPI(user.nome, user.token)
            setUsuario({
                nomeUsuario: userBuscado[0].username || "",
                senha: userBuscado[0].password || ""
            })
            
        }
        buscarUser()
        setNovoUsuario(usuario.nomeUsuario)
        console.log(usuario)
    }, [])

    const alterarUsuario = () => {
        if (novoUsuario === "" || novaSenha === "") {
            setMensagem(`Campos obrigatórios`)
        }
    }

    return(
        <>
            <CabecalhoPrincipal />
            <div className="items-center justify-center flex pt-30">
                <Form className='w-96 flex flex-col items-center justify-center bg-gray-300 h-[20rem] rounded-4xl'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" value={novoUsuario} onChange={(e) => setNovoUsuario(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)}/>
                    </Form.Group>
                    <Form.Text className="text-muted">
                        {mensagem}
                    </Form.Text>
                    <Button variant="success" onClick={alterarUsuario}>
                        Alterar
                    </Button>
                </Form>

            </div>
        </>
    )
}

export default ViewUsuario