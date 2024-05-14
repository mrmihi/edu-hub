const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs").promises;
const Learner = require("../models/learnerSchema");

//API to generate PDF
module.exports.genaratePdf = async (req, res) => {
  try {
    let startingPoint = 730;
    const learners = await Learner.find();

    //create new PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    page.drawText("Details of Learners", { x: 140, y: 780, size: 40 });

    for (let i = 0; i < learners.length; i++) {
      page.drawText(`Name : ${learners[i].name}`, {
        x: 50,
        y: startingPoint,
        size: 15,
      });
      page.drawText(`Email : ${learners[i].email}`, {
        x: 50,
        y: startingPoint - 20,
        size: 10,
      });
      page.drawText(`Phone : ${learners[i].contact}`, {
        x: 50,
        y: startingPoint - 40,
        size: 10,
      });
      page.drawText(`Enrolled Courses : ${learners[i].enrolledCourses}`, {
        x: 50,
        y: startingPoint - 60,
        size: 10,
      });
      startingPoint -= 120;
    }

    //save the pdf to temporary file
    const pdfBytes = await pdfDoc.save();
    await fs.writeFile("temporary.pdf", Buffer.from(pdfBytes));

    res.download("temporary.pdf", "learners_report.pdf", (err) => {
      if (err) {
        console.error("Error downloading PDF: ", err);
        res.status(500).json({ error: "Failed to download PDF" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "PDF Generation failed" });
  }
};

//API to download PDF
module.exports.downloadaPDF = async (req, res) => {
  res.download("temporary.pdf", "learners_report.pdf", (err) => {
    if (err) {
      console.error("Error downloading PDF: ", err);
      res.status(500).json({ error: "Failed to download PDF" });
    }
  });
};
