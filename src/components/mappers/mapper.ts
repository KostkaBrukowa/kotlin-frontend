export abstract class ResponseMapper<GraphQLType, ModelType> {
  public abstract fromResponse(response: GraphQLType, ...other: any[]): ModelType;

  public fromResponseList(responseList: GraphQLType[], ...other: any[]): ModelType[] {
    return (responseList || []).map((response) => this.fromResponse(response, ...other));
  }
}

export abstract class RequestMapper<ModelType, RequestType> {
  public abstract toRequest(model: ModelType, ...other: any[]): RequestType;

  public toRequestArray(modelList: ModelType[], ...other: any[]): RequestType[] {
    return modelList.map((model) => this.toRequest(model, ...other));
  }
}
