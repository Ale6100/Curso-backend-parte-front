import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export const toastSuccess = text => Toastify({
    text,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
        borderRadius: "3px",
        background: "linear-gradient(to right, rgba(0, 176, 155, 0.9), rgba(150, 201, 61, 0.9))",
    }
}).showToast();

export const toastError = (text, onClick=null) => Toastify({
    text,
    duration: 3500,
    close: true,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
        borderRadius: "3px",
        background: "linear-gradient(to right, rgba(255, 0, 0, 0.9), rgba(0, 0, 0, 0.9))",
    },
    onClick
}).showToast()

export const toastWait = text => Toastify({
    text,
    duration: 2500,
    close: true,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
        borderRadius: "3px",
        background: "linear-gradient(to right, rgba(100, 100, 100, 0.9), rgba(200, 200, 200, 0.1))",
    }
}).showToast();
