import * as yup from "yup";

// Define basic information validation
export const basicInfoSchema = async (data) => {
  let dataSchema = yup.object().shape({
    house: yup.string().required("House is required"),
    profile: yup.lazy((value) => {
      if (typeof value === "object") {
        if (value === null || Object.keys(value).length === 0) {
          return yup.mixed().required("Profile image must be uploaded");
        }
        return yup.mixed(); // Accept valid File object
      } else {
        return yup.string().required("Profile is required");
      }
    }),

    // yup.string().required("Profile is required"), // nullable or not required field
    name: yup.string().required("Name is required"),
    surname: yup.string().required("Surname is required"),
    constituency: yup.lazy((value) => {
      if (typeof value === "object") {
        if (Object.keys(value).length === 0) {
          return yup.mixed().required("Constituency is required");
        }
        return yup.mixed(); // Accept valid File object
      } else {
        return yup.string().required("Constituency is required");
      }
    }),

    // // yup.string().required("Constituency is required"),
    // party: yup.string().required("Surname is required"),
    party: yup.lazy((value) => {
      if (typeof value === "object") {
        if (Object.keys(value).length === 0) {
          return yup.mixed().required("Party is required");
        }
        return yup.mixed(); // Accept valid File object
      } else {
        return yup.string().required("Party is required");
      }
    }),

    // yup.string().required("Party is required"),
    // gender: yup.string().required("Gender is required"),
    gender: yup.lazy((value) => {
      if (typeof value === "object") {
        if (Object.keys(value).length === 0) {
          return yup.mixed().required("Gender is required");
        }
        return yup.mixed(); // Accept valid File object
      } else {
        return yup.string().required("Gender is required");
      }
    }),
    // district: yup.string().required("District is required"),
    district: yup.lazy((value) => {
      if (typeof value === "object") {
        if (Object.keys(value).length === 0) {
          return yup.mixed().required("District is required");
        }
        return yup.mixed(); // Accept valid File object
      } else {
        return yup.string().required("District is required");
      }
    }),
    first_time_elected: yup.string().required("First time elected is required"),
    date_of_birth: yup.string().required("Date of birth is required"),
    place_of_birth: yup.string().required("Place of birth is required"),
    education: yup.string().required("Education is required"),
    language: yup.string().required("Language is required"),
    marital_status: yup.string().required("Marital Status is required"),
    children: yup
      .string()
      .required("Children is required, if no value then put '-'"),
    business: yup.string().required("Business is required"),
    hobby: yup.string().required("Hobby is required"),
    foreign_migration: yup.string().required("Foreign Migration is required"),
    address: yup.string().required("Address is required"),
    address1: yup.string().required("Address 1 is required"),
    mobile_number: yup.string().required("Mobile number must be 10 digits"), // if it's expected to be numeric
    email: yup.string().required("Invalid email address"),
    awards: yup
      .string()
      .required("Awards is required, if no value then put '-'"),
    other_info: yup
      .string()
      .required("Other Information is required, if no value then put '-'"),
  });
  let validate = await dataSchema
    .validate(data, { abortEarly: false })
    .catch((e) => e);

  if (validate.errors && validate.errors.length > 0) {
    return validate.errors[0];
  } else {
    return null;
  }
};
// Define political journey validation
export const politicalJourneySchema = async (data) => {
  let dataSchema = yup.array().of(
    yup.object().shape({
      date: yup.string().required("Date is required"),
      title: yup.string().required("Title is required"),
      presiding: yup.lazy((value) => {
        if (typeof value === "object") {
          if (Object.keys(value).length === 0) {
            return yup.mixed().required("Presiding Officer is required");
          }
          return yup.mixed(); // Accept valid File object
        } else {
          return yup.string().nullable();
        }
      }),
      legislative_position: yup.lazy((value) => {
        if (typeof value === "object") {
          if (Object.keys(value).length === 0) {
            return yup.mixed().required("Legislative Position is required");
          }
          return yup.mixed(); // Accept valid File object
        } else {
          return yup.string().nullable();
        }
      }),
      designation: yup.lazy((value) => {
        if (typeof value === "object") {
          if (Object.keys(value).length === 0) {
            return yup.mixed().required("Designation is required");
          }
          return yup.mixed(); // Accept valid File object
        } else {
          return yup.string().nullable();
        }
      }),
    })
  );
  let validate = await dataSchema
    .validate(data, { abortEarly: false })
    .catch((e) => e);

  if (validate.errors && validate.errors.length > 0) {
    return validate.errors[0];
  } else {
    return null;
  }
};

// Define election data validation
export const electionDataSchema = async (data) => {
  let dataSchema = yup.object().shape({
    // constituency: yup.lazy((value) => {
    //   if (typeof value === "object") {
    //     if (Object.keys(value).length === 0) {
    //       return yup.mixed().required("Constituency is required");
    //     }
    //     return yup.mixed(); // Accept valid File object
    //   } else {
    //     return yup.string().required("Constituency is required");
    //   }
    // }),

    // yup.string().required("Constituency is required"),
    total_electorate: yup
      .string()
      .required("Total electorate is required, else put '-'"),
    total_valid_voting: yup
      .string()
      .required("Total valid voting is required, else put '-'"),
    member_election_result: yup.array().of(
      yup.object().shape({
        candidate_name: yup.string().required("Candidate name is required"),
        votes: yup.string().required("Votes is required, else put '-'"),
        party: yup.lazy((value) => {
          if (typeof value === "object") {
            if (Object.keys(value).length === 0) {
              return yup.mixed().required("Party is required");
            }
            return yup.mixed(); // Accept valid File object
          } else {
            return yup.string().required("Party is required");
          }
        }),

        // yup.string().required("Party is required"),
      })
    ),
  });
  let validate = await dataSchema
    .validate(data, { abortEarly: false })
    .catch((e) => e);

  if (validate.errors && validate.errors.length > 0) {
    return validate.errors[0];
  } else {
    return null;
  }
};

// Define the complete data validation schema
export const memberSchema = async (data) => {
  let dataSchema = yup.object().shape({
    basic_info: basicInfoSchema,
    political_journey: politicalJourneySchema,
    election_data: electionDataSchema,
  });

  let validate = await dataSchema
    .validate(data, { abortEarly: false })
    .catch((e) => e);

  if (validate.errors && validate.errors.length > 0) {
    return validate.errors[0];
  } else {
    return null;
  }
};
