# CAMBIOS VARIOS: .gitignore 

> Ya no se va a subir /node_modules

Para evitar contratiempos por módulos que instale o desinstale (tardan mucho en indexarse en GitHub), ustedes no van a ver una carpeta de /node_modules, los van a tener que instalar ustedes, no es difícil.

1. Abran un CMD en la carpeta de /gst-myapp
2. Escriban `npm i` y denle ENTER (cortesía del [*WadaGamer*](https://github.com/wadagamer))

## Por hacer en este momento:
**Programación (principalmente)**
* La vista principal (la de auditorias) necesita poder filtrarse/ordenarse, en principio tanto para administradores como usuarios normales.
* ~~Se debe incluír un nivel al momento de crear los usuarios (dejé más info en `/store/actions/authActions.js`).~~
* ~~Se debe empezar a limitar las vistas según el nivel del usuario.~~
* ~~Al crear la auditoría aún falta poder seleccionar preguntas, y de preferencia, si no existe la pregunta que se quiere, se puede crear y añadir al momento sin perder lo que ya se tenía hecho, haganlo a medias para empezar.~~
* ~~Empezar a crear el componente de **preguntaGrafica** para el admin, donde además de la información va a poder ver una gráfica de pastel con la proporción de SI vs NO, esto también incluye otra vista para las **respuestas.justificación** correspondientes a esa pregunta, ya hay un archivo `/componentes/preguntas/DetallesPregunta.js`, aún no empecé con las gráficas.~~
* ~~A su vez, se necesita la vista de las **preguntaGrafica** correspondientes a una auditoria específica.~~
* ~~Al crear pregunta, seleccionar la categoría a la que pertenecerá usando **RadioButtons** o un **Select**, procuren utilizar [esta página](material-ui.com/) para tener elementos HTML más "modernos". Los **radioButtons** que he usado han sido clases instaladas de aquí, ya descargué la librería, solo tienen que importarla, no descargan nada.~~
* ~~Añadir en las **preguntas** botones para editar y eliminar.~~
* Crear un "segundo NavBar", que en realidad es para poner los títulos de cada sección, y los botones correspondientes, para más detalle checken el [documento del Drive](https://drive.google.com/file/d/1i8QxAv7rpu3QY9a8UCQw_CLSR4c-5Kex/view?usp=sharing).
* Las ventanas de diálogo al completar una acción o al estar a punto de realizar algo irremediable, en este momento solo estoy usando redirects. [Se me había pasado poner el link la última vez](https://material-ui.com/es/components/dialogs/#alerts).
* ~~Añadir el ícono de urgencia dentro de `/componentes/auditoria/TarjetaAuditoria.js`.~~
* ~~Cuando se tenga uso del atributo **userLevel**, si el nivel es 0 (admin) se debe cambiar el ícono de "urgencia" al de "gráfica".~~
* Botón de **return**, probablemente se haga usando el atributo de **props.history** o con alguna configuración de redireccionamientos con un archivo similar a `/config/config.js`.
* Una mejor forma de crear usuarios, esto de preferencia cuando ya se establezca **userLevel**, así ya podemos quitar el SignUp de la lista de direcciones.
* ~~Se necesita una forma de saber si un usuario ya realizó cierta auditoría, lo más fácil es consultar en la colección de **respuestas** por algo que tenga la *id* de la auditoria y el del usuario, con que haya uno basta, no se necesitan ver las respuestas que publicó.~~
* Agregar el logo de la empresa al login y al NavBar.
* ~~En este momento, al hacer click en una auditoria nos lleva a `/responder-auditoria/:id/`, pero ya está disponible `/detalles-preguntas-auditoria/:id`, hacer que según el tipo de usuario se vaya a una u otra.~~

**Diseño a.k.a. "suavizar lo feo que está algo"**
* Cambiar los estilos del Login.
* En general, en este momento se están usando estilos sacados de [Materialize](materializecss.com/), al final lo suyo es que estén en un directorio del proyecto. Materialize se puede descargar con `npm install materialize-css@next` pero no tengo garantía que el JS venga incluído, me gustaría que la mayoría estuviera en nuestro repositorio (pueden copiar u pegar la mayoría, está disponible [aquí](https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css)).
* Si las tarjetas (al menos las de auditoría) no tienen el mismo contenido, se rompe la Grid, de momento lo que hice es cortar el título, pero no creo que sea lo único que se pueda hacer.
* Al cargar el componente hay un espacio de medio segundo en el que se ve el cuado ocupando 30px de alto y luego de golpe 800px, se ve feo, ¿pueden hacer que sea una animación de 0% a 100% de height?

## Referencias
* Mi principal fuente de tutoriales para todo esto [The Net Ninja - React+Redux](https://youtube.com/playlist?list=PL4cUxeGkcC9ij8CfkAY2RAGb-tmkNwQHG) y [The Net Ninja - React+Redux+Firebase](https://youtube.com/playlist?list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3), tómenselo con calma, son 80 vídeos de entre 3 y 15 minutos. No les recomiento ver una playlist sin la otra, y si quieren aprovechar el tiempo, sigan el curso tratando de no copiar demasiado (sí, hagan *dummy projects* para aprender más rápido, no solo vean).
* La [documentación de React](https://es.reactjs.org/docs/getting-started.html), que es lo que estamos usando de base.
* [Materialize](https://materializecss.com/), muy útil para no involucrarse mucho con el CSS, solo ponen algo como `<div className="blue container"></div>` y listo, tienen un container azul.
* [Material-UI](https://material-ui.com/es/), ya tienen la librería instalada, esta cosa trae componentes HTML adaptados a REACT.
* [Códigos hexadecimales seguros para programadores](https://htmlcolorcodes.com/color-chart/)
* [Íconos estilo google fáciles de implementar](https://fonts.google.com/icons). Ya hice todo lo necesario, solo necesitan copiar y pegar la línea de código que los representa.
