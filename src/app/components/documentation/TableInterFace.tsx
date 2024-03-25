export interface Location {
  formatted_location: string;
  postal_code: string | null;
  region: string;
  country: string;
  country_code: string;
  raw_input_location: string;
  street: string | null;
  street_number: string | null;
  appartment_number: string | null;
  city: string;
}

export interface EducationEntry {
  title: string | null;
  start_date: string;
  end_date: string;
  location: Location;
  establishment: string;
  description: string | null;
  gpa: number | null;
  accreditation: string;
}

export interface WorkExperienceEntry {
  title: string;
  start_date: string;
  end_date: string;
  company: string;
  location: Location;
  description: string | null;
  industry: string | null;
}

export interface Language {
  name: string;
  code: string | null;
}

export interface Skill {
  name: string;
  type: "hard" | "soft";
}

export interface Certification {
  name: string;
  type: string | null; // Update with actual type if available
}

export interface ResumeData {
  extracted_data: {
    personal_infos: {
      name: {
        first_name: string;
        last_name: string;
        raw_name: string;
        middle: string;
        title: string;
        prefix: string | null;
        sufix: string | null;
      };
      address: Location;
      self_summary: string;
      objective: string;
      date_of_birth: string | null;
      place_of_birth: string | null;
      phones: string[];
      mails: string[];
      urls: string[];
      fax: string[];
      current_profession: string;
      gender: string | null;
      nationality: string | null;
      martial_status: string | null;
      current_salary: string | null;
    };
    education: {
      total_years_education: number | null;
      entries: EducationEntry[];
    };
    work_experience: {
      total_years_experience: number | null;
      entries: WorkExperienceEntry[];
    };
    languages: Language[];
    skills: Skill[];
    certifications: Certification[];
    courses: string[]; // Update with actual type if available
    publications: string[]; // Update with actual type if available
    interests: string[]; // Update with actual type if available
  };
  cost: number;
}
