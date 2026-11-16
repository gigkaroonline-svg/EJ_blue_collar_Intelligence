export type FormType =
  | "employer_requirement"
  | "sourcing_partner_application"
  | "government_initiative_suggestion"
  | "blog_insight"
  | "contact";
export type Field = {
  name: string;
  label: string;
  type?: "email" | "tel" | "url" | "number" | "textarea" | "file" | "phone";
  optional?: boolean;
  group?: string;
  accept?: string;
  hint?: string;
};
export const formContent: Record<FormType, { title: string; button: string; success: string; consent: string; fields: Field[] }> = {
  employer_requirement: {
    title: "Submit Your Workforce Requirement", button: "Submit Your Hiring Requirements",
    success: "Thank you. We have received your requirement. Our team will review it and get in touch to discuss the next steps.",
    consent: "By submitting this form, I agree that RojMitra/EarlyJobs may use the information I provide to contact me about this workforce requirement. I can review the website's privacy information or contact info@earlyjobs.in with data-use questions.",
    fields: [
      {name:"company",label:"Company / Organisation Name",group:"Company Information"},
      {name:"contactPerson",label:"Contact Person"},
      {name:"email",label:"Official Email Address",type:"email"},
      {name:"industry",label:"Industry",group:"Hiring Requirement"},
      {name:"workersRequired",label:"Number of Workers Required",type:"number"},
      {name:"hiringLocation",label:"Hiring Location (State, District and City)"}
    ]
  },
  sourcing_partner_application: {
    title:"Join as a Sourcing Partner",button:"Join as a Sourcing Partner",
    success:"Thank you. We have received your interest. Our team will review your details and get in touch to discuss the next steps.",
    consent:"I agree that RojMitra/EarlyJobs may use the information in this application to assess my interest in becoming a sourcing partner and contact me about the programme. I can contact info@earlyjobs.in with privacy or data-use questions.",
    fields:[{name:"name",label:"Name"},{name:"mobile",label:"Mobile Number",type:"tel"},{name:"village",label:"Village"},{name:"gramPanchayat",label:"Gram Panchayat"},{name:"block",label:"Block"},{name:"district",label:"District"},{name:"state",label:"State"},{name:"connections",label:"Which communities or industries are you connected with?",type:"textarea"}]
  },
  government_initiative_suggestion: {
    title:"Suggest a Government Initiative",button:"Submit Suggestion",success:"Thank you. We have received your suggestion for editorial review.",
    consent:"I agree to be contacted by RojMitra about my suggestion.",
    fields:[{name:"name",label:"Name"},{name:"email",label:"Email",type:"email"},{name:"initiativeName",label:"Initiative Name"},{name:"link",label:"Link (optional)",type:"url",optional:true},{name:"message",label:"Message",type:"textarea"}]
  },
  blog_insight: {
    title:"Share an Insight With RojMitra",button:"Submit Insight",success:"Thank you. We have received your insight for editorial review.",
    consent:"I agree to be contacted by RojMitra about my insight.",
    fields:[{name:"name",label:"Name"},{name:"email",label:"Email",type:"email"},{name:"message",label:"Message",type:"textarea"},{name:"link",label:"Link (optional)",type:"url",optional:true}]
  },
  contact: {
    title: "Contact RojMitra",
    button: "Send message",
    success: "Thank you. We have received your message and will get back to you soon.",
    consent:
      "By submitting this form, I agree that RojMitra/EarlyJobs may use the information I provide to respond to my enquiry. I can contact info@earlyjobs.in with privacy or data-use questions.",
    fields: [
      { name: "name", label: "Name" },
      { name: "mobile", label: "Phone Number", type: "phone" },
      { name: "email", label: "Email", type: "email" },
      { name: "message", label: "Message", type: "textarea" },
      // Attachment (optional file) — wire up later once we can deliver files (e.g. GCS + link).
    ],
  },
};
