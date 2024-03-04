import "../assets/styles/chomsky.css"
import { useEffect, useState } from "react";
import { validateSintax } from "../utils/sintax_parser.js";

export const Home = () => {
    const [codeContent, setCodeContent] = useState("")
    const [stackInfo, setStackInfo] = useState([]);

    useEffect(() => {
        const mainClg = console.log;
        console.log = (...args) => {
            mainClg(...args);
            setStackInfo(prevLogs => [...prevLogs, args.join(' ')]);
        };
        return () => {
            console.log = mainClg;
        };
    }, []);

    const handlerCodeText = (e) => {
        setCodeContent(e.target.value)
    }


    const handleCheck = (e) => {
        e.preventDefault();
        setStackInfo([])
        validateSintax(codeContent)
    }

    return (
        <>
            <header>
                <div className="name-language-program">
                    <h1 className='nexa-name'>NEXA COMPILERS</h1>
                </div>
            </header>
            <section className="data-code-pila">
                <div className="comparation">
                    <div className="data-coding">
                        <form className='code'>
                            <h2 className='subtitle-code'>CÓDIGO</h2>
                            <textarea className='txtCode-2' name="Code" id="" cols="80" rows="10" onChange={handlerCodeText} />
                        </form>
                    </div>
                    <div className="data-pila">
                        <form action="">
                            <h2 className='subtitle-code'>CONSOLA</h2>
                            <textarea className='txtArea-code' contentEditable={"false"} name="code" cols="40" rows="10" value={stackInfo.join('\n')}></textarea>
                        </form>
                    </div>
                </div>
            </section>
            <div className="container-button">
                <button className='option' onClick={handleCheck}>Verificar</button>
            </div>
        </>
    )
}