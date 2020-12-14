export const EmployeeProfileViewRecord = {
  name: "Profile view",
  fields: [
    {
      key: "firstName",
      name: "First name",
      type: "view-field",
    },
    {
      key: "lastName",
      name: "Last name",
      type: "view-field",
    },
    {
      key: "emailAddress",
      name: "Email",
      type: "view-field",
    },
    {
      key: "mobileNumber",
      name: "Mobile Number",
      type: "view-field",
    },
    {
      key: "skills",
      name: "Skills",
      type: "view-field",
      isArray: true
    },
  ],
};

export const EmployeeProfileEditRecord = {
  name: "Profile view",
  fields: [
    {
      key: "firstName",
      name: "First name",
      type: "prefilled-text-box",
    },
    {
      key: "lastName",
      name: "Last name",
      type: "prefilled-text-box",
    },
    {
      key: "skills",
      name: "Skills",
      type: "multi-select",
      isRequired: true,
      dropDownList: [
        { label: 'JAVA', value: 'java' },
        { label: 'PYTHON', value: 'python' },
        { label: 'C++', value: 'cpp' },
        { label: 'RUBY', value: 'ruby' },
      ]
    },
  ],
};  