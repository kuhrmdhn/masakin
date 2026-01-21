import { NextResponse } from "next/server";

class ApiResponse {
  static json<T = any>(
    success: boolean,
    message: string,
    options?: {
      statusCode?: number;
      data?: any;
      pagination?: {
        currentPage: number;
        totalPages: number;
      };
    },
  ) {
    const { statusCode = 200, data, pagination } = options || {};

    const response: Record<string, any> = {
      success,
      message,
      timestamp: new Date().toISOString(),
    };

    if (data !== undefined) response.data = data;

    if (pagination) {
      const { currentPage, totalPages } = pagination;
      const isLastPage = currentPage >= totalPages;

      response.pagination = {
        currentPage,
        totalPages,
        hasNextPage: !isLastPage,
      };
    }

    return NextResponse.json(response, { status: statusCode });
  }

  static success(message: string, data?: any) {
    return this.json(true, message, { data });
  }

  static paginated(
    message: string,
    currentPage: number,
    totalPages: number,
    data?: any,
  ) {
    return this.json(true, message, {
      data,
      pagination: { currentPage, totalPages },
    });
  }

  static badRequest(message: string = "Bad Request") {
    return this.json(false, message, { statusCode: 400 });
  }

  static unauthenticated(message: string = "Unauthenticated") {
    return this.json(false, message, { statusCode: 401 });
  }

  static unauthorized(message: string = "Unauthorized") {
    return this.json(false, message, { statusCode: 401 });
  }

  static forbidden(message: string = "Forbidden") {
    return this.json(false, message, { statusCode: 403 });
  }

  static notFound(message: string = "Not Found") {
    return this.json(false, message, { statusCode: 404 });
  }

  static validationError(message: string = "Validation Error") {
    return this.json(false, message, { statusCode: 422 });
  }

  static serverError(message: string = "Internal Server Error") {
    return this.json(false, message, { statusCode: 500 });
  }

  static error(message: string, statusCode: number) {
    return this.json(false, message, { statusCode });
  }
}

export default ApiResponse;

