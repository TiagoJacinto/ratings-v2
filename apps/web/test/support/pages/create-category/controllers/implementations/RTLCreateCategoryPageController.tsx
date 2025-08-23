import { render, screen } from "@testing-library/react";
import { TestingLibraryDOMCreateCategoryPageController } from "./TestingLibraryDOMCreateCategoryPageController";
import {BaseLayout} from "@src/components/layout"
import {CreateCategoryForm} from "@src/app/categories/create/form"
import { createCategory } from "@src/gen";

export class RTLCreateCategoryPageController extends TestingLibraryDOMCreateCategoryPageController {
  constructor() {
    super(screen)
  }

  async open() {
    render(<BaseLayout><CreateCategoryForm createCategory={(data) => createCategory(data)}/></BaseLayout>)
  }
}
