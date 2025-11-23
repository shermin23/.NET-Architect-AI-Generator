export interface GeneratedSolution {
  programCs: string;
  aggregatorServiceCs: string;
  aggregatorControllerCs: string;
  explanation: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}