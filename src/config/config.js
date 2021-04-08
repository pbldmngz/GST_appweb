var config = {}

config.path = {
    sign_in: "/signin",
    sign_up: "/signup",
    crear_auditoria: "/crear-auditoria",
    areas: "/areas",
    auditoria: "/auditoria/:id",
    auditorias: "/",
    responder_auditoria: "/auditoria",
    auditorias_area: "/area/:id",
    preguntas: "/preguntas",
    crear_pregunta: "/crear-pregunta",
    pregunta_detalles: "preguntas/:id"
}

config.pathName = {
    sign_in: "Login",
    sign_up: "SignUp",
    crear_auditoria: "Crear auditoría",
    areas: "Areas",
    auditorias: "Auditorias",
    auditorias: "Auditoria",
    responder_auditoria: "Responder auditoria",
    preguntas: "Preguntas",
    crear_pregunta: "Crear pregunta",
    pregunta_detalles: "Pregunta detalles"
}

module.exports = config;