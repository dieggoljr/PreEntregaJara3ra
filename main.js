const reserva = JSON.parse(localStorage.getItem("reserva")) || []

const habitaciones = [
    {
        id: "habitación01",
        nombre: "Habitación Standar",
        precio: 40,
        img: "./img/habitacion01.png",
        stock: 25
    },
    {
        id: "habitación02",
        nombre: "Suite Nupcial",
        precio: 220,
        img: "./img/habitacion02.png",
        stock: 4
    },
    {
        id: "habitación03",
        nombre: "Suite Ejecutiva",
        precio: 300,
        img: "./img/habitacion03.png",
        stock: 1
    },
]

const contenedorHabitaciones = document.querySelector("#habitaciones")
const reservaVacio = document.querySelector("#reserva-vacio")
const reservaHabitaciones = document.querySelector("#reserva-habitaciones")
const reservaTotal = document.querySelector("#reserva-total")

habitaciones.forEach((habitacion) => {
    let div = document.createElement("div")
    div.classList.add("habitacion")
    div.innerHTML = `
        <img class="habitacion-img" src="${habitacion.img}">
        <h3>${habitacion.nombre}</h3>
        <p>$${habitacion.precio}</p>
    `

    let button = document.createElement("button")
    button.classList.add("habitacion-btn")
    button.innerText = "Agregar al reserva"
    button.addEventListener("click", () => {
        agregarReserva(habitacion)
    })
    div.append(button)
    contenedorHabitaciones.append(div)
})

const actualizarReserva = () => {
    if (reserva.length === 0) {
        reservaVacio.classList.remove("d-none");
        reservaHabitaciones.classList.add("d-none");
    } else {
        reservaVacio.classList.add("d-none");
        reservaHabitaciones.classList.remove("d-none");

        reservaHabitaciones.innerHTML = "";
        reserva.forEach((habitacion) => {
            let div = document.createElement("div");
            div.classList.add("reserva-habitacion");
            div.innerHTML = `
                <h3>${habitacion.nombre}</h3>
                <p>$${habitacion.precio}</p>
                <p>Cant: ${habitacion.cantidad}</p>
            `;

            let button = document.createElement("button");
            button.classList.add("reserva-habitacion-btn");
            button.innerText = "Quitar";
            button.addEventListener("click", () => {
                borrarReserva(habitacion);
            })

            div.append(button);
            reservaHabitaciones.append(div);

        })
    }
    actualizarTotal();
    localStorage.setItem("reserva", JSON.stringify(reserva));
}

const agregarReserva = (habitacion) => {
    if (habitacion.stock > 0) {
        const itemEncontrado = reserva.find(item => item.id === habitacion.id)
        if (itemEncontrado) {
            itemEncontrado.cantidad++
            habitacion.stock--
        } else {
            reserva.push( {...habitacion, cantidad: 1} )
            habitacion.stock--
        }
        actualizarReserva()
    } else {
        alert("No quedan de estas habitaciones disponibles.")
    }
}

const borrarReserva = (habitacion) => {
    const itemEncontrado = habitaciones.find(item => item.id === habitacion.id);
    itemEncontrado.stock += habitacion.cantidad;

    const prodIndex = reserva.findIndex(item => item.id === habitacion.id);
    reserva.splice(prodIndex, 1);
    actualizarReserva();
}

const actualizarTotal = () => {
    const total = reserva.reduce((acum, prod) => acum + (prod.precio * prod.cantidad), 0);
    reservaTotal.innerText = `U$S${total}`;
}

actualizarReserva();
