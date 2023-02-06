import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export const toastSuccess = text => Toastify({
    text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
    }
}).showToast();

export const toastError = (text, onClick=null) => Toastify({
    text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
        background: "linear-gradient(to right, rgb(255, 0, 0), rgb(0, 0, 0))",
    },
    onClick
}).showToast();

export const toastWait = text => Toastify({
    text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
        background: "linear-gradient(to right, rgb(100, 100, 100), rgb(200, 200, 200))",
    }
}).showToast();