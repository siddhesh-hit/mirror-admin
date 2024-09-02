import * as yup from "yup";

export const addMinistry = async (data) => {
  let dataSchema = yup.object().shape({
    ministry_name: yup.string().required("Ministry Name is required."),
    minister: yup.string().required("Minister is required."),
    year: yup.string().required("Year is required."),
    sub_ministry: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Name is required for sub-ministry."),
        minister: yup
          .string()
          .required("Minister is required for sub-ministry."),
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
