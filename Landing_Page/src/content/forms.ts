export type FormType = "employer_requirement" | "sourcing_partner_application" | "government_initiative_suggestion" | "blog_insight";
export type Field = { name: string; label: string; type?: "email" | "tel" | "url" | "number" | "textarea"; optional?: boolean; group?: string };
export const formContent: Record<FormType, { title: string; button: string; success: string; consent: string; fields: Field[] }> = {
  employer_requirement: {
    title: "Submit Your Workforce Requirement", button: "Submit Your Hiring Requirements",
    success: "Thank you. We have received your requirement. Our team will review it and get in touch to discuss the next steps.",
    consent: "I agree to be contacted by the RojMitra team regarding the workforce requirement submitted above.",
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
    consent:"I agree to be contacted by the RojMitra team regarding my sourcing partner application.",
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
  }
};
