
export const RegistrationModalRecord = {
  name: "Registration screen",
  fields: [
    {
      key: "Firstame",
      name: "First name",
      type: "text-box",
      isRequired: true
    },
    {
      key: "lastName",
      name: "Last name",
      type: "text-box",
      isRequired: false
    },
    {
      key: "emailAddress",
      name: "Email",
      type: "text-box",
      isRequired: true
    },
    {
      key: "password",
      name: "Password",
      type: "text-box",
      isRequired: true
    },
    {
      key: "mobileNumber",
      name: "Mobile Number",
      type: "text-box",
      isRequired: true
    },
    // {
    //   key: "type",
    //   name: "Type",
    //   type: "select",
    //   isRequired: false,
    //   dropDownList: [
    //     { label: 'Employee', value: 'Employee'},
    //     { label: 'Employer', value: 'Employer'},userPayload
    //   ]
    // },
    // {
    //   key: "skills",
    //   name: "Skills",
    //   type: "select",
    //   isRequired: false,
    //   dropDownList: [
    //     { label: 'JAVA', value: 'java'},
    //     { label: 'PYTHON', value: 'python'},
    //     { label: 'C++', value: 'cpp'},
    //     { label: 'RUBY', value: 'ruby'},
    //   ]
    // },
  ],
};
