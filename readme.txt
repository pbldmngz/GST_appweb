CAMBIOS VARIOS: .gitignore --> Ya no se va a subir /node_modules

Para evitar contratiempos por módulos que instale o desinstale (tardan mucho en indexarse en gitHub), ustedes no van a ver una carpeta de /node_modules, los van a tener que instalar ustedes, no es difícil.

1. Abran un CMD en la carpeta de /gst-myapp
2. Peguen todo esto y denle enter.

npm i react-router-dom redux react-redux redux-thunk firebase redux-firestore react-redux@5.1.1 react-redux-firebase@2.2.4 moment

3. Ya pueden darle a npm start


Si no les funciona prueben de uno en uno:

npm i react-router-dom
npm i redux
npm i react-redux
npm i redux-thunk
npm i firebase
npm i redux-firestore
npm i --save react-redux@5.1.1 react-redux-firebase@2.2.4
npm i moment

Si ni así les funciona lo más probable es que no tengan instalado node.js