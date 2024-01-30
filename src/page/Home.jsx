import React, { useState } from "react";
import Monaco from "@monaco-editor/react"; 
import '../style-sheets/Home.css'


function Home() {
  const [currentCode, setCurrentCode] = useState("");
  const [result, setResult] = useState([]);
  const [isFound, setIsFound] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
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
      contenido
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

  function handleValidateChange(codigo) {
    setCurrentCode(codigo)
    checkCode(codigo);
  }

  const checkCode = (codigo) => {
    const lexer = new Lexer(codigo);
    let tokens = [];
    let error = null;

    try {
      let token = lexer.getNextToken();
      while (token.type !== 'FINAL') {
        tokens.push(token);
        token = lexer.getNextToken();
      }
      setIsFound(true);
    } catch (err) {
      setIsFound(false);
      error = `Error en la posición ${lexer.position}: ${err.message}`;
    }

    setResult(tokens.map((token) => `${token.type}: ${token.value}`));
    setErrorMessage(error);
  };


  return (
    <>
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
                handleValidateChange(newValue), console.log("Valor:", newValue);
              }}
            />
            <div className="line-validator">
              {isFound !== null && currentCode.length!==0 && (
                <p>
                  {isFound ? 'Detección de caracteres válida' : 'Se detectó uno o más carácteres no reconocidos:'}
                  <br></br>
                  {isFound === false && errorMessage && (
                    <span style={{ color: 'red' }}>
                      {errorMessage.toUpperCase()}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
          <br></br>

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

    </>
  );
}



class Lexer {
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.tokenTable = [
      { regex: /func|return|while|if|contenido|none/, type: 'PRESERVADAS' },
      { regex: /:|;|"|'/, type: 'SIMBOLOS' },
      { regex: /\(|\)/, type: 'PARENTESIS' },
      { regex: /{|}/, type: 'LLAVES' },
      { regex: /==|and|or|nor/, type: 'OPERADOR_LOGICO' },
      { regex: /=/, type: 'OPERADOR_ASIGNACION' },
      { regex: /int|string|char|bool|float/, type: 'TIPO' },
      { regex: /true|false/, type: 'BOOLEANOS' },
      { regex: /\b\d+\b(?![.])/, type: 'NUMERICOS' },
      { regex:  /\b\d+(\.\d+)?\b/, type: 'DECIMALES' },
      { regex: /[a-zA-Z0-9]+/, type: 'NOMBRE' },
    ]
  }

  getNextToken() {
    while (this.position < this.input.length) {
      let char = this.input[this.position];
      for (const tokenDef of this.tokenTable) {
        const match = this.input.slice(this.position).match(tokenDef.regex);
        if (match && match.index === 0) {
          this.position += match[0].length;
          return { type: tokenDef.type, value: match[0] };
        }
      }
      if (/\s/.test(char)) {
        this.position++;
        continue;
      }
      throw new Error(`Caracter inesperado: ${char}`);
    }
    return { type: 'FINAL', value: null };
  }
}





export default Home;
