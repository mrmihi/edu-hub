const express = require("express");
const {genaratePdf,downloadaPDF} = require("../controllers/ReportGenerateContoller");

const pdfRouter = express.Router();

pdfRouter.get("/generate-pdf", genaratePdf);
pdfRouter.get("/download-pdf", downloadaPDF);

module.exports = pdfRouter;
