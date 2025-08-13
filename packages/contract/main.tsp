import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";
import "@typespec/versioning";

using Http;
using OpenAPI;
using Versioning;

@service(#{ title: "Ratings API" })
@versioned(Versions)
namespace RatingsAPI;

enum Versions {
  v1: "1.0",
}

model Category {
  @minLength(1)
  @maxLength(100)
  name: string;

  @maxLength(500)
  description?: string;
}

@route("/categories")
namespace Categories {
  @post
  @operationId("createCategory")
  op createCategory(...Request, @body category: Category):
    | ServerSuccessResponse<CreatedResponse.statusCode>
    | ServerFailureResponse<ConflictResponse.statusCode | BadRequestResponse.statusCode>
    | ServerBodyValidationExceptionResponse
    | ApiServerErrorResponse;
}

model Request {
  @header contentType: "application/json";
}

model ServerResponse<TStatusCode, TBody> {
  @statusCode statusCode: TStatusCode;
  @header contentType: "application/json";
  @body body: TBody;
}

model ServerSuccess {
  message: string;
}

model ServerSuccessResponse<TStatusCode> {
  @statusCode statusCode: TStatusCode;
  @header contentType: "application/json";
  @body body: ServerSuccess;
}

@error
model ServerFailure {
  message: string;
}

model ServerFailureResponse<TStatusCode> {
  @statusCode statusCode: TStatusCode;
  @header contentType: "application/json";
  @body body: ServerFailure;
}

model ServerBodyValidationExceptionResponse {
  @statusCode statusCode: BadRequestResponse.statusCode;
  @header contentType: "application/json";
  @body body: {
    code: "BODY_VALIDATION_EXCEPTION";
    path: string;
    message: string;
    errors: {
      error_code?: string;
      message: string;
      path: string;
    }[];
  };
}

alias OpenAPIValidationErrorResponse = {
  @statusCode statusCode:
    | ForbiddenResponse.statusCode
    | UnsupportedMediaTypeResponse.statusCode
    | RequestEntityTooLargeResponse.statusCode
    | MethodNotAllowedResponse.statusCode
    | NotAcceptableResponse.statusCode
    | NotFoundResponse.statusCode
    | UnauthorizedResponse.statusCode
    | ForbiddenResponse.statusCode;
  @header contentType: "application/json";
  @body body: OpenAPIValidationError;
};

@error
model OpenAPIValidationError {
  path?: string;
  message: string;
  errors: {
    error_code?: string;
    message: string;
    path: string;
  }[];
}

model InternalServerErrorResponse is ServerFailureResponse<500>;

alias ApiServerErrorResponse = OpenAPIValidationErrorResponse | InternalServerErrorResponse;

model MethodNotAllowedResponse is Response<405>;
model UnsupportedMediaTypeResponse is Response<415>;
model RequestEntityTooLargeResponse is Response<413>;
model NotAcceptableResponse is Response<406>;
