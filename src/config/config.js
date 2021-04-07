var config = {}

config.path = {
    sign_in: "/signin",
    sign_up: "/signup",
    crear_auditoria: "/crear-auditoria",
    areas: "/",
    crear_pregunta: "/crear-pregunta",
    respoder_auditorias: "/auditoria/:id",
    auditorias_area: "/area/:id"
}

config.pathName = {
    sign_in: "Login",
    sign_up: "SignUp",
    crear_auditoria: "Crear auditoría",
    areas: "Areas",
    crear_pregunta: "Crear pregunta",
    auditorias: "Auditorias"
}

module.exports = config;