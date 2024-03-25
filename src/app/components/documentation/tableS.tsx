import { Box, Table, Tbody, Tr, Th, Td } from "@chakra-ui/react";
interface PersonalInfo {
  name?: {
    first_name?: string;
    last_name?: string;
    raw_name?: string;
    middle?: string | null;
    title?: string | null;
    prefix?: string | null;
    sufix?: string | null;
  };
  address: {
    formatted_location: string;
    postal_code: string | null;
    region: string | null;
    country: string | null;
    country_code: string | null;
    raw_input_location: string | null;
    street: string | null;
    street_number: string | null;
    appartment_number: string | null;
    city: string | null;
  };
  self_summary: string;
  objective: string | null;
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
}

interface EducationEntry {
  title: string | null;
  start_date: string | null;
  end_date: string | null;
  location: {
    formatted_location: string;
    postal_code: string | null;
    region: string | null;
    country: string | null;
    country_code: string | null;
    raw_input_location: string | null;
    street: string | null;
    street_number: string | null;
    appartment_number: string | null;
    city: string | null;
  };
  establishment: string | null;
  description: string | null;
  gpa: string | null;
  accreditation: string | null;
}

interface WorkExperienceEntry {
  title: string | null;
  start_date: string | null;
  end_date: string | null;
  company: string | null;
  location: {
    formatted_location: string;
    postal_code: string | null;
    region: string | null;
    country: string | null;
    country_code: string | null;
    raw_input_location: string | null;
    street: string | null;
    street_number: string | null;
    appartment_number: string | null;
    city: string | null;
  };
  description: string | null;
  industry: string | null;
}

interface Language {
  name: string;
  code: string | null;
}

interface Skill {
  name: string;
  type: string | null;
}

export interface ResumeDataProps {
  personal_infos: PersonalInfo; // Ensure personal_infos property exists
  education: {
    total_years_education: string | null;
    entries?: EducationEntry[];
  };
  work_experience: {
    total_years_experience?: string | null;
    entries?: WorkExperienceEntry[];
  };
  languages?: Language[];
  skills?: Skill[];
}

const ResumeData: React.FC<{ [key: string]: any }> = (props) => {
  const { personal_infos, education, work_experience, languages, skills } =
    props.data;

  return (
    <Box className="mt-2 w-full border text-sm white">
      <Table>
        <Tbody className="divide-y text-left align-top">
          <Tr>
            <Th bg={"white"}>Personal Information</Th>
          </Tr>
          <Tr>
            <Td>Name</Td>
            <Td>{`${personal_infos?.name.first_name} ${personal_infos?.name.last_name}`}</Td>
          </Tr>
          <Tr>
            <Td>Email</Td>
            <Td>{personal_infos?.mails.join(", ")}</Td>
          </Tr>
          <Tr>
            <Td>Phone</Td>
            <Td>{personal_infos?.phones.join(", ")}</Td>
          </Tr>
          <Tr>
            <Td>Location</Td>
            <Td>{personal_infos?.address.formatted_location}</Td>
          </Tr>
          <Tr>
            <Td>Summary</Td>
            <Td>{personal_infos?.self_summary}</Td>
          </Tr>
          <Tr>
            <Th>Education</Th>
          </Tr>
          {education.entries?.map((entry: any, idx: any) => (
            <>
              <Tr key={idx}>
                <Td>Title</Td>
                <Td>{entry.title}</Td>
              </Tr>
              <Tr>
                <Td>Date</Td>
                <Td>{`${entry.start_date} - ${entry.end_date}`}</Td>
              </Tr>
              <Tr>
                <Td>Establishment</Td>
                <Td>{entry.establishment}</Td>
              </Tr>
            </>
          ))}
          <Tr>
            <Th bg={"white"}>Work Experience</Th>
          </Tr>
          {work_experience?.entries?.map((entry: any, idx: any) => (
            <>
              <Tr key={idx}>
                <Td>Title</Td>
                <Td>{entry.title}</Td>
              </Tr>
              <Tr>
                <Td>Date</Td>
                <Td>{`${entry.start_date} - ${entry.end_date}`}</Td>
              </Tr>
              <Tr>
                <Td>Company</Td>
                <Td>{entry.company}</Td>
              </Tr>
            </>
          ))}
          <Tr>
            <Th bg={"white"}>Languages</Th>
          </Tr>
          {languages?.map((language: any, idx: any) => (
            <>
              <Tr key={idx}>
                <Td>{language.name}</Td>
                <Td></Td>{" "}
                {/* You can add language proficiency here if available */}
              </Tr>
            </>
          ))}
          <Tr>
            <Th bg={"white"}>Skills</Th>
          </Tr>
          {skills?.map((skill: any, idx: any) => (
            <>
              {" "}
              <Tr key={idx}>
                <Td>{skill.name}</Td>
                <Td>{skill.type}</Td>
              </Tr>
            </>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ResumeData;
