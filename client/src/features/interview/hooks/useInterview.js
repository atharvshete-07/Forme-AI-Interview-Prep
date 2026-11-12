import { generateInterviewReport, generateResumePdf, getAllInterviewReports, getInterviewReportById } from "../services/interview.api";
import { InterviewContext } from "../interview.context";
import { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";


export const useInterview = () => {
  const context = useContext(InterviewContext)
  const { interviewId } = useParams()
  if (!context) {
    throw new Error("useInterview must be used within InterviewProvider")
  }
  const { loading, setLoading, report, setReport, reports, setReports } = context
  const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true)
    try {
      const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
      setReport(response.interviewReport)
      return response.interviewReport
    } finally {
      setLoading(false)
    }
  }

  const getReportById = useCallback(async (interviewId) => {
    setLoading(true)
    try {
      const response = await getInterviewReportById(interviewId)
      setReport(response.interviewReport)
      return response.interviewReport
    } catch (error) {
      console.error("Error fetching interview report:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [setLoading, setReport])

  const getReports = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getAllInterviewReports()
      setReports(response.interviewReports)
    } catch (error) {
      console.error("Error fetching interview reports:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [setLoading, setReports])

  const getResumePdf = async (interviewReportId) => {
    try {
      const pdf = await generateResumePdf({ interviewReportId })
      const url = URL.createObjectURL(pdf)
      const link = document.createElement("a")
      link.href = url
      link.download = "tailored-resume.pdf"
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (error) {
      console.error("Error generating resume PDF:", error)
      throw error
    }
  }

  useEffect(() => {
    const loadData = interviewId ? getReportById(interviewId) : getReports()
    loadData.catch((error) => console.error("Error loading interview data:", error))
  }, [interviewId, getReportById, getReports])

  return { loading, report, reports, generateReport, getReportById, getResumePdf, getReports }
}