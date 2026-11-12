const pdfparse = require("pdf-parse");
const mongoose = require("mongoose");
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model")


/**
 *@description controller to genrate interview report based on user self description , resume & job description
 */
async function genrateInterviewReportController(req, res) {
  const { selfDescription, jobDescription } = req.body
  if (!jobDescription?.trim()) {
    return res.status(400).json({ message: "Job description is required." })
  }
  if (!req.file && !selfDescription?.trim()) {
    return res.status(400).json({ message: "Upload a resume or provide a self-description." })
  }

  let resume = ""
  if (req.file) {
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF resumes are supported." })
    }

    const parser = new pdfparse.PDFParse({ data: req.file.buffer })
    try {
      const resumeContent = await parser.getText()
      resume = resumeContent.text
    } catch {
      return res.status(400).json({ message: "The uploaded file could not be read as a PDF." })
    } finally {
      await parser.destroy()
    }
  }

  let interviewReportByAi
  try {
    interviewReportByAi = await generateInterviewReport({
      resume,
      selfDescription,
      jobDescription
    })
  } catch (error) {
    const status = error.status || error.statusCode
    if (status === 503) {
      console.error("AI report generation service is unavailable:", error.message)
      return res.status(503).json({
        message: "The AI service is temporarily unavailable. Please wait a moment and try again."
      })
    }
    if (status === 429) {
      console.error("AI report generation rate limit reached:", error.message)
      return res.status(429).json({
        message: "The AI service is receiving too many requests. Please try again shortly."
      })
    }
    throw error
  }

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume,
    selfDescription,
    jobDescription,
    ...interviewReportByAi
  })
  res.status(201).json({
    message: "Interview report genrated successfully",
    interviewReport
  })
}

/**
 * @description controller to get interview report by interviewId
 */
async function getInterviewReportByIdController(req, res) {
  const { interviewId } = req.params
  const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })
  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found."
    })
  }
  res.status(200).json({
    message: "Interview report fetched successfully.", interviewReport
  })
}

/**
 * @description controller to download the resume or self-description for an interview report as a PDF
 */
async function getInterviewResumePdfController(req, res, next) {
  const { interviewReportId } = req.params
  if (!mongoose.isValidObjectId(interviewReportId)) {
    return res.status(400).json({ message: "Invalid interview report ID." })
  }

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewReportId,
    user: req.user.id
  })
  if (!interviewReport) {
    return res.status(404).json({ message: "Interview report not found." })
  }

  if (!interviewReport.resume && !interviewReport.selfDescription) {
    return res.status(404).json({ message: "No resume or profile description is available to download." })
  }

  try {
    const pdf = await generateResumePdf({
      resume: interviewReport.resume,
      selfDescription: interviewReport.selfDescription,
      jobDescription: interviewReport.jobDescription
    })

    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", 'attachment; filename="tailored-resume.pdf"')
    return res.send(Buffer.from(pdf))
  } catch (error) {
    const status = error.status || error.statusCode
    if (status === 503 || status === 429) {
      console.error("AI resume generation service error:", error.message)
      return res.status(status).json({
        message: status === 503
          ? "The AI service is temporarily unavailable. Please try again shortly."
          : "The AI service is receiving too many requests. Please try again shortly."
      })
    }

    console.error("Resume PDF generation failed:", error.message)
    return next(error)
  }
}

/**
 * @description controller to get all interview reports of logged in user
 */
async function getAllInterviewReportsController(req, res) {
  const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
  res.status(200).json({
    message: "All interview reports fetched successfully.", interviewReports
  })
}

/**
 * @description controller to generate a PDF of the resume or self-description,resume and job description for an interview report
 */
async function getrateReportPdfController(req, res, next) {
  const { interviewReportId } = req.params

  const interviewReport = await interviewReportModel.findById(interviewReportId)
  if (!interviewReport) {
    return res.status(404).json({ message: "Interview report not found." })
  }
  const { resume, selfDescription, jobDescription } = interviewReport
  const pdfBuffer = await generateResumePdf({ Resume: resume, selfDescription, jobDescription })
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,

  })

}

module.exports = {
  genrateInterviewReportController,
  getInterviewReportByIdController,
  getInterviewResumePdfController,
  getAllInterviewReportsController
}