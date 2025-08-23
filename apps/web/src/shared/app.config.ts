import { ComponentConfig } from "@primitivestack/frontend-testing-core";

export const createCategoryPage = {
  nameInput: {
    properties: {
      labelText: {
        type: "const",
        value: "name"
      },
    },
  },
  nameMessage: {
    attributes: {
      title: "Name Form Error",
    },
  },
  descriptionInput: {
    properties: {
      labelText: {
        type: "const",
        value: "description"
      },
    },
  },
  descriptionMessage: {
    attributes: {
      title: "Description Form Error",
    },
  },
  submit: {
    properties: {
      text: {
        type: "const",
        value: "Submit"
      },
    },
  },
} as const satisfies ComponentConfig

export const toaster = {
  successToast: {
    properties: {
      text: {
        type: "argument",
      },
    },
  },
  errorToast: {
    properties: {
      text: {
        type: "argument",
      },
    },
  },
} as const satisfies ComponentConfig
