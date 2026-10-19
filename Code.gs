function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;

  if (sheet.getLastRow() === 0) {
    var headers = ["Fecha y hora de envío", "Apellido Paterno", "Apellido Materno", "Nombre(s)"];
    for (var i = 1; i <= 50; i++) headers.push("P" + i);
    sheet.appendRow(headers);
  }

  var row = [
    new Date(),
    data.apellido_paterno || "",
    data.apellido_materno || "",
    data.nombres || ""
  ];
  for (var i = 1; i <= 50; i++) {
    row.push(data["q" + i] || "");
  }
  sheet.appendRow(row);

  return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
