import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export const toastSuccess = (text: string, onClick: (() => void) | undefined = undefined) => Toastify({
    text,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
        border: "1px solid black",
        borderRadius: "3px",
        background: "linear-gradient(to right, rgba(0, 176, 155, 1), rgba(150, 201, 61, 0.9))",
    },
    onClick
}).showToast();

export const toastError = (text: string, onClick: (() => void) | undefined = undefined) => Toastify({
    text,
    duration: 3500,
    close: true,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
        border: "1px solid black",
        borderRadius: "3px",
        background: "linear-gradient(to right, rgba(255, 0, 0, 1), rgba(0, 0, 0, 0.9))",
    },
    onClick
}).showToast()

export const toastWait = (text: string) => Toastify({
    text,
    duration: 2500,
    close: true,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
        border: "1px solid black",
        borderRadius: "3px",
        background: "linear-gradient(to right, rgba(100, 100, 100, 1), rgba(200, 200, 200, 0.9))",
    }
}).showToast();
