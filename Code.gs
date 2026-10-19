// Clave de respuestas correctas (30 preguntas)
var ANSWER_KEY = {
  q1: "c", q2: "d", q3: "b", q4: "a", q5: "c", q6: "d",
  q7: "b", q8: "a", q9: "d", q10: "c", q11: "a", q12: "b",
  q13: "d", q14: "c", q15: "a", q16: "b", q17: "d", q18: "a",
  q19: "c", q20: "b", q21: "d", q22: "a", q23: "b", q24: "c",
  q25: "d", q26: "a", q27: "b", q28: "c", q29: "d", q30: "b"
};
var TOTAL_PREGUNTAS = 30;

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;

  if (sheet.getLastRow() === 0) {
    var headers = ["Fecha de envío", "Hora de envío", "Apellido Paterno", "Apellido Materno", "Nombre(s)"];
    for (var i = 1; i <= TOTAL_PREGUNTAS; i++) headers.push("P" + i);
    headers.push("Aciertos");
    headers.push("Calificación (0-10)");
    sheet.appendRow(headers);
  }

  var ahora = new Date();
  var zonaHoraria = Session.getScriptTimeZone();

  var row = [
    Utilities.formatDate(ahora, zonaHoraria, "dd/MM/yyyy"),
    Utilities.formatDate(ahora, zonaHoraria, "HH:mm:ss"),
    data.apellido_paterno || "",
    data.apellido_materno || "",
    data.nombres || ""
  ];

  var aciertos = 0;
  var incorrectas = [];
  for (var i = 1; i <= TOTAL_PREGUNTAS; i++) {
    var respuesta = data["q" + i] || "";
    var esCorrecta = respuesta && respuesta === ANSWER_KEY["q" + i];
    row.push(respuesta ? respuesta : "✗");
    if (esCorrecta) {
      aciertos++;
    } else {
      incorrectas.push(i);
    }
  }

  var calificacion = Math.round((aciertos / TOTAL_PREGUNTAS) * 10 * 10) / 10;
  row.push(aciertos);
  row.push(calificacion);

  sheet.appendRow(row);

  // Marca en rojo las respuestas incorrectas de esta fila
  var fila = sheet.getLastRow();
  var COLUMNA_INICIO_PREGUNTAS = 6; // A=Fecha, B=Hora, C=Ap.Paterno, D=Ap.Materno, E=Nombre(s), F=P1...
  incorrectas.forEach(function (numPregunta) {
    var columna = COLUMNA_INICIO_PREGUNTAS + (numPregunta - 1);
    sheet.getRange(fila, columna)
      .setBackground("#f8d7da")
      .setFontColor("#c0392b")
      .setFontWeight("bold");
  });

  return ContentService.createTextOutput(JSON.stringify({ result: "success", aciertos: aciertos, calificacion: calificacion }))
    .setMimeType(ContentService.MimeType.JSON);
}
