# Conectar el examen a Google Sheets

Ya creé la hoja de cálculo donde se guardarán las respuestas:

**https://docs.google.com/spreadsheets/d/1hrN24xay49fPs2gT-VgY9UjD6L_stus-vrvH9OJAV38/edit**

El código del lado de Google (`Code.gs`) ya está listo en este repositorio. Para activarlo tienes que hacer estos pasos tú mismo, porque requieren tu autorización de Google (yo no puedo hacer clic en "Autorizar" por ti):

1. Abre la hoja de cálculo del enlace de arriba.
2. Ve a **Extensiones → Apps Script**.
3. Borra el código de ejemplo que aparece (`function myFunction() {...}`) y pega el contenido del archivo [`Code.gs`](./Code.gs) de este repositorio.
4. Guarda el proyecto (ícono de disco o Ctrl+S). Ponle un nombre si te lo pide.
5. Haz clic en **Implementar → Nueva implementación**.
6. En "Seleccionar tipo", elige el ícono de engrane y selecciona **Aplicación web**.
7. Configura:
   - **Ejecutar como:** Yo (tu cuenta)
   - **Quién tiene acceso:** Cualquier usuario
8. Haz clic en **Implementar**. Google te pedirá autorizar el acceso — acepta los permisos (son tuyos, para que el script pueda escribir en tu propia hoja).
9. Copia la **URL de la aplicación web** que te da (termina en `/exec`).
10. Pásame esa URL (o edítala tú mismo) y la coloco en el archivo `index.html`, en esta línea:

   ```js
   var SCRIPT_URL = "PEGA_AQUI_TU_URL_DE_GOOGLE_APPS_SCRIPT";
   ```

Una vez conectada, cada vez que un alumno conteste y presione **"Enviar respuestas"**, se agregará una fila nueva en la hoja con: fecha/hora, apellido paterno, apellido materno, nombre(s), grupo, fecha del examen y sus 50 respuestas (P1–P50).

> Nota: si alguna vez necesitas volver a desplegar cambios del script, usa "Implementar → Administrar implementaciones → Editar → Nueva versión" para que la misma URL tome los cambios nuevos.
