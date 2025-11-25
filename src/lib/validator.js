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
    first_time_elected: yup.string().optional(),
    date_of_birth: yup.string().optional(),
    place_of_birth: yup.string().optional(),
    education: yup.string().optional(),
    language: yup.string().optional(),
    marital_status: yup.string().optional(),
    children: yup.string().optional(),
    business: yup.string().optional(),
    hobby: yup.string().optional(),
    foreign_migration: yup.string().optional(),
    address: yup.string().optional(),
    address1: yup.string().optional(),
    mobile_number: yup
      .string()
      .optional()
      .test('mobile-validation', 'Mobile number must be 10 digits', function (value) {
        // If empty/undefined, it's valid (optional)
        if (!value || value.trim() === '') return true;
        // If has value, validate it's 10 digits
        return /^\d{10}$/.test(value.trim());
      }),
    email: yup
      .string()
      .optional()
      .test('email-validation', 'Invalid email address', function (value) {
        // If empty/undefined, it's valid (optional)
        if (!value || value.trim() === '') return true;
        // If has value, validate email format
        return yup.string().email().isValidSync(value);
      }),
    awards: yup.string().optional(),
    other_info: yup.string().optional(),
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
  let dataSchema = yup.array().optional().of(
    yup.object().shape({
      date: yup.string().optional(),
      title: yup.string().optional(),
      presiding: yup.lazy((value) => {
        if (typeof value === "object") {
          // If it's an empty object, it's optional (no validation error)
          if (Object.keys(value).length === 0) {
            return yup.mixed().optional();
          }
          return yup.mixed(); // Accept valid File object
        } else {
          return yup.string().optional();
        }
      }),
      legislative_position: yup.lazy((value) => {
        if (typeof value === "object") {
          // If it's an empty object, it's optional (no validation error)
          if (Object.keys(value).length === 0) {
            return yup.mixed().optional();
          }
          return yup.mixed(); // Accept valid File object
        } else {
          return yup.string().optional();
        }
      }),
      designation: yup.lazy((value) => {
        if (typeof value === "object") {
          // If it's an empty object, it's optional (no validation error)
          if (Object.keys(value).length === 0) {
            return yup.mixed().optional();
          }
          return yup.mixed(); // Accept valid File object
        } else {
          return yup.string().optional();
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
  let dataSchema = yup.object().optional().shape({
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
    total_electorate: yup.string().optional(),
    total_valid_voting: yup.string().optional(),
    member_election_result: yup.array().optional().of(
      yup.object().shape({
        candidate_name: yup.string().optional(),
        votes: yup.string().optional(),
        party: yup.lazy((value) => {
          if (typeof value === "object") {
            if (Object.keys(value).length === 0) {
              return yup.mixed().optional(); // Make it optional instead of required
            }
            return yup.mixed(); // Accept valid File object
          } else {
            return yup.string().optional(); // Make it optional instead of required
          }
        }),
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
    jeevan_parichay: yup.lazy((value) => {
      if (typeof value === "object") {
        if (value === null || Object.keys(value).length === 0) {
          return yup.mixed().required("Jeevan parichat document must be uploaded");
        }
        return yup.mixed(); // Accept valid File object
      } else {
        return yup.string().required("Jeevan parichat is required");
      }
    })
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
