var lang = {}

lang.spanish = {
    locale: "es",
    return: "Volver",
    cargando: "Cargando...",
    auditorias: {
        auditorias: {

        },
        crearAuditoria: {
            crear_auditoria: "Crear auditoria",
            editar_auditoria: "Editar auditoria",
            nombre_auditoria: "Nombre de la auditoria",
            auditor: "Proceso",
            area: "Area",
            termina_el: " y termina el ",
            inicia_el: "Inicia el ",
            agregar: "Agregar",
            cancelar: "Cancelar",
            seleccionar_pregunta: "Seleccionar pregunta",
            text1: "Busca y selecciona las preguntas que desees añadir o ",
            text2: " crea una pregunta nueva, ",
            text3: "una vez creada la podrás seleccionar en esta lista.",
            crear: "Crear",
            edit: "Editar",
        },
        dashboardAuditorias: {
            ordenar_fecha: "Ordenar por fecha",
            agrupar_areas: "Agrupar por áreas",
            mostrar_realizados: "Mostrar realizados",
            vista: "Vista",
            auditorias: "Auditorias",
        },
        detallesAuditoria: {
            auditor: "Auditor",
            descripcion: "Descripción",
            plan_reaccion: "Plan de reacción",
            creada_por: "Creada por",
            fecha_inicio: "Fecha de inicio",
            fecha_finalizacion: "Fecha de finalización",
            preguntas: "Preguntas (esto es un array, ya veremos como se arregla esto)",
        },
        responderAuditoria: {
            responder_auditoria: "Responder auditoria",
            justificacion: "Justificación",
            si: "Sí",
            no: "No",
            enviar: "Enviar",
        },
        tarjetaAuditoria: {
            fecha_limite: "Fecha límite",
            auditor: "Proceso",
        },
    },
    auth: {
        changePassword: {
            cambiar_contrasena: "Cambiar contraseña",
            contrasena_actual: "Contraseña actual",
            contrasena_nueva: "Contraseña nueva",
            repite_contrasena: "Repite la contraseña nueva",
            aceptar: "Aceptar",
            cancelar: "Cancelar",
        },
        signIn: {

        },
        signUp: {

        },
    },
    layout: {
        navbar: {

        },
        signedInLinks: {

        },
        signedOutLinks: {

        },
    },
    preguntas: {
        crearPregunta: {
            crear_pregunta: "Crear pregunta",
            pregunta: "Pregunta",
            descripcion: "Descripción",
            plan_reaccion: "Plan de reacción",
            categoria: "Categoría",
            crear: "Crear",
        },
        dashboardPregunta: {

        },
        detallesPregunta: {
            descripcion: "Descripción",
            categoria: "Categoría",
            plan_reaccion: "Plan de reacción",
            creado_por: "Creado por",
            creado: "Creado",
            ver_respuestas: "Ver respuestas",
        },
        detallesPreguntaIndividual: {

        },
        detallesPreguntasAuditoria: {
            respuestas_auditoria: "Respuestas de la auditoría",

        },
        editarPregunta: {
            editar_pregunta: "Editar pregunta",
            pregunta: "Pregunta",
            descripcion: "Descripción",
            plan_reaccion: "Plan de reacción",
            categoria: "Categoría",
            editar: "Editar",
        },
        preguntaGrafica: {

        },
        preguntas: {

        },
        tarjetaPregunta: {

        }
    }
}

lang.english = {
    locale: "en",
    return: "Return",
    cargando: "Loading...",
    auditorias: {
        auditorias: {

        },
        crearAuditoria: {
            crear_auditoria: "Create new audit",
            editar_auditoria: "Edit",
            nombre_auditoria: "Audit name",
            auditor: "Process",
            area: "Area",
            termina_el: " Due date ",
            inicia_el: "Start date ",
            agregar: "Add",
            cancelar: "Cancel",
            seleccionar_pregunta: "Select question",
            text1: "Search and select the question you wish to add, or ",
            text2: " create a new question, ",
            text3: "once created, you will find it within this list.",
            crear: "Create",
            editar: "Edit",
        },
        dashboardAuditorias: {
            ordenar_fecha: "Order by date",
            agrupar_areas: "Group by areas",
            mostrar_realizados: "Show already done",
            vista: "View",
            auditorias: "Audits",
        },
        detallesAuditoria: {
            auditor: "Auditor",
            descripcion: "Description",
            plan_reaccion: "Reaction plan",
            creada_por: "Created by",
            fecha_inicio: "Start date",
            fecha_finalizacion: "Due date",
            preguntas: "Questions (Tengo que poner los nombres de las preguntas)",
        },
        responderAuditoria: {
            responder_auditoria: "Answer audit",
            justificacion: "Justification",
            si: "Yes",
            no: "No",
            enviar: "Submit",
        },
        tarjetaAuditoria: {
            fecha_limite: "Due date",
            auditor: "Process",
        },
    },
    auth: {
        changePassword: {
            cambiar_contrasena: "Change password",
            contrasena_actual: "Current password",
            contrasena_nueva: "New password",
            repite_contrasena: "Repeat new password",
            aceptar: "Accept",
            cancelar: "Cancel",
        },
        signIn: {

        },
        signUp: {

        },
    },
    layout: {
        navbar: {

        },
        signedInLinks: {

        },
        signedOutLinks: {

        },
    },
    preguntas: {
        crearPregunta: {
            crear_pregunta: "Create question",
            pregunta: "Question",
            descripcion: "Description",
            plan_reaccion: "Reaction plan",
            categoria: "Category",
            crear: "Create",
        },
        dashboardPregunta: {

        },
        detallesPregunta: {
            descripcion: "Description",
            categoria: "Category",
            plan_reaccion: "Reaction plan",
            creado_por: "Created by",
            creado: "Created",
            ver_respuestas: "See answers",
        },
        detallesPreguntaIndividual: {

        },
        detallesPreguntasAuditoria: {
            respuestas_auditoria: "Audit answers",

        },
        editarPregunta: {

        },
        preguntaGrafica: {

        },
        preguntas: {

        },
        tarjetaPregunta: {

        }
    }
}

module.exports = lang;