import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Search, AlertTriangle, Info } from "lucide-react";

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState("");

const riskTerms = [
  { term: "Force Majeure", definition: "A clause freeing parties from liability due to extraordinary events beyond their control.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Indemnification", definition: "A contractual obligation to compensate another party for harm, loss, or liability.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Liquidated Damages", definition: "Pre-determined monetary penalties payable if contract terms are breached.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Governing Law", definition: "The jurisdiction whose laws govern the contract.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Non-Disclosure Agreement", definition: "Prevents parties from sharing confidential information.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Termination Clause", definition: "Specifies conditions under which a contract can be ended.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Breach of Contract", definition: "Failure to perform contractual obligations.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Confidentiality", definition: "Obligation to keep certain information private.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Arbitration", definition: "Dispute resolution outside the courts.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Assignment Clause", definition: "Specifies whether contractual rights can be transferred.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Intellectual Property", definition: "Legal rights protecting creations of the mind.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Warranty", definition: "Guarantee of a product or service quality.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Representation", definition: "Statement of fact made to induce agreement.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Severability", definition: "Allows parts of the contract to remain valid even if others are void.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Assignment", definition: "Transfer of rights or obligations under a contract.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Limitation of Liability", definition: "Clause restricting amount recoverable for damages.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Notice Clause", definition: "Specifies how formal notifications must be delivered.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Exclusivity", definition: "Restricts parties from dealing with competitors.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Payment Terms", definition: "Conditions regarding payment timing and methods.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Conflicts of Interest", definition: "Situations where personal interest may conflict with duties.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Compliance", definition: "Adherence to applicable laws and regulations.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Subcontracting", definition: "Use of third parties to fulfill contractual obligations.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Force Majeure Event", definition: "Specific unforeseen events triggering force majeure.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Confidential Information", definition: "Information that must be kept secret.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Termination for Convenience", definition: "Allows contract termination without cause.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Covenant", definition: "Promise in a contract to do or not do something.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Indemnity Cap", definition: "Maximum amount recoverable under indemnification.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Warranty Disclaimer", definition: "Limits or excludes warranties.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "IP Ownership", definition: "Defines ownership of intellectual property.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Data Protection", definition: "Obligation to handle personal data properly.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Governing Language", definition: "Specifies official contract language.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Escrow", definition: "Third-party holding funds or assets pending contract fulfillment.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Default", definition: "Failure to perform contractual obligations.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Remedies", definition: "Legal options available when a breach occurs.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Liquidated Loss", definition: "Predetermined compensation for breach.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Good Faith", definition: "Acting honestly and fairly in contract performance.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Assignment Restrictions", definition: "Limits on transferring rights or obligations.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Non-Compete", definition: "Restricts working with competitors.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Representation & Warranty", definition: "Statement assuring a fact or condition.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Joint Liability", definition: "Multiple parties share responsibility.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Severance", definition: "Termination benefits or provisions.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Dispute Resolution", definition: "Process for resolving disagreements.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Arrears", definition: "Outstanding payment obligations.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Assignment Notice", definition: "Notification of transfer of rights.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Termination for Cause", definition: "Contract end due to a party's failure.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Warranty Period", definition: "Duration of warranty coverage.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Confidentiality Breach", definition: "Disclosure of confidential information.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Material Adverse Change", definition: "Significant change affecting contract obligations.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Non-Solicitation", definition: "Prevents soliciting employees or clients.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Right of First Refusal", definition: "Option to accept before others.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Confidentiality Obligations", definition: "Duties to maintain secrecy.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Escalation Clause", definition: "Specifies how disputes escalate to higher authority.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Termination Notice", definition: "Formal notice period for ending contract.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Breach Notification", definition: "Requirement to inform the other party of a breach.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Change of Control", definition: "Clause triggered by a change in ownership or management.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Confidentiality Duration", definition: "Length of time confidential information must be protected.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Penalty Clause", definition: "Specifies financial penalties for non-performance.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Performance Bond", definition: "Security guaranteeing contract performance.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Subrogation", definition: "Right of one party to assume the legal rights of another.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Joint Venture Agreement", definition: "Contract defining terms between co-investing parties.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Assignment Approval", definition: "Requirement to get consent before transferring rights.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Exculpatory Clause", definition: "Limits liability of a party for damages.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Non-Performance", definition: "Failure to meet contractual obligations.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Warranty Enforcement", definition: "Mechanism to enforce warranties.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Good Standing Certificate", definition: "Proof that a party is compliant and active.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Credit Risk", definition: "Risk of non-payment by the counterparty.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Operational Risk", definition: "Risk arising from internal processes or systems.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Regulatory Risk", definition: "Risk of non-compliance with laws and regulations.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Counterparty Risk", definition: "Risk that the other party may default.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Insurance Requirement", definition: "Obligation to maintain insurance coverage.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Audit Rights", definition: "Rights to inspect or audit a party's records.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Force Majeure Notice", definition: "Requirement to notify the other party of a force majeure event.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Liquidation Risk", definition: "Risk of financial loss if assets are liquidated.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Confidentiality Indemnity", definition: "Obligation to compensate for breach of confidentiality.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Material Breach", definition: "A significant violation that allows termination or remedies.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Escalation Procedure", definition: "Steps to resolve disputes or issues.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Assignment Limitation", definition: "Restrictions on transferring obligations.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Compliance Audit", definition: "Review to ensure adherence to regulations.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Termination Fee", definition: "Fee payable if a contract is terminated early.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Indemnity Duration", definition: "Period for which indemnification applies.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Confidentiality Exceptions", definition: "Situations where confidentiality does not apply.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Risk Allocation", definition: "Assignment of risk responsibilities among parties.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Limitation Period", definition: "Time frame to claim remedies for breaches.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Performance Metrics", definition: "Standards used to measure contractual performance.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Third Party Rights", definition: "Rights granted to non-parties of the contract.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Breach Consequences", definition: "Effects or remedies resulting from a breach.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Termination Procedure", definition: "Steps to legally terminate a contract.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Change Control", definition: "Process to manage changes in contractual terms.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Force Majeure Scope", definition: "Extent of events covered under force majeure.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Confidentiality Scope", definition: "What information is considered confidential.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Risk Mitigation", definition: "Measures to reduce potential risks.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Payment Default", definition: "Failure to make timely payments.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Warranty Claim", definition: "Request for remedy under a warranty.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Indemnity Trigger", definition: "Event that activates indemnification.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Arbitration Award", definition: "Decision given by an arbitration panel.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Non-Reliance", definition: "Statement that parties do not rely on extra-contractual statements.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Assignment Clause Breach", definition: "Violation of assignment restrictions.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Confidentiality Indemnification Cap", definition: "Maximum liability for confidentiality breaches.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Contract Review", definition: "Assessment to identify risks and obligations.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Notification Requirements", definition: "Formal requirements for sending notices.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Risk Reporting", definition: "Obligation to report identified risks.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Force Majeure Notification Period", definition: "Timeframe to notify the other party of force majeure.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Termination for Non-Performance", definition: "Ending a contract because a party fails to perform.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Contract Variation", definition: "Modifications made to the original contract.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Confidentiality Remedies", definition: "Actions available in case of a breach of confidentiality.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Risk Assessment", definition: "Evaluation of potential contract risks.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Severability Clause", definition: "Ensures the rest of the contract remains valid if one part is invalid.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Entire Agreement", definition: "Confirms the contract represents the full agreement between parties.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "No Waiver", definition: "Failure to enforce a term does not waive the right to enforce it later.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Secrecy Obligation", definition: "Duty to keep certain information confidential.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Non-Circumvention", definition: "Prevents parties from bypassing contractual arrangements for personal gain.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Intellectual Property Rights", definition: "Ownership and usage rights of creations and inventions.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Data Protection", definition: "Ensures compliance with privacy and data laws.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Service Level Agreement", definition: "Specifies performance standards and remedies.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Dispute Resolution", definition: "Mechanism to resolve disagreements between parties.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Termination for Convenience", definition: "Allows contract termination without cause.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Subcontracting", definition: "Permission and restrictions for delegating work to third parties.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Assignment of Rights", definition: "Ability to transfer contractual rights to another party.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Force Majeure Relief", definition: "Exemption from liability for extraordinary events.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Limitation of Liability", definition: "Caps on financial or legal responsibility.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Indemnity Scope", definition: "Defines events covered by indemnification.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Termination Notice", definition: "Required notice period before ending the contract.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Non-Compete", definition: "Prevents parties from competing during and after contract term.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Remedies Exclusive", definition: "Specifies the only remedies available for breach.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Contractual Waiver", definition: "Voluntary relinquishment of a right or claim.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Governing Jurisdiction", definition: "Which court or legal system applies.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Mediation Requirement", definition: "Obligation to attempt mediation before legal action.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Non-Solicitation", definition: "Prevents poaching of employees or clients.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Breach Remedy", definition: "Specifies consequences for contract violations.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Notice Delivery", definition: "Method for sending formal notifications.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Binding Effect", definition: "Confirms the contract applies to successors and assigns.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Counterparts Clause", definition: "Contract may be signed in multiple copies.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Headings Clause", definition: "Headings do not affect interpretation of terms.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Interpretation Rules", definition: "Guidelines for how contract terms are interpreted.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Partial Invalidity", definition: "Invalid parts do not void the entire contract.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Execution Date", definition: "Date on which the contract is signed and effective.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Contract Duration", definition: "Length of time the contract is valid.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Renewal Terms", definition: "Conditions under which a contract may be renewed.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Automatic Renewal", definition: "Contract automatically extends unless terminated.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Termination Rights", definition: "Circumstances under which the contract can be ended.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Escrow Requirement", definition: "Funds or documents held by a third party.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Payment Terms", definition: "Agreed schedule and method of payment.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Late Payment Fee", definition: "Penalty for delayed payment.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Performance Guarantee", definition: "Assurance of satisfactory execution of obligations.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Warranty Period", definition: "Duration of warranty coverage.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Risk Sharing", definition: "Allocation of potential losses between parties.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Change Management", definition: "Procedures to manage modifications.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Disclaimers", definition: "Statements limiting liability or responsibility.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Force Majeure Limitations", definition: "Restrictions on claiming force majeure.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Substitute Performance", definition: "Requirement to provide alternate fulfillment of obligations.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Exit Strategy", definition: "Plan for ending a contract or partnership.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Risk Review", definition: "Periodic assessment of contract risks.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Liability Insurance", definition: "Insurance covering legal responsibility.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Breach Escalation", definition: "Procedure to address serious breaches.", riskLevel: "High", color: "bg-red-100 text-red-800" },
  { term: "Audit Compliance", definition: "Ensures adherence to regulatory or contractual obligations.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Performance Review", definition: "Evaluation of contractual performance.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Dispute Escalation", definition: "Steps to escalate unresolved disputes.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Contract Archiving", definition: "Maintaining records for legal or compliance purposes.", riskLevel: "Low", color: "bg-green-100 text-green-800" },
  { term: "Contract Amendment", definition: "Formal change to the original contract.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { term: "Delegation of Duties", definition: "Assigning responsibilities to other parties.", riskLevel: "Medium", color: "bg-yellow-100 text-yellow-800" }
];



const filteredTerms = riskTerms.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show top 6 by default if no search, otherwise show all filtered
  const termsToDisplay = searchTerm ? filteredTerms : filteredTerms.slice(0, 6);

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Risk Glossary</h1>
          <p className="text-lg text-gray-600 dark:text-[#A0A0A0]">
            Understanding common legal terms and their risk implications
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <Input
              placeholder="Search legal terms..."
              className="pl-10 py-3 text-lg border-gray-200 dark:border-gray-700 dark:bg-[#1E1E1E] dark:text-[#EAEAEA] focus:border-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Terms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {termsToDisplay.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
              No terms found.
            </p>
          ) : (
            termsToDisplay.map((item, index) => (
              <Card
                key={index}
                className="shadow-lg border-none hover:shadow-xl transition-shadow duration-200 bg-white dark:bg-[#1E1E1E]"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-start justify-between">
                    <span className="text-lg font-bold text-gray-900 dark:text-[#EAEAEA] flex-1">
                      {item.term}
                    </span>
                    <Badge className={item.color}>{item.riskLevel}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-[#A0A0A0] leading-relaxed mb-4">{item.definition}</p>
                  <div className="flex items-center space-x-2 text-sm">
                    {item.riskLevel === "High" && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    {item.riskLevel === "Medium" && <Info className="w-4 h-4 text-yellow-500" />}
                    {item.riskLevel === "Low" && <Info className="w-4 h-4 text-green-500" />}
                    <span className="text-gray-500 dark:text-gray-400">{item.riskLevel} risk impact</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Footer / Request */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-[#A0A0A0]">
            Don't see a term you're looking for? 
            <span className="text-blue-600 font-medium ml-1 cursor-pointer hover:underline">Request it here</span>
          </p>
        </div>
      </div>
    </div>
  );
}