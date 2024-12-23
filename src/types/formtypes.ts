export interface DealFormData {
  name: string;
  link: string;
  couponCode?: string;
  discount: number;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof DealFormData]?: string[];
  };
  inputs?: DealFormData;
}
