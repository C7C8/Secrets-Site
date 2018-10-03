export class ApiMessage {
  secret: string;
  key?: string;
}

export class ApiResponse {
  status: string;
  message: string;
  key?: string;
}

export class ApiDataAnalysis extends ApiResponse {
  direct_comparison: boolean;
  word_overlap: number;
  percent_overlap: number;
  keyword_overlap: number;
  keyword_percent_overlap: number;
}
