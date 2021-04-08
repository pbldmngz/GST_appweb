var config = {}

config.path = {
    sign_in: "/signin",
    sign_up: "/signup",
    crear_auditoria: "/crear-auditoria",
    areas: "/areas",
    auditoria: "/auditoria/:id",
    auditorias: "/",
    responder_auditoria: "/responder-auditoria",
    responder_auditoria_redirect: "/responder-auditoria/:id",
    auditorias_area: "/area/:id",
    preguntas: "/preguntas",
    preguntas_detalles: "/detalles-pregunta",
    preguntas_detalles_redirect: "/detalles-pregunta/:id",
    crear_pregunta: "/crear-pregunta",
    // pregunta_reponder: "/responder-pregunta",
    // pregunta_reponder_redirect: "/responder-pregunta/:id"
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
    pregunta_detalles: "Detalles de pregunta",
    pregunta_responder: "Responder pregunta"
}

module.exports = config;