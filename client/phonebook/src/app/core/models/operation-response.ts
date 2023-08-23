export class VoidOperationResponse {
  readonly success: boolean;
  readonly error: string | null;

  constructor(
    success: boolean,
    error: string | null,
  ) {
    this.success = success;
    this.error = error;
  }

  static success(): VoidOperationResponse {
    return new VoidOperationResponse(true, null);
  }

  static error(error: string): VoidOperationResponse {
    return new VoidOperationResponse(false, error);
  }
}

export class OperationResponse<T = unknown> extends VoidOperationResponse {
  readonly dataOrNull: T | null;

  get data(): T {
    if(this.dataOrNull == undefined || this.dataOrNull == null) {
      throw Error('Invalid OperationResponse state.');
    }

    return this.dataOrNull;
  }

  constructor(
    success: boolean,
    error: string | null,
    data: T | null,
  ) {
    super(success, error);
    this.dataOrNull = data;
  }

  static override success<T = unknown>(data: T | null = null): OperationResponse<T> {
    return new OperationResponse<T>(true, null, data);
  }

  static override error<T = unknown>(error: string): OperationResponse<T> {
    return new OperationResponse<T>(false, error, null);
  }
}