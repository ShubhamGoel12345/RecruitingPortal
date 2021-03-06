
export const RegistrationModalRecord = {
  name: "Registration screen",
  fields: [
    {
      key: "firstName",
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
      isRequired: true,
      isSecured: true
    },
    {
      key: "mobileNumber",
      name: "Mobile Number",
      type: "text-box",
      isRequired: true
    },
    {
      key: "type",
      name: "Type",
      type: "select",
      isRequired: true,
      dropDownList: [
        { label: 'Employee', value: 'Employee'},
        { label: 'Employer', value: 'Employer'},
      ]
    }
  ],
};