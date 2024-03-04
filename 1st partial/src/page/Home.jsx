import { useState } from "react";
import Monaco from "@monaco-editor/react"; 
import '../style-sheets/Home.css'
import { validateGrammar } from "./Analizador-sintatico";
import { handleValidateChange } from './AnalizadorDeTokens'


function Home() {
  const [currentCode, setCurrentCode] = useState("");
  const [result, setResult] = useState([]);
  const [isFound, setIsFound] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [validationGrammar, setValidationGrammar] = useState()
  const documentation = `
    DOCUMENTACIÓN

    Variables no declaradas:
      int variable1;
      string variable2;
      char variable3;
      bool variable4;
      float variable5;

    Variables declaradas:
      int variable1 = 2;
      string variable2 = "Hola";
      char variable3 = 'H';
      bool variable4 = true;
      float variable5 = 9.2;

    Estructura de control (IF)
    if(condicion):
      contenido;
    :

    Ciclo While
    while(x):
      contenido;
    :

    while(x == y):
      contenido;
    :

    while(x and y):
      contenido;
    :

    while(x or y):
      contenido;
    :

    while(x nor y):
      contenido;
    :
    
    Funciones
    func nombreFuncion(x):
      contenido;
      return x;
    :

    func nombreFuncion(x == y):
      contenido;
      return x;
    :

    func nombreFuncion(x and y):
      contenido;
      return x;
    :

    func nombreFuncion(x or y):
      contenido;
      return x;
    :

    func nombreFuncion(x nor y):
      contenido;
      return x;
    :
  `

  return (
    <div className="container-main-nc">
      <div className="title">
        <h1><strong>NEXA COMPILERS</strong></h1>
      </div>
      <div className="container-f">
        <div className="code-area">
          <div /*className="area"*/>
            <Monaco
              theme="vs-dark"
              width="100%"
              height="50vh"
              language="javascript"
              value={currentCode}
              options={{
                selectOnLineNumbers: false,
                mouseStyle: "text",
                acceptSuggestionOnEnter: "off",
                quickSuggestions: false,
              }}
              onChange={(newValue) => {
                handleValidateChange(newValue, setCurrentCode, validateGrammar, setValidationGrammar, setIsFound, setResult, setErrorMessage), console.log("Valor:", newValue);
              }}
            />
            
          </div>
          <br></br>
          {validationGrammar &&(
          <div>
            <div >
              {validationGrammar.message}
            </div>
          </div>
        )}


          <div style={{}}>
            <strong>TOKEN Y LEXEMAS DETECTADOS:</strong>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {result.map((info, index) => (
                <li key={index} style={{}}>{info}</li>
              ))}
            </ul>
          </div>

        </div>
        <div className="docs">
          <textarea className="textarea-docs" value={documentation} readOnly></textarea>
        </div>
      </div>

    </div>
  );
}

export default Home;
