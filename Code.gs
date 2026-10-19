// Clave de respuestas correctas (30 preguntas)
var ANSWER_KEY = {
  q1: "b", q2: "a", q3: "a", q4: "b", q5: "b", q6: "a",
  q7: "b", q8: "b", q9: "b", q10: "b", q11: "b", q12: "a",
  q13: "a", q14: "b", q15: "c", q16: "c", q17: "b", q18: "c",
  q19: "a", q20: "b", q21: "a", q22: "b", q23: "a", q24: "b",
  q25: "b", q26: "b", q27: "c", q28: "c", q29: "a", q30: "a"
};
var TOTAL_PREGUNTAS = 30;

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;

  if (sheet.getLastRow() === 0) {
    var headers = ["Fecha y hora de envío", "Apellido Paterno", "Apellido Materno", "Nombre(s)"];
    for (var i = 1; i <= TOTAL_PREGUNTAS; i++) headers.push("P" + i);
    headers.push("Aciertos");
    headers.push("Calificación (0-10)");
    sheet.appendRow(headers);
  }

  var row = [
    new Date(),
    data.apellido_paterno || "",
    data.apellido_materno || "",
    data.nombres || ""
  ];

  var aciertos = 0;
  for (var i = 1; i <= TOTAL_PREGUNTAS; i++) {
    var respuesta = data["q" + i] || "";
    row.push(respuesta);
    if (respuesta && respuesta === ANSWER_KEY["q" + i]) {
      aciertos++;
    }
  }

  var calificacion = Math.round((aciertos / TOTAL_PREGUNTAS) * 10 * 10) / 10;
  row.push(aciertos);
  row.push(calificacion);

  sheet.appendRow(row);

  return ContentService.createTextOutput(JSON.stringify({ result: "success", aciertos: aciertos, calificacion: calificacion }))
    .setMimeType(ContentService.MimeType.JSON);
}
