
    document.addEventListener("DOMContentLoaded", function () {
      const exportarPdfButton = document.getElementById("exportar_pdf");
      if (!exportarPdfButton) {
        console.error("El botón 'exportar_pdf' no se encontró.");
        return;
      }
      exportarPdfButton.addEventListener("click", async function () {
        console.log("Botón de exportar PDF presionado.");
        const mensajeExportacionDiv = document.getElementById("mensaje_exportacion");
        mensajeExportacionDiv.textContent = "Generando PDF, por favor espere...";
        const nombreCliente = document.getElementById("nombre_cliente").value.trim();
        const tienda = document.getElementById("tienda").value.trim();
        if (!nombreCliente) {
          alert("Por favor, ingresa el nombre del cliente.");
          mensajeExportacionDiv.textContent = "";
          return;
        }
        try {
         // Crear el documento PDF
const pdfDoc = await PDFLib.PDFDocument.create();
const helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
const helveticaBoldFont = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
const firstPage = pdfDoc.addPage();
const { width, height } = firstPage.getSize();

const mainTitleFontSize = 24;
const subTitleFontSize = 16;
const mainTitle = "REPORTE DE IMEI CLONADO / DUPLICADO";
const clientText = `NOMBRE DEL CLIENTE: ${nombreCliente}`;
const tiendaText = `TIENDA: ${tienda}`;

// Define un margen (en puntos, por ejemplo 40)
const margin = 40;

// Calcula el ancho del texto
const mainTitleWidth = helveticaBoldFont.widthOfTextAtSize(mainTitle, mainTitleFontSize);
const clientTextWidth = helveticaFont.widthOfTextAtSize(clientText, subTitleFontSize);
const tiendaTextWidth = helveticaFont.widthOfTextAtSize(tiendaText, subTitleFontSize);

// Calcula la posición x para centrar dentro del área definida por el margen:
const centeredX = margin + ((width - 2 * margin - mainTitleWidth) / 2);

// Definir la posición vertical (puedes ajustar según tus necesidades)
const startY = height - 400;

// Dibujar el título principal con el color azul
firstPage.drawText(mainTitle, {
  x: (width - mainTitleWidth) / 2,
  y: startY,
  size: mainTitleFontSize,
  font: helveticaBoldFont,
  color: PDFLib.rgb(0, 0.4, 1)  // Aquí se establece el color azul
});

// Dibujar el nombre del cliente centrado debajo del título
firstPage.drawText(clientText, {
  x: (width - clientTextWidth) / 2,
  y: startY - mainTitleFontSize - 10,
  size: subTitleFontSize,
  font: helveticaFont,
  color: PDFLib.rgb(0.1, 0.2, 0)
});

// Dibujar el nombre de la tienda centrado debajo del nombre del cliente
firstPage.drawText(tiendaText, {
  x: (width - tiendaTextWidth) / 2,
  y: startY - mainTitleFontSize - subTitleFontSize - 20,
  size: subTitleFontSize,
  font: helveticaFont,
  color: PDFLib.rgb(0, 0, 0)
});

          // Array de archivos a añadir con su encabezado
          const files = [
            { file: osiptel_capture.files[0], header: '1. CAPTURA DE PÁGINA DE OSIPTEL:' },
            { file: transferencia_osiptel.files[0], header: '2. CAPTURA DE TRANSFERENCIA A OSIPTEL:' },
            { file: foto_imei_fisico.files[0], header: '3. FOTO IMEI FÍSICO:' },
            { file: foto_imei_logico.files[0], header: '4. FOTO IMEI LÓGICO:' },
            { file: solicitud_abonado.files[0], header: '5. SOLICITUD DE CUESTIONAMIENTO:' },
            { file: validacion_identidad.files[0], header: '6. VALIDACIÓN DE IDENTIDAD:' },
            { file: captura_gsma.files[0], header: '7. CAPTURA GSMA:' }
          ];
          async function embedFile(pdfDoc, file, headerText) {
            return new Promise(async (resolve, reject) => {
              if (!file) {
                console.log(`No se seleccionó archivo para: ${headerText}`);
                resolve();
                return;
              }
              try {
                const bytes = new Uint8Array(await file.arrayBuffer());
                if (file.type === 'application/pdf') {
                  const pdfLoaded = await PDFLib.PDFDocument.load(bytes);
                  const copiedPages = await pdfDoc.copyPages(pdfLoaded, pdfLoaded.getPageIndices());
                  copiedPages.forEach(page => {
                    pdfDoc.addPage(page);
                  });
                  console.log(`Archivo PDF incrustado: ${headerText}`);
                  resolve();
                } else if (file.type.startsWith('image/')) {
                  let image;
                  if (file.type === 'image/png') {
                    image = await pdfDoc.embedPng(bytes);
                  } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                    image = await pdfDoc.embedJpg(bytes);
                  }
                  if (image) {
                    const page = pdfDoc.addPage();
                    const { width: origWidth, height: origHeight } = image;
                    const imageWidth = Math.min(width * 0.8, 400);
                    const imageHeight = (imageWidth / origWidth) * origHeight;
                    const helveticaBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
                    const headerSize = 18;
                    const headerWidth = helveticaBold.widthOfTextAtSize(headerText, headerSize);
                    const headerX = (width - headerWidth) / 2;
                    const headerY = page.getHeight() - 70;
                    page.drawText(headerText, {
                      x: headerX,
                      y: headerY,
                      size: headerSize,
                      font: helveticaBold,
                      color: PDFLib.rgb(0, 0, 0)
                    });
                    page.drawImage(image, {
                      x: (width - imageWidth) / 2,
                      y: headerY - imageHeight - 20,
                      width: imageWidth,
                      height: imageHeight
                    });
                  }
                  console.log(`Imagen incrustada: ${headerText}`);
                  resolve();
                } else {
                  console.log(`Tipo de archivo no soportado para: ${headerText}`);
                  resolve();
                }
              } catch (error) {
                console.error(`Error al incrustar archivo (${headerText}):`, error);
                reject(error);
              }
            });
          }
          for (const item of files) {
            await embedFile(pdfDoc, item.file, item.header);
          }
          console.log("Todos los archivos fueron procesados.");
          const pdfBytes = await pdfDoc.save();
          const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(pdfBlob);
          link.download = 'Reporte_IMEI_Clonado.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          mensajeExportacionDiv.textContent = 'Tu archivo está listo y descargado.';
         
          console.log("PDF descargado exitosamente.");
        } catch (error) {
          console.error("Error durante la generación del PDF:", error);
          mensajeExportacionDiv.textContent = "Error al generar el PDF.";
        }
      });
    });

