import Swal from "sweetalert2";
import {predicticTable} from "./predicticTable.js";

function isNoTerminal(symbol){
    const terminales =["S","I","V","T","G","N","R","O","P","F","L"]
    // Si el simbolo no esta en la lista de terminales, entonces es un no terminal, y devuelve true
    return !(terminales.indexOf(symbol) === -1)
}

function getProduction(element) {
    let production
    if (predicticTable.hasOwnProperty(element)) {
        production =predicticTable[element].filter(item => item !== null)[0];
        return production
    }
}

export function validateSintax(string){
    // Inicializar la pila con el simbolo inicial y el simbolo de fin de cadena
    let stack = ["$", "S"];
    // Lo de abajo sirve para separar los elementos de la cadena
    let stringStack = string.match(/([a-zA-Z_]\w*|\S)/g).toString().split(",");
    console.log("La pila es:", stack.toString());
    console.log("La cadena a evaluar es:", stringStack);

    while (stack.length > 0) {
        let x = stack.pop();
        console.log("El elemento de la pila tope es:", x);

        // Este if es para verificar si la cadena ya terminó
        if (x === "$") {
            console.log("Cadena finalizada - cadena valida");
            Swal.fire({
                icon: "success",
                title: "<strong>CADENA ACEPTADA",
                text: `CADENA: ${string} \nESCRITA CORRECTAMENTE`,
                background: "#2a2424",
                color: "#fff",
            });

            return; // Terminar la ejecución ya que la cadena es válida
        // Este else if es para verificar si el elemento de la pila es un no terminal
        } else if (isNoTerminal(x)) {
            console.log(x, "es un no terminal");

            const production = getProduction(x);
            if (production) {

                for (let i=0; i<=production.length-1;i++){
                    stack.push(production[i])
                }
                console.log("La nueva pila es:", stack.toString());
            } else {
                console.log("No se pudo encontrar producción");
                console.log("La pila quedó así:", stack.toString());
                Swal.fire({
                    icon: 'error',
                    title: 'ALGO NO HA SALIDO BIEN...',
                    text: 'CADENA NO VÁLIDA. \nVERIFIQUE QUE NO FALTEN ELEMENTOS',
                    background: "#2a2424",
                    color: "#fff",
                })
                return; // Terminar la ejecución ya que no hay producción
            }
        // Este else if es para verificar si el elemento de la pila es un terminal
        } else {
            console.log(x, "es un terminal");
            let y = stringStack.pop();
            console.log("El elemento tope de la cadena es:", y);

            // El if de aca abajo es para verificar si el elemento de la pila y el de la cadena son iguales
            // Porque si son iguales, entonces la sintaxis es valida
            if (x === y || (x === "word" && /^[a-z]+$/.test(y)) || (x==="TD" && /^int|float|string$/.test(y))) {
                console.log("Sintaxis válida entre pila y cadena");
            } else {
                console.log("Sintaxis inválida entre pila y cadena");
                console.log("La pila queda así:", stack.toString());
                Swal.fire({
                    icon: 'error',
                    title: 'ALGO NO HA SALIDO BIEN...',
                    text: 'CADENA NO VÁLIDA ENTRE PILA Y CADENA',
                    background: "#2a2424",
                    color: "#fff",
                })
                return;
            }
        }
    }
}